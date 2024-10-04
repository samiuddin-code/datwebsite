import { SwiperSlide } from "swiper/react";
import SwiperComponent from '@/swiper/SwiperComponent'
import ExternalImage from '@/ui/ExternalImage';
const ClientSection = ({ data }) => {
    return (
        <section className="bg-gray-900 py-20 border-b-2 border-white border-opacity-10">
            <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
                <SwiperComponent slidesPerView={2} spaceBetween={30} removeOptions={true}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }} breakpoints={{
                        "768": {
                            "slidesPerView": 3,
                            "spaceBetween": 30
                        },
                        "1024": {
                            "slidesPerView": 4,
                            "spaceBetween": 30
                        },
                        "1200": {
                            "slidesPerView": 5,
                            "spaceBetween": 30
                        }
                    }} className="px-6 interactive-element top">
                    {data.map((item, index) => (
                        <SwiperSlide key={`client-${index}`}>
                            <div className="relative h-16 filter grayscale hover:grayscale-0 transition-all duration-300 ease-linear">
                                <ExternalImage src={item.image} alt={item.description} layout="fill" objectFit="contain" />
                            </div>
                        </SwiperSlide>
                    ))}
                </SwiperComponent>
            </div>
        </section>
    )
}
export default ClientSection