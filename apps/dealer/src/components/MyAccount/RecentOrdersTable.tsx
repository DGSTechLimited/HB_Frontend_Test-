import { useOrders } from '@/services/order'
import { Button, Table, Tag, Alert, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

export interface OrderListItem {
    key: string
    orderNumber: string
    orderDate: string
    orderStatus: string
    totalAmount: string
    itemCount: number
    id: number
}

interface RecentOrdersTableProps {
    orders: OrderListItem[]
    isLoading?: boolean
    error?: Error | null
    onSeeAll?: () => void
    onViewDetails?: (orderNumber: string) => void
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered':
            return 'success'
        case 'processing':
            return 'processing'
        case 'pending':
            return 'warning'
        case 'cancelled':
            return 'error'
        default:
            return 'default'
    }
}


const RecentOrdersTable = () => {
    const navigate = useNavigate()
    // Fetch recent orders from API
    const { data: ordersData, isLoading, error } = useOrders({
        status: 'CREATED',
        type: 'recent',
        page: 1,
        limit: 10
    })

    // Transform API data to match OrderListItem interface
    const orders: OrderListItem[] = ordersData?.data.map((order: any) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        totalAmount: order.formattedTotal,
        itemCount: order.itemCount
    })) || []

    const handleEditProfile = () => {
        // TODO: Implement edit profile functionality
        console.log('Edit profile clicked')
    }

    const handleSeeAllOrders = () => {
        // TODO: Navigate to all orders page
        console.log('See all orders clicked')
    }

    const handleViewOrderDetails = (orderNumber: string) => {
        navigate(`/order/${orderNumber}`)
    }


    const columns: ColumnsType<OrderListItem> = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (text: string) => <span className="font-medium text-primary">{text}</span>
        },
        {
            title: 'Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (date: string) => new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>
                    {status.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Items',
            dataIndex: 'itemCount',
            key: 'itemCount',
            align: 'center'
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: string) => <span className="font-semibold">{amount}</span>
        },

    ]

    return (
        <div className="flex flex-col w-full p-5 bg-white rounded-xl">
            <div className="flex w-full justify-between">
                <div className="flex flex-col">
                    <span className='text-xl font-medium'>Recent Orders</span>
                    <span className='text-sm text-gray-500 mt-1'>
                        View all your orders, track their status, and access detailed order information in one place.
                    </span>
                </div>
                <Button type='link' onClick={handleSeeAllOrders}>See All</Button>
            </div>
            <div className="mt-5">
                {error && (
                    <Alert
                        message="Error loading orders"
                        description={error.message || 'Failed to fetch orders. Please try again later.'}
                        type="error"
                        showIcon
                        className="mb-4"
                    />
                )}
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <Spin size="large" tip="Loading orders..." />
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={orders}
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: false,
                            showTotal: (total) => `Total ${total} orders`
                        }}
                        locale={{
                            emptyText: 'No orders found'
                        }}
                        rowKey={'id'}
                        onRow={(record) => ({
                            className: 'cursor-pointer',
                            onClick: () => handleViewOrderDetails(record.id.toString())
                        })}
                    />
                )}
            </div>
        </div>
    )
}

export default RecentOrdersTable
