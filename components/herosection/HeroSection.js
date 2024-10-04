import ExternalImage from '@/ui/ExternalImage';
import Style from "@/css/slider.module.scss"

const HeroSection = ({title,image,imageAlt,folder,description}) => {
    return (
        <section className="relative">
            <div className={Style.slider__height + " flex flex-col w-full relative"}>
                <ExternalImage key={title + image} src={image} folder={folder} alt={imageAlt} layout="fill" objectFit="cover" priority loading="eager" />  
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8 w-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-20 lg:pt-24">
                    <div className="text-white lg:pr-16 relative animate-to-top">
                        <span className="text-sm uppercase block">#wearedat</span>
                        <h1 className="w-full text-3xl lg:text-4xl xl:text-5xl leading-12 lg:leading-normal font-semibold relative z-10">{title}</h1>
                        {
                            description !== "" &&
                            <p className="w-full max-w-lg text-lg leading-7 font-medium relative z-10">{description}</p>
                        }
                    </div>
                </div>
                <div className={Style.slider__overlay + " left-0 top-0 w-full h-full absolute"}/>
            </div>
        </section>
    )
}
HeroSection.defaultProps = {
    folder:'uploads'
}
export default HeroSection
