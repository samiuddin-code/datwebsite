import { SwiperSlide } from "swiper/react";
import SwiperComponent from '@/swiper/SwiperComponent';
import ExternalImage from '@/ui/ExternalImage';
import Style from "@/css/slider.module.scss"
const HeroImage = ({sliderData}) => {
    return (
        <section className="relative">
            <SwiperComponent 
                pagination={{ clickable: true }}
                slidesPerView={1}
                effect={'fade'}
                autoplay={{
                    "delay": 4500
                }} 
                spaceBetween={0}
                removeOptions={true}>
                {
                  sliderData.data.map((item,index) => (
                        <SwiperSlide key={index}>
                            <div className={Style.slider__height + " flex flex-col w-full relative"}>
                                <ExternalImage key={item.link} src={item.image} alt={item.link} layout="fill" objectFit="cover" priority={index == 0 ? true : false} loading="eager" /> 
                                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8 w-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-20 lg:pt-24">
                                    <div className="text-white lg:pr-16 interactive-slider">
                                        <span className="text-sm uppercase block">#wearedat</span>
                                        <h2 className="w-full text-3xl lg:text-4xl xl:text-5xl md:leading-12 lg:leading-normal font-semibold relative z-10">{item.title}</h2>
                                        <p className="w-full max-w-lg text-lg leading-7 font-medium relative z-10">{item.description}</p>
                                    </div>
                                </div>
                                <div className={Style.slider__overlay + " left-0 top-0 w-full h-full absolute"}/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </SwiperComponent>
        </section>
    )
}

export default HeroImage
