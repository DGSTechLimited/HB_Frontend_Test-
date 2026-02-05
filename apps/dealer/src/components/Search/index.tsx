import { Button, Input, Segmented, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AddToCart from './AddToCart'
import { useInfiniteProductList, type ProductType, type IProduct } from '@/services/products'
import { useProfile } from '@/services/auth'
import { useCartCount } from '@/services/cart'
import { useState, useMemo, useCallback, useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import Cart from '../Cart'
import { Link } from 'react-router-dom'

const SearchPage = () => {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [type, setType] = useState<ProductType | undefined>(undefined)
    const limit = 20

    // Debounce search input (200ms delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            // Only set debounced search if it's empty or has 3+ characters
            if (search.length === 0 || search.length >= 3) {
                setDebouncedSearch(search)
            }
        }, 200)

        return () => clearTimeout(timer)
    }, [search])

    // Get dealer profile for tier information
    const { data: profileData } = useProfile()


    // Get cart count
    const { data: cartCountData } = useCartCount()
    const cartCount = cartCountData?.data.count || 0

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProductList({
        limit,
        q: debouncedSearch || undefined,
        type,
    })

    // Flatten all pages into a single array
    const allProducts = useMemo(() => {
        if (!(data as any)?.pages) return []
        return (data as any).pages.flatMap((page: any) => page.data)
    }, [data])

    // Get metadata from the last page
    const meta = useMemo(() => {
        if (!(data as any)?.pages || (data as any).pages.length === 0) return undefined
        return (data as any).pages[(data as any).pages.length - 1].meta
    }, [data])

    // Helper function to get the correct price based on product type and dealer tier
    const getProductPrice = useCallback((product: IProduct): number => {
        if (!profileData?.data.dealer) return product.net1

        const { genuinePartsTier, aftermarketESTier, aftermarketBTier } = profileData.data.dealer

        let tierName: string

        switch (product.type) {
            case "Genuine":
                tierName = genuinePartsTier
                break
            case "Aftermarket":
                tierName = aftermarketESTier
                break
            case "Branded":
                tierName = aftermarketBTier
                break
            default:
                tierName = 'Net1'
        }

        // Convert tier name (e.g., "Net1") to property name (e.g., "net1")
        const tierKey = tierName.toLowerCase() as keyof Pick<IProduct, 'net1' | 'net2' | 'net3' | 'net4' | 'net5' | 'net6' | 'net7'>


        return product[tierKey] || product.net1
    }, [profileData])

    // Helper function to format price with currency
    const formatPrice = useCallback((price: number, currency: string): string => {
        const currencySymbols: Record<string, string> = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'JPY': '¥',
            'INR': '₹',
            'AED': 'د.إ',
            'SAR': 'ر.س',
        }

        const symbol = currencySymbols[currency] || currency

        return `${symbol} ${price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`
    }, [])

    // Helper function to render stock with conditional display and colors
    const renderStock = useCallback((stock: number, type: ProductType) => {
        if (stock <= 0) {
            if (['Genuine', "GENUINE"].includes(type as string)) {
                return <Tag color="orange">Ordered on demand</Tag>
            }
            return <Tag color="red"><b>{stock}</b> in stock</Tag>
        } else if (stock < 200) {
            return <Tag color="blue"><b>{stock}</b> in stock</Tag>
        } else {
            return <Tag color="green"><b>200+</b> in stock</Tag>
        }
    }, [])


    const columns: ColumnsType<IProduct> = [
        {
            title: 'Stock Number',
            dataIndex: 'code',
            render: (text: string, record) => <div className='flex flex-col' >
                <span>{text}</span>
                {
                    record?.superseding?.code &&
                    <div className="bg-blue-100 text-neutral-700 rounded-full text-xs w-max py-1 px-2">
                        Superseded by: <span className='text-primary font-medium'>{record?.superseding?.code}</span>
                    </div>
                }
            </div>,
        },
        {
            title: 'Description',
            dataIndex: 'name',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            render: (stock: number, record) => {
                return renderStock(stock, record.type)
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (v: string) => <span className='font-medium'>{v}</span>,
            width: 100,
        },
        {
            title: 'Buy',
            key: 'action',
            render: (_, record) => <AddToCart id={record.id} productCode={record.code} />,
            width: 150,
        }
    ]


    return (
        <section id='parts-search' className='container mx-auto mt-12' >
            <div className="flex w-full p-5 rounded-xl bg-white flex-col pb-20">
                <span className='text-2xl font-medium' >Parts Catalog Search</span>
                <span className='text-sm text-neutral-500 mt-2' >Find reliable and verified vehicle spare parts with complete specifications to support faster ordering and fulfillment.</span>

                <div className="flex mt-5 gap-x-3">
                    <Segmented
                        size='large'
                        value={type || 'all'}
                        onChange={(value) => {
                            setType(value === 'all' ? undefined : value as ProductType)
                        }}
                        options={[{
                            value: 'all',
                            label: 'All',
                        }, {
                            value: 'GENUINE',
                            label: 'Genuine',
                        }, {
                            value: 'AFTERMARKET',
                            label: 'Aftermarket',
                        }, {
                            value: 'BRANDED',
                            label: 'Branded',
                        }]}
                    />
                    <Input
                        className='rounded-full!'
                        size='large'
                        placeholder='Search by Code, Name (minimum 3 characters)'
                        prefix={<SearchOutlined />}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        allowClear
                    />
                </div>
                <div className="flex flex-col mt-5">
                    {debouncedSearch && (
                        <span className='text-neutral-500 text-base pl-3'>
                            {meta?.total === 'undefined' ? '-' : meta?.total} results found
                            {debouncedSearch && ` for "${debouncedSearch}"`}
                        </span>
                    )}
                    <div className="grid grid-cols-12 w-full gap-x-3 mt-3 relative">
                        {/* Left column - Empty state or Search results */}
                        <div className="flex col-span-8">
                            {!debouncedSearch ? (
                                // Empty state when no search
                                <div className="flex w-full flex-col items-center justify-center rounded-[18px] border border-[rgba(255,138,0,0.25)] bg-[rgba(255,138,0,0.08)] py-20 shadow-[0_12px_24px_-20px_rgba(255,138,0,0.35)] transition-colors duration-200 hover:bg-[rgba(255,138,0,0.12)]">
                                    <img
                                        src="/empty_search.webp"
                                        alt="Start your search"
                                        className="w-64 h-64 mb-6"
                                    />
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        Start your search!
                                    </h3>
                                    <p className="text-base text-gray-500 text-center max-w-md">
                                        Begin your search to explore available vehicle spare parts, check stock status, and proceed with your selection.
                                    </p>
                                </div>
                            ) : (
                                <div className="w-full rounded-[18px] border border-[rgba(255,138,0,0.25)] bg-[rgba(255,138,0,0.08)] p-3 shadow-[0_12px_24px_-20px_rgba(255,138,0,0.35)] transition-colors duration-200 hover:bg-[rgba(255,138,0,0.12)]">
                                    <Table<IProduct>
                                        className='w-full'
                                        columns={columns}
                                        dataSource={allProducts.flatMap((product: IProduct) => {
                                            const price = getProductPrice(product)
                                            const items = [{
                                                id: product.id,
                                                code: product.code,
                                                name: product.name,
                                                stock: product.stock,
                                                price: formatPrice(price, product.currency),
                                                superseding: product.superseding,
                                                type: product.type,
                                            }]

                                            // Add superseding product as an extra item if it exists
                                            if (product.superseding) {
                                                const supersedingPrice = getProductPrice(product.superseding as IProduct)
                                                items.push({
                                                    id: product.superseding.id,
                                                    code: product.superseding.code,
                                                    name: product.superseding.name,
                                                    stock: product.superseding.stock,
                                                    price: formatPrice(supersedingPrice, product.superseding.currency),
                                                    superseding: null,
                                                    type: product.superseding.type,
                                                })
                                            }

                                            return items
                                        })}
                                        loading={isLoading}
                                        pagination={false}
                                        rowKey='id'
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right column - Cart (always visible) */}
                        <div className="flex col-span-4 pl-3">
                            <div className="flex sticky top-[150px] flex-col w-full h-[600px] rounded-[18px] border border-[rgba(255,138,0,0.25)] bg-[rgba(255,138,0,0.08)] p-4 shadow-[0_12px_24px_-20px_rgba(255,138,0,0.35)] transition-colors duration-200 hover:bg-[rgba(255,138,0,0.12)]">
                                <div className="flex w-full justify-between items-center py-2 border-b border-[rgba(255,138,0,0.25)]">
                                    <div className="flex gap-x-2 items-center">
                                        <span className='text-base font-medium text-[#FF8A00]'>Your Cart</span>
                                        {
                                            !!cartCount &&
                                            <span className='text-[#FF8A00] bg-[rgba(255,138,0,0.12)] rounded-full px-2 py-1 text-xs font-semibold flex items-center justify-center'>
                                                {cartCount}
                                            </span>
                                        }
                                    </div>
                                    <Link to="/cart">
                                        <Button type='text' className='underline underline-offset-2'>View all</Button>
                                    </Link>
                                </div>
                                <div className="flex flex-col mt-5 h-full">
                                    <Cart />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Load More button */}
                    {meta && meta.total > 0 && (
                        <div className="flex w-full mt-10 justify-center items-center flex-col">
                            <span className='text-base text-neutral-500'>
                                Showing {allProducts.length} of {meta.total} items
                            </span>
                            {hasNextPage && (
                                <Button
                                    size='large'
                                    className='mt-5 px-10!'
                                    onClick={() => fetchNextPage()}
                                    loading={isFetchingNextPage}
                                >
                                    Load More
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SearchPage
