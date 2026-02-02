import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, InputNumber, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { useUpdateCartItem } from '@/services/cart'

interface QuantityInputProps {
    productCode: string
    initialQuantity: number
}

const QuantityInput: React.FC<QuantityInputProps> = ({ productCode, initialQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity)
    const [isEditing, setIsEditing] = useState(false)
    const updateCartItem = useUpdateCartItem()

    useEffect(() => {
        setQuantity(initialQuantity)
    }, [initialQuantity])

    const handleQuantityChange = (value: number | null) => {
        if (value) {
            setQuantity(value)
            if (value !== initialQuantity) {
                setIsEditing(true)
            } else {
                setIsEditing(false)
            }
        }
    }

    const handleConfirm = () => {
        updateCartItem.mutate(
            { productCode, quantity },
            {
                onSuccess: (response) => {
                    message.success(response.message)
                    setIsEditing(false)
                },
                onError: () => {
                    message.error('Failed to update quantity')
                    setQuantity(initialQuantity)
                    setIsEditing(false)
                },
            }
        )
    }

    const handleCancel = () => {
        setQuantity(initialQuantity)
        setIsEditing(false)
    }

    return (
        <div className='flex items-center gap-x-2'>
            <div className="flex">
                <InputNumber
                    className='rounded-r-none!'
                    min={1}
                    max={1000000}
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={updateCartItem.isPending}
                />
                <span className="text-xs! text-neutral-600 p-2 border border-l-0 border-neutral-300 rounded-md rounded-l-none">Nos</span>
            </div>
            {isEditing && (
                <div className="flex gap-x-1">
                    <Button
                        type='primary'
                        icon={<CheckOutlined />}
                        onClick={handleConfirm}
                        loading={updateCartItem.isPending}
                    />
                    <Button
                        icon={<CloseOutlined />}
                        onClick={handleCancel}
                        disabled={updateCartItem.isPending}
                    />
                </div>
            )}
        </div>
    )
}

export default QuantityInput