import { useState, useEffect } from 'react'
import ImageCarousel from '../(searchPart)/components/ImageCarousal'
import GetInTouch from '../(searchPart)/components/GetInTouch'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import successIcon from '@/assets/images/successIcon.png'
import { Table, Spin, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useOrder } from '@/services/order'
import { ArrowLeftOutlined } from '@ant-design/icons'

interface OrderConfirmationAnimationProps {
  onComplete: () => void
  orderNumber?: string
}

interface BillingAddress {
  name: string
  company: string
  email: string
}

interface OrderData {
  orderNumber: string
  status: string
  date: string
  email: string
  itemCount: number
  total: string
  assignedTo: string[]
  billingAddress: BillingAddress
  dispatchMethod: string
}

interface Product {
  code: string
  description: string
  quantity: number
  price: string
}

const OrderConfirmationAnimation = ({ onComplete, orderNumber }: OrderConfirmationAnimationProps) => {

  useEffect(() => {
    const moveUpTimer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => {
      clearTimeout(moveUpTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(2px)'
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] as const }
      }}
    >
      <div className="text-center">
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1]
          }}
          transition={{
            duration: 0.6,
            times: [0, 0.6, 1],
            ease: "easeOut"
          }}
        >
          <img
            src={successIcon}
            alt="Success"
            className="w-[53px] h-[53px]"
          />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-4 px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          Order Confirmed Successfully!
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          Your order <span className="font-semibold">#{orderNumber || 'Loading...'}</span> has been confirmed and is currently under review.
        </motion.p>
      </div>
    </motion.div>
  )
}

const OrderSummaryCard = ({ orderData }: { orderData: OrderData }) => {
  return (
    <div className="bg-white rounded-2xl py-7 px-7.5 pb-10 mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-medium ">#{orderData.orderNumber}</h2>
          <span className="px-4 py-1 bg-[#FAF3EE] text-[#DB5F00] rounded-full text-sm font-medium">
            {orderData.status}
          </span>
        </div>
      </div>
      <hr className='mt-4.5 mb-5.5 border-t-[#E2E2E2]' />
      <div className="grid grid-cols-4 gap-8">
        <div>
          <p className=" font-medium text-[#7c7c7c] mb-2">Date</p>
          <p className="  ">{orderData.date}</p>
        </div>
        <div>
          <p className=" font-medium text-[#7c7c7c] mb-2">Email</p>
          <p className="  ">{orderData.email}</p>
        </div>
        <div>
          <p className=" font-medium text-[#7c7c7c] mb-2">No.of items</p>
          <p className=" ">{orderData.itemCount}</p>
        </div>
        <div>
          <p className=" font-medium text-[#7c7c7c] mb-2">Total</p>
          <p className=" ">{orderData.total}</p>
        </div>
        <div className="">
          <p className=" font-medium text-[#7c7c7c] mb-2">Billing address</p>
          <p className=" ">{orderData.billingAddress.name}</p>
          <p className=" ">{orderData.billingAddress.company}</p>
          <p className=" ">{orderData.billingAddress.email}</p>
        </div>
        <div>
          <p className=" font-medium text-[#7c7c7c] mb-2">Method of dispatch</p>
          <p className=" ">{orderData.dispatchMethod}</p>
        </div>
      </div>
    </div>
  )
}

const ProductDetailsTable = ({ products, total }: { products: Product[], total?: string }) => {
  const columns: ColumnsType<Product> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      className: "text-lg text-textgray",
      render: (text: string) => <span className="font-normal">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "text-lg text-textgray",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      className: "text-lg text-textgray",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      className: "text-lg text-textgray",
      render: (price: string) => (
        <span className="font-medium">{price}</span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Product details</h3>
        <p className="font-medium text-textgray">
          {products.length} Items
        </p>
      </div>

      <hr className="mt-4.5 mb-5.5 border-t-[#E2E2E2]" />

      <Table
        columns={columns}
        dataSource={products}
        pagination={false}
        rowKey={(_, index) => index ?? 0}
        className="product-details-table"
      />

      {/* Total Row */}
      {total && (
        <>
          <hr className="mt-5 mb-4 border-t-[#E2E2E2]" />
          <div className="flex justify-between items-center px-4">
            <span className="text-xl font-semibold">Total</span>
            <span className="text-xl font-semibold">{total}</span>
          </div>
        </>
      )}
    </div>
  );
};

const Order = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const orderStatus = searchParams.get('orderstatus')
  const [showAnimation, setShowAnimation] = useState(orderStatus === 'confirmed')
  const [animationComplete, setAnimationComplete] = useState(false)

  const orderId = id ? parseInt(id) : 0
  const { data: orderResponse, isLoading, error } = useOrder(orderId)
  const order = orderResponse?.data

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  // Map API data to component format
  const orderData = order ? {
    orderNumber: order.orderNumber,
    status: order.orderStatus,
    date: formatDate(order.orderDate),
    email: order.billing.email,
    itemCount: order.itemCount,
    total: order.formattedTotal,
    assignedTo: [],
    billingAddress: {
      name: `${order.billing.firstName} ${order.billing.lastName}`,
      company: order.billing.companyName || '',
      email: order.billing.email
    },
    dispatchMethod: order.shippingMethod?.name || 'Not specified'
  } : null

  const products = order?.items.map((item: { productCode: string; productName: string; quantity: number; formattedSubtotal: string }) => ({
    code: item.productCode,
    description: item.productName,
    quantity: item.quantity,
    price: item.formattedSubtotal
  })) || []

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, 800)
  }

  if (isLoading) {
    return (
      <div className='container mx-auto pt-8 flex items-center justify-center min-h-[400px]'>
        <Spin size="large" />
      </div>
    )
  }

  if (error || !order || !orderData) {
    return (
      <div className='container mx-auto pt-8 flex items-center justify-center min-h-[400px]'>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Order Not Found</h2>
          <p className="text-gray-500">The order you're looking for doesn't exist or you don't have access to it.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {showAnimation && (
          <OrderConfirmationAnimation
            onComplete={handleAnimationComplete}
            orderNumber={order?.orderNumber}
          />
        )}
      </AnimatePresence>

      <div className="relative">
        {orderStatus === 'confirmed' && (
          <>
            <motion.div
              className="container mx-auto text-center pb-8 pt-[39px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationComplete ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                opacity: showAnimation ? 0.3 : 1
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: animationComplete ? 1 : 0.9,
                  opacity: animationComplete ? 1 : 0
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.4
                }}
                className="inline-block mb-4"
              >
                <img
                  src={successIcon}
                  alt="Success"
                  className="w-[53px] h-[53px]"
                />
              </motion.div>
              <h1 className="text-2xl font-semibold mb-3">
                Order Confirmed!
              </h1>
              <p className="text-textgray text-base">
                Your order <span className="text-black">#{order.orderNumber}</span> has been confirmed and is currently under review.
              </p>
            </motion.div>

            <motion.div
              className="container mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: animationComplete ? 1 : 0,
                y: animationComplete ? 0 : 30
              }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                opacity: showAnimation ? 0.3 : 1
              }}
            >
              <OrderSummaryCard orderData={orderData} />
              <ProductDetailsTable products={products} total={orderData.total} />
            </motion.div>
          </>
        )}

        {orderStatus !== 'confirmed' && (
          <div className="container mx-auto px-4 py-9">
            <Button className='mb-2 text-primary! px-0!' type='link' icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>Back</Button>

            <p className="text-2xl font-medium mb-4">Order Details</p>
            <OrderSummaryCard orderData={orderData} />
            <ProductDetailsTable products={products} total={orderData.total} />
          </div>
        )}
      </div>

      <div style={{
        opacity: showAnimation ? 0.3 : 1,
        filter: showAnimation ? 'blur(1px)' : 'none'
      }}>
        <ImageCarousel />
        <GetInTouch />
      </div>
    </>
  )
}

export default Order