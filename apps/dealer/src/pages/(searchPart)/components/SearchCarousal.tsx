import { useState } from 'react';
import { Carousel, ConfigProvider } from 'antd';

const CarouselComponent = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [previousSlide, setPreviousSlide] = useState<number | null>(null);


    const handleBeforeChange = (current: number, next: number) => {
        setPreviousSlide(current);
        setCurrentSlide(next);
    };

    const handleAfterChange = () => {
        setPreviousSlide(null);
    };

    const slides = [
        {
            id: 1,
            image: '/car3.webp',
            title: (
                <p className='text-[32px] font-light' style={{ lineHeight: '46px' }}>
                    Unique <span className='font-medium'>JLR range of</span> <br /> <span className="font-medium">products</span> to offer customers <br /> worldwide!
                </p>
            ),
            description: 'Evolving into a company synonymous with reliability and authenticity.'
        },
        {
            id: 2,
            image: '/car2.webp',
            title: (
                <p className='text-[32px] font-light' style={{ lineHeight: '46px' }}>
                    <span className="font-medium">Specialist for Original </span> Jaguar <br /> and Rover vehicle parts
                </p>
            ),
            description: 'Hotbray Ltd is the source for Original Jaguar, Land Rover and Rover vehicle parts for customers around the world.'
        },
        {
            id: 3,
            image: '/car1.webp',
            title: (
                <p className='text-[32px] font-light' style={{ lineHeight: '46px' }}>
                    Distributing quality spare <br /> parts throughout the world <br /> <span className="font-medium">since 1972.</span>
                </p>
            ),
            description: 'Built on decades of trust, reliability, and worldwide reach'
        }
    ];

    return (
        <div className="w-full relative">
            <ConfigProvider theme={{
                components: {
                    Carousel: {
                        dotActiveWidth: 90
                    }
                }
            }}>
                <Carousel

                    autoplay
                    autoplaySpeed={3000}
                    beforeChange={handleBeforeChange}
                    afterChange={handleAfterChange}
                    effect="fade"
                    dots={{ className: 'slick-dots-bottom' }}
                >
                    {slides.map((slide) => (
                        <div key={slide.id}>
                            <div className="relative w-full h-[400px] overflow-hidden">
                                <div className="absolute inset-0 carousel-animate-zoomIn">
                                    <img
                                        src={slide.image}
                                        alt=""
                                        className="w-full h-full object-cover rounded-[21px]"
                                    />
                                    <div
                                        className="absolute inset-0 rounded-[21px]"
                                        style={{
                                            background:
                                                'linear-gradient(256.59deg, rgba(0, 0, 0, 0) 29.04%, rgba(0, 0, 0, 0.78) 89.18%)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </ConfigProvider>


            <div className="absolute top-1/2 left-12 md:left-20 -translate-y-1/2 max-w-2xl text-white">
                <div key={currentSlide}>
                    <div className="carousel-title">
                        {slides[currentSlide].title}
                    </div>

                    <p
                        className="carousel-description text-xl md:text-lg font-normal text-[#FFFFFFC9] mt-7.5"
                        style={{ lineHeight: '33px', letterSpacing: '-1.5%' }}
                    >
                        {slides[currentSlide].description}
                    </p>
                </div>
            </div>


        </div>
    );
};

export default CarouselComponent;