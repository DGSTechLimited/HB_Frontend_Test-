import { Button, InputNumber, message } from 'antd'
import React, { useState } from 'react'
import { useAddToCart } from '@/services/cart'

interface AddToCartProps {
  id: string
  productCode: string
}

const AddToCart: React.FC<AddToCartProps> = ({ id, productCode }) => {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useAddToCart()

  const handleAddToCart = () => {
    addToCart.mutate(
      { productCode, quantity },
      {
        onSuccess: (response) => {
          message.success(response.message)
          setQuantity(1) // Reset quantity after adding
        },
        onError: () => {
          message.error('Failed to add item to cart')
        },
      }
    )
  }

  return (
    <div className="flex">
      <InputNumber
        min={1}
        max={100000}
        value={quantity}
        onChange={(value) => setQuantity(Number(value))}
        disabled={addToCart.isPending}
      />
      <Button
        className='text-primary! underline'
        type='link'
        onClick={handleAddToCart}
        loading={addToCart.isPending}
      >
        Add to Cart
      </Button>
    </div>
  )
}

export default AddToCart