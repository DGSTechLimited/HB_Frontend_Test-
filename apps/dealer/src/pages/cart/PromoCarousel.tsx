import { Carousel } from 'antd';

const PromoCarousel = () => {
    const slides = [
        {
            id: 1,
            image: '/car1.webp',
            titleStart: 'Introducing',
            titleHighlight: 'Air Suspension Kit',
            titleEnd: 'for Defender',
            subtitle: "Unleash your defender's potential!"
        },
        {
            id: 2,
            image: '/car2.webp',
            titleStart: 'New',
            titleHighlight: 'Performance Brakes',
            titleEnd: 'for Range Rover',
            subtitle: 'Experience superior stopping power!'
        },
        {
            id: 3,
            image: '/car3.webp',
            titleStart: 'Premium',
            titleHighlight: 'LED Headlights',
            titleEnd: 'for Discovery',
            subtitle: 'Illuminate your journey!'
        }
    ];

    return (
        <div className="w-full pb-5 relative">
            <Carousel
                autoplay
                autoplaySpeed={3000}
                dots={{ className: 'promo-carousel' }}
            >
                {slides.map((slide) => (
                    <div key={slide.id}>
                        <div className="flex flex-col pb-4">
                            {/* Image Container */}
                            <div className="w-full h-[180px] overflow-hidden rounded-2xl mb-5">
                                <img
                                    src={slide.image}
                                    alt={`${slide.titleHighlight}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col px-2">
                                <h3 className="text-2xl font-normal mb-2">
                                    {slide.titleStart}{' '}
                                    <span className="text-primary font-medium">
                                        {slide.titleHighlight}
                                    </span>{' '}
                                    {slide.titleEnd}
                                </h3>
                                <p className="text-neutral-500 text-base">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default PromoCarousel;
