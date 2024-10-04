import { useState } from 'react'
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import { Swiper } from "swiper/react";
// Import Swiper styles
import SwiperCore, {
  EffectFade,
  Autoplay,
  Pagination,
  Navigation,
} from 'swiper';
import SwiperOptions from './SwiperOptions';
SwiperCore.use([EffectFade, Autoplay, Pagination, Navigation]);

const SwiperComponent = ({ children, removeOptions, ...rest }) => {
  const [slidesInfo, setSlidesInfo] = useState({
    activeSlide: 0,
    slidesLength: 0,
    widthFixed: 0
  })
  function getWidth(slides, progress) {
    let slidesLength = slides.length - 1,
      activeSlide = Math.round((progress * slidesLength) + 1),
      widthPercent = 100 / slides.length,
      widthFixed = (widthPercent * activeSlide);
    return { activeSlide, slidesLength, widthFixed };
  }
  return (
    <Swiper
      speed="1000ms"
      navigation={{
        nextEl: '.swiper-next-button',
        prevEl: '.swiper-prev-button',
      }}
      onInit={({ progress, slides, navigation, params }) => {
        setSlidesInfo((prevState) => ({
          activeSlide: getWidth(slides, progress).activeSlide,
          slidesLength: getWidth(slides, progress).slidesLength + 1,
          widthFixed: getWidth(slides, progress).widthFixed,
        }))
        getWidth(slides, progress)
      }}
      onUpdate={({ progress, slides }) => {
        setSlidesInfo((prevState) => ({
          activeSlide: getWidth(slides, progress).activeSlide,
          slidesLength: getWidth(slides, progress).slidesLength + 1,
          widthFixed: getWidth(slides, progress).widthFixed,
        }))
        getWidth(slides, progress)
      }}
      onSlideChange={({ progress, slides }) => {
        setSlidesInfo((prevState) => ({
          ...prevState,
          activeSlide: getWidth(slides, progress).activeSlide,
          widthFixed: getWidth(slides, progress).widthFixed,
        }))
      }}
      {...rest}>
      {children}
      <SwiperOptions slidesLength={slidesInfo.slidesLength}
        activeSlide={slidesInfo.activeSlide}
        widthFixed={slidesInfo.widthFixed}
        hideOptions={removeOptions}
        className="mb-0 lg:mt-8"
      />
    </Swiper>
  )
}

SwiperComponent.defaultPropTypes = {
  removeOptions: false
}

export default SwiperComponent
