import { Chevron, ChevronLeft } from "@/icons/UtilIcons"

const SwiperOptions = (props) => {
    const {
        activeSlide, slidesLength, widthFixed, hideOptions,
        className
    } = props

    return (
        <div
            className={`${hideOptions ? "hidden" : "flex"} lg:px-6 mb-12 mt-4 lg:mt-6 interactive-element top swiper-options ${className}`}
        >
            <div className="hidden w-6/12 lg:w-1/12 lg:flex items-center text-sm">
                <span className="font-semibold inline-block">
                    {activeSlide}
                </span>
                <span className="font-semibold inline-block h-1 w-8 bg-gray-200 mx-4" />
                <span className="font-semibold inline-block">
                    {slidesLength}
                </span>
            </div>
            <div className="hidden lg:flex w-10/12 px-8 items-center">
                <div className="w-full h-1 bg-gray-200 relative">
                    <span className="block bg-gray-900 absolute top-0 left-0 h-full custom-transition transition-all duration-300" style={{ width: `${widthFixed}%` }} />
                    <span className="sr-only">{Math.round(widthFixed)}% of carousel</span>
                </div>
            </div>
            <div className="w-full lg:w-1/12 flex justify-end lg:justify-between px-0 absolute lg:static top-4 right-4 z-10">
                <div className="mr-4 cursor-pointer bg-white bg-opacity-70 lg:bg-opacity-0 flex justify-center items-center p-2 swiper-prev-button">
                    <span className="pointer-events-none">
                        <ChevronLeft />
                    </span>
                </div>
                <div className="cursor-pointer bg-white bg-opacity-70 lg:bg-opacity-0 flex justify-center items-center p-2 swiper-next-button">
                    <span className="pointer-events-none">
                        <Chevron />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SwiperOptions
