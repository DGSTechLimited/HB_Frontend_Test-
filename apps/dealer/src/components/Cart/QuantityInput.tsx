import { message } from 'antd'
import React, { useState, useEffect } from 'react'
import { useUpdateCartItem } from '@/services/cart'

interface QuantityInputProps {
    productCode: string
    initialQuantity: number
}

const QuantityInput: React.FC<QuantityInputProps> = ({ productCode, initialQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity)
    const updateCartItem = useUpdateCartItem()

    useEffect(() => {
        setQuantity(initialQuantity)
    }, [initialQuantity])

    const clampQuantity = (value: number) => Math.max(1, Math.min(1000000, value))

    const applyQuantityUpdate = (nextQuantity: number) => {
        const safeQuantity = clampQuantity(nextQuantity)
        setQuantity(safeQuantity)
        if (safeQuantity === initialQuantity) return
        updateCartItem.mutate(
            { productCode, quantity: safeQuantity },
            {
                onSuccess: (response) => {
                    message.success(response.message)
                },
                onError: () => {
                    message.error('Failed to update quantity')
                    setQuantity(initialQuantity)
                },
            }
        )
    }

    const handleIncrement = () => {
        applyQuantityUpdate(quantity + 1)
    }

    const handleDecrement = () => {
        applyQuantityUpdate(quantity - 1)
    }

    return (
        <div className='flex items-center gap-x-2 cart-qty'>
            <div className="cart-qty__box">
                <button
                    type="button"
                    className="cart-qty__step"
                    onClick={handleDecrement}
                    disabled={updateCartItem.isPending || quantity <= 1}
                    aria-label="Decrease quantity"
                >
                    -
                </button>
                <span className="cart-qty__value" aria-live="polite">
                    {quantity}
                </span>
                <button
                    type="button"
                    className="cart-qty__step"
                    onClick={handleIncrement}
                    disabled={updateCartItem.isPending}
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
            <span className="cart-qty__unit">Nos</span>
        </div>
    )
}

export default QuantityInput
