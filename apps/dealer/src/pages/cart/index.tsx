import QuantityInput from '@/components/Cart/QuantityInput'
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Table, message, Spin } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart, useRemoveCartItem } from '@/services/cart'
import PromoCarousel from './PromoCarousel'

const CartPage = () => {
    const { data: cartData, isLoading } = useCart()
    const removeCartItem = useRemoveCartItem()

    const cart = cartData?.data
    const items = cart?.items || []
    const summary = cart?.summary

    const handleRemove = (productCode: string) => {
        removeCartItem.mutate(
            { productCode },
            {
                onSuccess: (response) => {
                    message.success(response.message)
                },
                onError: () => {
                    message.error('Failed to remove item from cart')
                },
            }
        )
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'code',
            render: (code: string, record: any) => <div className='flex flex-col'>
                <span className='text-base font-medium' >{code}</span>
                <span className='text-xs text-neutral-500' >{record.name}</span>
            </div>
        },
        {
            title: 'Price',
            dataIndex: 'formattedUnitPrice',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity: number, record: any) => <QuantityInput productCode={record.code} initialQuantity={quantity} />,
            width: 300,
        },
        {
            title: 'Total',
            dataIndex: 'formattedSubtotal',
            render: (value: string) => <span className='text-base font-medium'>{value}</span>,
        },
        {
            dataIndex: 'code',
            render: (code: string) => (
                <Button
                    size='small'
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemove(code)}
                    loading={removeCartItem.isPending}
                />
            ),
        }
    ]

    const dataSource = items.map(item => ({
        id: item.id,
        code: item.product.code,
        name: item.product.name,
        quantity: item.quantity,
        formattedUnitPrice: item.formattedUnitPrice,
        formattedSubtotal: item.formattedSubtotal,
    }))

    if (isLoading) {
        return (
            <div className='container mx-auto pt-8 flex items-center justify-center min-h-[400px]'>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className='container mx-auto pt-8'>
            <p className=' text-2xl font-medium mb-4'>Your Cart</p>
            <div className=' grid grid-cols-12 w-full  gap-3'>
                <div className='col-span-8 p-5 bg-white rounded-xl'>
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <img
                                src="/empty_cart.webp"
                                alt="Empty cart"
                                className="w-auto h-64 mb-6"
                            />
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                Your cart is empty
                            </h3>
                            <p className="text-base text-gray-500 text-center max-w-md mb-6">
                                Start adding products to your cart to see them here.
                            </p>
                            <Link to="/search#parts-search">
                                <Button type='primary' size='large'>
                                    Go to Search Parts
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Table columns={columns} dataSource={dataSource} rowKey='id' pagination={false} />
                    )}
                </div>
                <div className="col-span-4 flex flex-col gap-y-5">
                    <div className="p-5 bg-white rounded-xl flex flex-col">
                        <span className='text-lg font-medium mb-3 border-b border-neutral-200 pb-3'> Cart Summary</span>
                        <div className="flex flex-col gap-y-3">
                            {
                                [
                                    {
                                        label: 'Subtotal',
                                        value: summary?.formattedSubtotal || '-',
                                    },
                                    {
                                        label: 'Total',
                                        value: summary?.formattedTotal || '-',
                                    },
                                ].map((el, index) =>
                                    <div key={index} className="flex justify-between items-center pb-3 border-b border-neutral-200">
                                        <span>{el.label}</span>
                                        <span className="text-xl font-medium">{el.value}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex mt-5 ">
                            <InfoCircleOutlined className='text-primary w-4 h-4 mr-1 mt-1' />
                            <span>Your personal data will be used to process your and for other purposes described in our <Link className='text-primary' to="/privacy-policy">privacy policy
                            </Link>.</span>
                        </div>
                        <Link to="/checkout">
                            <Button
                                type='primary'
                                size='large'
                                className='w-full mt-5'
                                disabled={!items.length}
                            >
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                    <div className="p-5 h-max bg-white rounded-xl flex flex-col">
                        <PromoCarousel />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartPage