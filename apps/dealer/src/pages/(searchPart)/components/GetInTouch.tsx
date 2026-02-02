import getInTouchBg from '@assets/images/getInTouch.png'
import { Button, Form, Input } from 'antd'

const GetInTouch = () => {
    return (
        <div
            className="container mx-auto min-h-[546px] rounded-[30px] bg-cover bg-center bg-no-repeat flex pt-8.5 mb-20.5"
            style={{ backgroundImage: `url(${getInTouchBg})` }}
        >
            <div className=' w-[60%] pl-12.5 pb-[53px] flex flex-col justify-end '>
                <p className='text-[38px] font-light text-white' style={{ lineHeight: '49px', letterSpacing: '-3%' }}>Get <br />
                    <span className='font-medium'>Genuine and Aftermarket</span> <br />
                    Vehicle Spare Parts!</p>
                <Button className='font-medium uppercase w-[189px] bg-white text-primary rounded-[32px]! h-12! mt-[22px] px-8.5!'>Explore More</Button>
            </div>
            <div className=' w-[40%] pr-8.5 pb-7'>
                <div className='w-full h-full bg-[#FAFAFA] rounded-[30px] py-6.5 px-6'>
                    <p className=' text-[28px] font-medium mb-4.5'>Get in Touch</p>
                    <Form layout="vertical">
                        <div className=' flex gap-2.5 w-full'>
                            <Form.Item name='fullName' label='Full Name' className='w-1/2'>
                                <Input className='border-bordergray! h-10.5!' placeholder='Enter your full name' />
                            </Form.Item>
                            <Form.Item name='email' label='Email Address' className='w-1/2'>
                                <Input className='border-bordergray! h-10.5!' placeholder='Enter your email address' />
                            </Form.Item>
                        </div>
                        <div className=' flex gap-2.5 w-full'>  <Form.Item name='companyName' label='Company Name' className='w-1/2'>
                            <Input className='border-bordergray! h-10.5!' placeholder='Enter your company name' />
                        </Form.Item>
                            <Form.Item name='country' label='Country' className='w-1/2'>
                                <Input className='border-bordergray! h-10.5!' placeholder='Enter your country' />
                            </Form.Item>
                        </div>
                        <Form.Item name='message' label='Message'>
                            <Input.TextArea rows={5} className='border-bordergray! ' placeholder='Enter your message' />
                        </Form.Item>
                        <div className=' flex justify-end'>
                            <Button type="primary" htmlType="submit" className='w-[151px] h-11! px-8.5! rounded-[32px]!'>SEND ENQUIRY</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch