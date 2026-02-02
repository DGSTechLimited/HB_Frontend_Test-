import { DeleteOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React from 'react'
import QuantityInput from './QuantityInput'
import { useRemoveCartItem, type ICartItem } from '@/services/cart'

interface CartItemProps {
    item: ICartItem
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const removeCartItem = useRemoveCartItem()

    const handleRemove = () => {
        removeCartItem.mutate(
            { productCode: item.product.code },
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

    return (
        <div className='w-full flex border-b border-neutral-200 pb-3 flex-col'>
            <div className="flex w-full flex-col">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <span className='font-medium text-base'>{item.product.code}</span>
                        <span className='text-neutral-500 text-xs'>{item.product.name}</span>
                    </div>
                    <Button
                        size='small'
                        onClick={handleRemove}
                        loading={removeCartItem.isPending}
                    >
                        <DeleteOutlined className='text-primary!' />
                    </Button>
                </div>
                <div className="flex w-full justify-between items-center mt-2">
                    <QuantityInput
                        productCode={item.product.code}
                        initialQuantity={item.quantity}
                    />
                    <span className='text-base font-medium'>{item.formattedSubtotal}</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem