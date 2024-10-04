import { SwiperSlide } from "swiper/react";
import SwiperComponent from '@/swiper/SwiperComponent';
import ExternalImage from '@/ui/ExternalImage';
import Style from "@/css/slider.module.scss"

const VillaHeroImage = ({sliderData}) => {
    return (
        <section className="relative">
            <SwiperComponent    
                pagination={{ clickable: true }} 
                slidesPerView={1}
                effect={'fade'}
                autoplay={{
                    "delay": 4500,
                    "pauseOnMouseEnter":true
                }} 
                spaceBetween={0}
                removeOptions={true}>
                {
                  sliderData.map((item,index) => (
                        <SwiperSlide key={item.title}>
                            <div className={Style.slider__height + " flex flex-col w-full relative"}>
                                <ExternalImage src={item.altImage} alt={item.title} key={item.image + item.link} layout="fill" objectFit="cover" priority={index == 0 ? true : false} loading="eager" /> 
                                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8 w-full absolute transform -translate-x-1/2 lg:top-20 top-1/2 -translate-y-1/2 sm:translate-y-0 sm:top-12 left-1/2 z-20 sm:pt-24">
                                    <div className="text-white lg:pr-16 interactive-slider">
                                        <span className="text-sm uppercase block">#wearedat</span>
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl capitalize block relative z-10 lg:mb-0 font-bold">{item.title}</h2>
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

export default VillaHeroImage
