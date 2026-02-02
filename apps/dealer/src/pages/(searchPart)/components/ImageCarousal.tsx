import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper.css";

import Image1 from "@/assets/images/image1.png";
import Image2 from "@/assets/images/image2.png";
import Image3 from "@/assets/images/image3.png";

const ImageCarousel = () => {
  const swiperRef = useRef<any>(null);

  const images = [
    { id: 1, url: Image1, alt: "Image 1" },
    { id: 2, url: Image2, alt: "Image 2" },
    { id: 3, url: Image3, alt: "Image 3" },
    { id: 4, url: Image1, alt: "Image 4" },
    { id: 5, url: Image2, alt: "Image 5" },
    { id: 6, url: Image3, alt: "Image 6" },
  ];

  return (
    <div className="w-full mx-auto py-9">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={23}
        slidesPerView={5}
        loop
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="py-9">
            <div
              className="carousel-image-container"
              onMouseEnter={() => swiperRef.current?.autoplay.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay.start()}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="carousel-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
