import getInTouchBg from '@assets/images/getInTouch.png'
import { Button, Form, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import '@/styles/getInTouchAnimations.css'
import partsStyles from './getInTouchBannerParts.module.css'

const GetInTouch = () => {
    const cardRef = useRef<HTMLDivElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const node = cardRef.current
        if (!node) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            className="container mx-auto min-h-[546px] rounded-[30px] bg-cover bg-center bg-no-repeat flex pt-8.5 mb-20.5"
            style={{ backgroundImage: `url(${getInTouchBg})` }}
        >
            <div className=' w-[60%] pl-12.5 pb-[53px] flex flex-col justify-end relative overflow-hidden'>
                <p className='text-[38px] font-light text-white' style={{ lineHeight: '49px', letterSpacing: '-3%' }}>Get <br />
                    <span className='font-medium'>Genuine and Aftermarket</span> <br />
                    Vehicle Spare Parts!</p>
                <Button className='font-medium uppercase w-[189px] bg-white text-primary rounded-[32px]! h-12! mt-[22px] px-8.5!'>Explore More</Button>
                <div className={partsStyles.partsLayer} aria-hidden="true">
                    <span className={`${partsStyles.part} ${partsStyles.gear} ${partsStyles.p1}`} />
                    <span className={`${partsStyles.part} ${partsStyles.disc} ${partsStyles.p2}`} />
                    <span className={`${partsStyles.part} ${partsStyles.bolt} ${partsStyles.p3}`} />
                    <span className={`${partsStyles.part} ${partsStyles.wrench} ${partsStyles.p4}`} />
                    <span className={`${partsStyles.part} ${partsStyles.gear} ${partsStyles.p5}`} />
                    <span className={`${partsStyles.part} ${partsStyles.disc} ${partsStyles.p6}`} />
                    <span className={`${partsStyles.part} ${partsStyles.bolt} ${partsStyles.p7}`} />
                    <span className={`${partsStyles.part} ${partsStyles.wrench} ${partsStyles.p8}`} />
                </div>
            </div>
            <div className=' w-[40%] pr-8.5 pb-7'>
                <div
                    ref={cardRef}
                    className={`w-full h-full bg-[#FAFAFA] rounded-[30px] py-6.5 px-6 hit-card ${isVisible ? 'is-visible' : ''}`}
                >
                    <p className=' text-[28px] font-medium mb-4.5 hit-item' style={{ '--i': 1 } as React.CSSProperties}>
                        Get in Touch
                    </p>
                    <Form layout="vertical">
                        <div className=' flex gap-2.5 w-full'>
                            <Form.Item name='fullName' label='Full Name' className='w-1/2 hit-field hit-item' style={{ '--i': 2 } as React.CSSProperties}>
                                <Input className='border-bordergray! h-10.5! hit-input' placeholder='Enter your full name' />
                            </Form.Item>
                            <Form.Item name='email' label='Email Address' className='w-1/2 hit-field hit-item' style={{ '--i': 3 } as React.CSSProperties}>
                                <Input className='border-bordergray! h-10.5! hit-input' placeholder='Enter your email address' />
                            </Form.Item>
                        </div>
                        <div className=' flex gap-2.5 w-full'>
                            <Form.Item
                                name='companyName'
                                label='Company Name'
                                className='w-1/2 hit-field hit-item'
                                style={{ '--i': 4 } as React.CSSProperties}
                            >
                                <Input className='border-bordergray! h-10.5! hit-input' placeholder='Enter your company name' />
                            </Form.Item>
                            <Form.Item name='country' label='Country' className='w-1/2 hit-field hit-item' style={{ '--i': 5 } as React.CSSProperties}>
                                <Input className='border-bordergray! h-10.5! hit-input' placeholder='Enter your country' />
                            </Form.Item>
                        </div>
                        <Form.Item name='message' label='Message' className='hit-field hit-item' style={{ '--i': 6 } as React.CSSProperties}>
                            <Input.TextArea rows={5} className='border-bordergray! hit-input' placeholder='Enter your message' />
                        </Form.Item>
                        <div className=' flex justify-end hit-item' style={{ '--i': 7 } as React.CSSProperties}>
                            <Button type="primary" htmlType="submit" className='w-[151px] h-11! px-8.5! rounded-[32px]! hit-button'>
                                SEND ENQUIRY
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch
