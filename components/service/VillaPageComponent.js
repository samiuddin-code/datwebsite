import { useRouter } from 'next/router'
import { SwiperSlide } from "swiper/react";
import Meta from '@/components/Meta'
import ExternalImage from '@/ui/ExternalImage'
import VillaHeroImage from '@/herosection/VillaHeroImage'
import SwiperComponent from '@/swiper/SwiperComponent'
import Card from '@/ui/Card'
import LinkButton from '@/ui/LinkButton'
import ModalButton from '@/modals/ModalButton'
import SectionHeader from '@/ui/SectionHeader'
import Styles from '@/css/Service.module.scss'

const VillaPageComponent = ({response}) => {
    const [service,projects,serviceLists] = response;
    const {data} = service;
    const {sliders} = service;
    const {whyChooseUs} = service;
    const {services} = serviceLists;
    const pageSlug = useRouter().query.slug
    return (
      <>
          <Meta title={data.SEOTitle} description={data.SEODescription} directory='' keywords={data.SEOKeywords} image={data.altImage}/>
          {/* hero image section */}
          <VillaHeroImage sliderData={sliders}/>
          {/* banner section */}
          <section className="py-16 lg:py-20 relative">
            {
              data.ServiceSections.slice(0,1).map((item,iIndex) => (
                <div key={item.title} >
                  <div className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto lg:px-8 mb-16 lg:mb-20 last:mb-0 interactive-element top">
                    <div className="relative flex flex-col mb-16 lg:mb-0 lg:flex-row lg:justify-start">
                        <div className={Styles.image__card + " lg:pr-16 w-full lg:w-5/12 lg:flex lg:justify-center lg:flex-col"}>
                          <h1 className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 mb-8 text-2xl lg:text-3xl xl:text-4xl leading-tight xl:pr-4 w-full">{item.title}</h1>
                          <div className="lg:right-0 lg:absolute lg:w-7/12 lg:top-0 lg:h-full">
                            <div className={Styles.minImageHeight + " relative lg:h-full mb-10"}>
                              <ExternalImage src={item.altImage} key={item.altImage} layout="fill" objectFit="cover" alt={item.imageTitle}/>
                            </div>
                          </div>
                          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6 mb-10" dangerouslySetInnerHTML={{__html:item.description}}/>
                          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6 w-full">
                            <ModalButton btnClass="bg-gray-50" btnText="Get in touch"/>
                          </div>
                        </div>
                    </div>
                  </div>
                  {  
                    item.ServiceSubSections.map((sItem,index) => (
                        <div key={sItem.title + index} className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto lg:px-8 mb-16 last:mb-0 interactive-element top">
                          <div className={((index % 2 != 0) ? "lg:justify-start" : "lg:justify-end") + " relative flex flex-col mb-16 lg:mb-0 lg:flex-row"}>
                              <div className={((index % 2 != 0) ? "lg:pr-16" : "lg:pl-16") + ` ${Styles.image__card} lg:flex lg:flex-col lg:justify-center w-full lg:w-5/12`}>
                                <div className={((index % 2 != 0) ? "lg:right-0" : "lg:left-0") + " lg:absolute lg:w-7/12 lg:top-0 lg:h-full"}>
                                  <div className={Styles.minImageHeight + " relative lg:h-full mb-10"}>
                                    <ExternalImage src={sItem.altImage} key={sItem.altImage} layout="fill" objectFit="cover" alt={sItem.imageTitle}/>
                                  </div>
                                </div>
                                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6" dangerouslySetInnerHTML={{__html:sItem.description}}/>
                              </div>
                          </div>
                        </div>
                      ))
                  }
                </div>
              ))
            }
            <div className="py-12 lg:py-20 bg-gray-50 mt-20">
              <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
                <SectionHeader heading="Make it with passion" span="#Latest Project"/>
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
                        "pauseOnMouseEnter":true
                    }}
                     removeOptions={true} >
                      {
                        projects.data.rows.map((item,index) => (
                          <SwiperSlide className="h-full" key={"p" + item.slug}>
                            <Card key={item.title} heading={item.title} imageHover={true} fixedHeight={false} buttonData={{enabled:true,link:`/projects/${item.slug}`,text:"See more",icon:true}}>
                              <ExternalImage src={item.altImage} key={item.altImage} layout="responsive" alt={item.title}  width={352} height={260} objectFit="cover" />
                            </Card>
                          </SwiperSlide>
                        ))
                      }
                  </SwiperComponent>
                </div>
              </div>
            </div>
            <div className="pt-12 lg:pt-20">
              <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
                <div className="h-1 border-b border-gray-400 w-full mb-12"/>
                  <h2 className="mb-4 text-2xl capitalize md:text-4xl interactive-element top">{whyChooseUs.title}</h2>
                  <div className="text-lg interactive-element top" dangerouslySetInnerHTML={{__html:whyChooseUs.shortInfo}}/>
                  <div className="h-1 border-b border-gray-400 w-full mt-12"/>
              </div>

            </div>
            <div className="pt-12 lg:pt-20">
              {
                data.ServiceSections.slice(1,data.ServiceSections.length).map((item,iIndex) => (
                  <div key={item.title}>
                    <div className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto lg:px-8 mb-16 lg:mb-20 last:mb-0 interactive-element top">
                      <div className="relative flex flex-col mb-16 lg:mb-0 lg:flex-row lg:justify-start">
                          <div className={Styles.image__card + " lg:flex lg:flex-col lg:justify-center lg:pr-16 w-full lg:w-5/12"}>
                            <h2 className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 mb-8 text-2xl lg:text-3xl xl:text-4xl leading-tight xl:pr-4 w-full">{item.title}</h2>
                            <div className="lg:right-0 lg:absolute lg:w-7/12 lg:top-0 lg:h-full">
                              <div className={Styles.minImageHeight + " relative lg:h-full mb-10"}>
                                <ExternalImage src={item.altImage} key={item.altImage} layout="fill" objectFit="cover" alt={item.imageTitle}/>
                              </div>
                            </div>
                            <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6 mb-10" dangerouslySetInnerHTML={{__html:item.description}}/>
                              <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6 w-full">
                                <ModalButton btnClass="bg-gray-50" btnText="Get in touch"/>
                              </div>
                          </div>
                      </div>
                    </div>
                    {  
                      item.ServiceSubSections.map((sItem,index) => (
                          <div key={sItem.title + index} className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto lg:px-8 mb-16 lg:mb-20 last:mb-0 interactive-element top">
                            <div className={((index % 2 != 0) ? "lg:justify-start" : "lg:justify-end") + " relative flex flex-col mb-16 lg:mb-0 lg:flex-row"}>
                                <div className={((index % 2 != 0) ? "lg:pr-16" : "lg:pl-16") + ` ${Styles.image__card} lg:flex lg:flex-col lg:justify-center w-full lg:w-5/12`}>
                                  <div className={((index % 2 != 0) ? "lg:right-0" : "lg:left-0") + " lg:absolute lg:w-7/12 lg:top-0 lg:h-full"}>
                                    <div className={Styles.minImageHeight + " relative lg:h-full mb-10"}>
                                      <ExternalImage src={sItem.altImage} key={sItem.altImage} layout="fill" objectFit="cover" alt={sItem.imageTitle}/>
                                    </div>
                                  </div>
                                  <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-base leading-6" dangerouslySetInnerHTML={{__html:sItem.description}}/>
                                </div>
                            </div>
                            {
                              ((index == item.ServiceSubSections.length - 1) && (iIndex < data.ServiceSections.length-2)) &&
                              <div className="h-1 border-b border-gray-400 w-full my-12 lg:my-20"/>
                            }
                          </div>
                        ))
                    }
                  </div>
                ))
              }
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
                    "pauseOnMouseEnter":true
                }}>
                  {
                    services.rows.filter(item => item.slug != pageSlug).map((item,index) => (
                      <SwiperSlide className="h-full" key={item.slug}>
                        <Card heading={item.title} hover={true} span={`0${index+1}`} fixedHeight={true} buttonData={{enabled:true,link:`/services/${item.slug}`,text:"Read more",icon:true}} interactive={false}>
                          <ExternalImage src={item.altImage} key={item.altImage + item.title} layout="responsive" alt={item.title} width={700} height={394} objectFit="cover" />
                        </Card>
                      </SwiperSlide>
                    ))
                  }
              </SwiperComponent>
            </div>
            <div className="lg:px-8 interactive-element top">
              <LinkButton text="View all services" link="/services" classList="bg-white"/>
            </div>
          </div>
        </section>
        </>
    )
}
export default VillaPageComponent
