const BannerSection = ({content}) => {
    return (
        <section className="relative bg-gray-50 interactive-element top">
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
              <div className="py-16 lg:py-20">
                    <p className={(content.length > 250  ? "text-lg" : "text-xl lg:text-2xl xl:text-3xl ") + " lg:text-left  text-center leading-normal font-light"}>
                        {content}
                    </p>
              </div>
          </div>
        </section>
    )
}

export default BannerSection
