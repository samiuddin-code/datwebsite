import { useRouter } from 'next/router'
import { SwiperSlide } from "swiper/react";
import BannerSection from '@/banners/BannerSection'
import HeroSection from '@/herosection/HeroSection'
import Meta from '@/components/Meta'
import ExternalImage from '@/ui/ExternalImage'
import ModalButton from '@/modals/ModalButton'
import SectionHeader from '@/ui/SectionHeader'
import SwiperComponent from '@/swiper/SwiperComponent'
import Card from '@/ui/Card'
import LinkButton from '@/ui/LinkButton'
import Styles from '@/css/Service.module.scss'

const ServicePageComponent = ({ response }) => {
  const [service, projects, serviceLists] = response;
  const { services } = serviceLists;
  const { data } = service;
  const pageSlug = useRouter().query.slug
  return (
    <>
      <Meta title={data.SEOTitle} description={data.SEODescription} directory='' keywords={data.SEOKeywords} image={data.altImage} />
      {/* hero image section */}
      <HeroSection image={data.altBackgroundImage} span="#wearedat" title={data.title} description={data.highlight} buttonLink="/" buttonText="get in touch" />
      {/* banner section */}
      <BannerSection content={data.description} />
      {/* service description section */}
      <section className="py-16 lg:py-20 relative">
        <div className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto lg:px-8 mb-16 lg:mb-20 interactive-element top">
          <div className="relative flex flex-col mb-20 lg:mb-0 lg:flex-row">
            <div className={Styles.image__card + " w-full lg:pr-16 lg:w-6/12 lg:flex lg:justify-center lg:flex-col"}>
              <h2 className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 mb-8 text-2xl lg:text-3xl xl:text-4xl leading-tight font-light xl:pr-4 w-full">{data.ServiceSections[0].title}</h2>
              <div className="lg:absolute lg:right-0 lg:w-6/12 lg:top-0 lg:h-full">
                <div className={Styles.minImageHeight + " relative lg:h-full mb-10"}>
                  <ExternalImage key={data.ServiceSections[0].imageTitle} src={data.ServiceSections[0].altImage} layout="fill" objectFit="cover" alt={data.ServiceSections[0].imageTitle} />
                </div>
              </div>
              <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6 mb-10 lg:mb-0" dangerouslySetInnerHTML={{ __html: data.ServiceSections[0].description }} />
            </div>
          </div>
        </div>
        {
          data.ServiceSections[0].highlight &&
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 mb-16 lg:mb-20 interactive-element top">
            <div className="py-12 border-t border-b border-gray-400">
              <div className={Styles.ban__data} dangerouslySetInnerHTML={{ __html: data.ServiceSections[0].highlight }} />
            </div>
          </div>
        }
        <div className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto lg:px-8 lg:mb-20 interactive-element top">
          <div className="relative flex flex-col lg:mb-0 lg:flex-row justify-end">
            <div className={Styles.image__card + " w-full lg:pl-16 lg:w-6/12 lg:flex lg:flex-col lg:justify-center"}>
              <h2 className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 mb-8 text-2xl lg:text-3xl xl:text-4xl leading-tight font-light xl:pr-4 w-full">{data.ServiceSections[1].title}</h2>
              <div className="lg:absolute lg:left-0 lg:w-6/12 lg:top-0 lg:h-full">
                <div className={Styles.minImageHeight + " relative lg:h-full mb-10"}>
                  <ExternalImage key={data.ServiceSections[1].imageTitle} src={data.ServiceSections[1].altImage} layout="fill" objectFit="cover" alt={data.ServiceSections[1].imageTitle} />
                </div>
              </div>
              <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6 mb-10 lg:mb-0" dangerouslySetInnerHTML={{ __html: data.ServiceSections[1].description }} />
            </div>
          </div>
        </div>
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-8">
            <div className="py-10 lg:col-start-1 lg:col-end-5 lg:sticky lg:top-20 lg:self-start">
              <h3 className="text-lg mb-10 interactive-element top">At DAT our services include:</h3>
              <ul className="list-inside list-disc mb-10 font-medium text-lg leading-8 interactive-element top">
                {
                  data.keyPoints.split("\r\n").map(item => <li key={item}>{item}</li>)
                }
              </ul>
              <ModalButton btnClass="bg-gray-50 interactive-element top" btnText="Get in touch" />
            </div>
            <div className="bg-gray-50 p-8 lg:p-16 lg:col-start-5 lg:col-end-13 interactive-element top">
              <div className={Styles.ban__data} dangerouslySetInnerHTML={{ __html: data.ServiceSections[1].highlight }} />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0">
          <div className="lg:px-8">
            <SectionHeader span="Powered by engineers" classList="w-full mb-12" heading="Similar Expertise" />
          </div>
          <div className="lg:px-2 interactive-element top">
            <SwiperComponent
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                "640": {
                  "slidesPerView": 2,
                  "spaceBetween": 30
                },
                "1024": {
                  "slidesPerView": 3,
                  "spaceBetween": 30
                }
              }}
              autoplay={{
                "delay": 3000,
                "disableOnInteraction": false,
                "pauseOnMouseEnter": true
              }} >
              {
                services.rows.filter(item => item.slug != pageSlug).map((item, index) => (
                  <SwiperSlide className="h-full" key={item.slug}>
                    <Card heading={item.title} hover={true} span={`0${index + 1}`} fixedHeight={true} buttonData={{ enabled: true, link: `/services/${item.slug}`, text: "Read more", icon: true }} interactive={false}>
                      <ExternalImage key={item.title + item.altImage} src={item.altImage} layout="responsive" alt={item.title} width={700} height={394} objectFit="cover" />
                    </Card>
                  </SwiperSlide>
                ))
              }
            </SwiperComponent>
          </div>
          <div className="lg:px-8 interactive-element top">
            <LinkButton text="View all services" link="/services" classList="bg-white" />
          </div>
        </div>
      </section>
      {/* client Section */}
    </>
  )
}
export default ServicePageComponent
