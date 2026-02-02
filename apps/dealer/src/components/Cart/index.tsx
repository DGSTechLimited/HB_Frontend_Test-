import React from 'react'
import CartItem from './CartItem'
import { Button, Spin } from 'antd'
import { useCart } from '@/services/cart'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { data: cartData, isLoading } = useCart()

    const cart = cartData?.data
    const items = cart?.items || []
    const summary = cart?.summary

    if (isLoading) {
        return (
            <div className='flex flex-col h-full items-center justify-center'>
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className='flex flex-col h-full relative'>
            <div className="flex flex-col gap-y-3 overflow-y-auto pb-32">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-10">
                        <img
                            src="/empty_cart.webp"
                            alt="Empty cart"
                            className="w-auto h-40 mb-4"
                        />
                        <span className="text-gray-500 text-base">Your cart is empty</span>
                    </div>
                ) : (
                    items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))
                )}
            </div>
            {items.length > 0 && summary && (
                <div className="flex w-full flex-col absolute bottom-0 bg-white p-3 border-t border-neutral-200">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex flex-col">
                            <span className='text-base'>Subtotal</span>
                            <span className='text-neutral-500'>
                                {summary.itemCount} {summary.itemCount === 1 ? 'Item' : 'Items'}
                            </span>
                        </div>
                        <span className='text-2xl font-semibold'>{summary.formattedTotal}</span>
                    </div>
                    <div className="flex gap-x-3">
                        <Link className='w-full' to="/cart">
                            <Button size='large' className='w-full mt-3'>
                                View Cart
                            </Button>
                        </Link>
                        <Link className='w-full' to="/checkout">
                            <Button size='large' type='primary' className='w-full mt-3'>
                                Checkout
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart