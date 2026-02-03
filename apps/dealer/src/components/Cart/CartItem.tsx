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
        <div className='cart-item'>
            <div className="flex w-full flex-col">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <span className='font-semibold text-base text-[#0B1220]'>{item.product.code}</span>
                        <span className='text-neutral-500 text-xs'>{item.product.name}</span>
                    </div>
                    <Button
                        size='small'
                        onClick={handleRemove}
                        loading={removeCartItem.isPending}
                        className="cart-item__delete"
                    >
                        <DeleteOutlined className='cart-item__delete-icon' />
                    </Button>
                </div>
                <div className="flex w-full justify-between items-center mt-2">
                    <QuantityInput
                        productCode={item.product.code}
                        initialQuantity={item.quantity}
                    />
                    <span className='text-base font-semibold text-[#0B1220]'>{item.formattedSubtotal}</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem
