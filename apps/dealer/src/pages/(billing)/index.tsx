
import ImageCarousel from '../(searchPart)/components/ImageCarousal'
import GetInTouch from '../(searchPart)/components/GetInTouch'
import { Button, Form, Input, Select, message, Spin } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useCart } from '@/services/cart'
import { useCreateOrder } from '@/services/order'
import { useProfile } from '@/services/auth'
import { useDispatchMethods } from '@/services/master'
import { useNavigate } from 'react-router-dom'

const BillingDetails = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { data: cartData, isLoading: isLoadingCart } = useCart()
  const { data: profileData, isLoading: isLoadingProfile } = useProfile()
  const { data: dispatchMethodsData, isLoading: isLoadingDispatchMethods } = useDispatchMethods()
  const createOrder = useCreateOrder()

  const cart = cartData?.data
  const items = cart?.items || []
  const summary = cart?.summary
  const profile = profileData?.data
  const dispatchMethods = dispatchMethodsData?.data || []

  const handleConfirmOrder = async (values: any) => {
    if (!cart?.id) {
      message.error('Cart not found')
      return
    }

    if (items.length === 0) {
      message.error('Your cart is empty')
      return
    }

    const payload = {
      cartId: cart.id,
      shippingMethodId: values.methodOfDispatch,
      billingOrderNo: values.orderNumber || undefined,
      billingFirstName: values.firstName,
      billingLastName: values.lastName,
      billingEmail: values.email,
      billingCompanyName: values.companyName || undefined,
      notes: values.orderNotes || undefined,
    }

    createOrder.mutate(
      payload,
      {
        onSuccess: (response) => {
          message.success(response.message)
          // Navigate to order confirmation or orders list
          navigate(`/order/${response.data.orderId}?orderstatus=confirmed`)
        },
        onError: (error: any) => {
          message.error(error?.response?.data?.message || 'Failed to create order')
        },
      }
    )
  }

  if (isLoadingCart || isLoadingProfile || isLoadingDispatchMethods) {
    return (
      <div className='container mx-auto pt-8 flex items-center justify-center min-h-[400px]'>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <div className='container mx-auto pt-9'>
        <p className=' text-2xl font-medium mb-4'>Billing details</p>
        <div className=' flex w-full  gap-3'>
          <div className='w-[40%] py-9 px-7.5 bg-white rounded-[20px]'>
            <Form
              layout='vertical'
              form={form}
              initialValues={{
                firstName: profile?.firstName || '',
                lastName: profile?.lastName || '',
                email: profile?.email || '',
                companyName: profile?.dealer?.companyName || '',
                methodOfDispatch: profile?.dealer?.defaultShippingMethodId || undefined,
              }}
              onFinish={handleConfirmOrder}
            >
              <p className=' uppercase text-sm font-medium mb-4 text-[#929292]'>order information</p>
              <div className='flex gap-4 w-full'>
                <Form.Item name='orderNumber' label={<span className=''>Order Number <span className='text-sm text-[#929292]'> (Optional)</span></span>} className='w-1/2'>
                  <Input size='large' placeholder='Enter order number' />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Please select a method of dispatch' }]} name='methodOfDispatch' label='Method of Dispatch' className='w-1/2'>
                  <Select
                    size='large'
                    placeholder='Select method of dispatch'
                    options={dispatchMethods.map(method => ({
                      label: method.name,
                      value: method.id,
                    }))}
                  />
                </Form.Item>

              </div>
              <Form.Item name='orderNotes' label={<span className=''>Order Notes <span className='text-sm text-[#929292]'> (Optional)</span></span>}>
                <Input.TextArea
                  className='resize-none!'
                  size='large'
                  placeholder='Enter order notes'
                  rows={3}
                />
              </Form.Item>
              <hr className='mt-5.5 mb-4 border-t-[#DADADA]' />
              <p className=' uppercase text-sm font-medium mb-4 text-[#929292]'>basic Details</p>
              <div className='flex gap-4 w-full'>
                <Form.Item rules={[{ required: true, message: 'Please enter your first name' }]} name='firstName' label='First Name' className='w-1/2'>
                  <Input size='large' placeholder='Enter first name' />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Please enter your last name' }]} name='lastName' label='Last Name' className='w-1/2'>
                  <Input size='large' placeholder='Enter last name' />
                </Form.Item>
              </div>
              <Form.Item rules={[{ required: true, message: 'Please enter your email address' }]} name='email' label='Email Address' className='w-full'>
                <Input size='large' placeholder='Enter email' />
              </Form.Item>
              <Form.Item name='companyName' label={<span className=''>Company Name <span className='text-sm text-[#929292]'> (Optional)</span></span>} className='w-full'>
                <Input size='large' placeholder='Enter company name' />
              </Form.Item>

            </Form>
            <div className='flex  gap-1 items-start text-textgray max-w-[95%] mt-5'>
              <InfoCircleOutlined className='mt-[3px]' />
              <p className=' text-sm text-textgray'> Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span className='text-primary! underline cursor-pointer'>privacy policy</span>.</p>
            </div>
          </div>
          <div className='w-[60%] bg-white rounded-[20px] p-5.5 pb-7!'>
            <p className=' font-medium text-xl'>Your Order</p>
            <hr className='my-4.5 border-t-[#00000033]' />
            <div className=' flex flex-col justify-between h-[90%]'>
              <div className=' max-h-[400px] overflow-y-auto'>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-start justify-between gap-4 py-4 border-b border-[#DADADA] last:border-b-0'
                    >

                      <div className=''>
                        <p className='font-semibold text-base '>{item.product.code}</p>
                        <p className='text-xs text-[#929292] mt-0.5 truncate'>{item.product.name}</p>
                      </div>



                      <div className='flex items-center gap-4 shrink-0 w-[30%] justify-between'>
                        <span className='text-sm mt-2.5'>X {item.quantity}</span>
                        <span className='font-medium text-lg '>{item.formattedSubtotal}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div>
                <div className='flex  gap-1 items-start text-textgray max-w-[95%] mt-5'>
                  <InfoCircleOutlined className='mt-[3px] w-3 h-3 ' />
                  <p className=' text-xs text-textgray'>All prices quoted are Ex-works UK Pounds Sterling excluding VAT at current prevailing rate. </p>
                </div>
                <div className=' flex w-full justify-between mt-2 items-end'>
                  <div className=' flex gap-3 items-center'>
                    {/* <div className=' flex flex-col gap-3.5 w-[123px] border-r border-r-[#E0E0E0]'>
                  <p className='text-sm '>Subtotal</p>
                  <p className='text-lg font-medium '>{summary?.formattedSubtotal || '-'}</p>
                </div> */}
                    {/* <hr className='mt-2.5 border-t-[#EAEAEA]' /> */}
                    <div className=' flex flex-col gap-2 w-[123px]'>
                      <p className='text-sm mt-2'>Total</p>
                      <p className='text-[28px] font-medium '>{summary?.formattedTotal || '-'}</p>
                    </div>
                  </div>
                  <Button
                    type='primary'
                    size='large'
                    className='w-[184px]! h-11! rounded-[32px]! uppercase px-8! text-sm!'
                    onClick={() => form.submit()}
                    loading={createOrder.isPending}
                    disabled={items.length === 0}
                  >
                    Confirm Order
                  </Button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
      <ImageCarousel />
      <GetInTouch />
    </>
  )
}

export default BillingDetails