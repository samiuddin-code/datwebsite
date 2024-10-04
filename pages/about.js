import Meta from '@/components/Meta'
import BannerSection from '@/banners/BannerSection';
import HeroSection from '@/herosection/HeroSection'
import ExternalImage from '@/ui/ExternalImage';
import Layout from '@/components/Layout';
import ModalButton from '@/modals/ModalButton';
import fetchData from "@/apiData/resolver";

export default function About({response}) {
    const [aboutPage] = response;
    const {bannerData,profileData,richText,sectionWithImage,seoData,ourMissionVisionHighlight,ourMissionVision} = aboutPage.data
  return (
    <>
    <Layout apiData={response} modalForm={true}>
      <Meta title={seoData.title} keywords={seoData.keywords} description={seoData.description} image={seoData.image} />
      {/* Hero Image section */}
      <HeroSection title={bannerData.highlight} folder="uploads/generalSections" image={bannerData.image} alt={bannerData.highlight} description={bannerData.shortInfo} />
      {/* Profile section */}
      <section className="py-16 lg:py-20">
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
          {profileData && profileData[0] &&
              <div className="flex flex-wrap interactive-element pt-4">
                  <div className="lg:w-4/12 relative lg:pt-4 lg:pl-4 mr-8 mb-6">
                        <div className="hidden lg:block h-80 w-80 absolute top-0 left-0">
                            <div className={"card__profile__wrap flex items-center justify-center h-full w-full"}>Image Border</div>
                        </div>
                        <div className="h-80 w-80 relative">
                            <ExternalImage folder="uploads/generalSections" src={profileData[0].image} layout="responsive" alt={profileData[0].imageAlt} width={300} height={300} objectFit="cover" />
                        </div>
                  </div>
                  <div className="lg:w-2/4 relative lg:pt-4 lg:pl-4 flex items-center">
                    <div className="w-full">
                        <span className="font-medium uppercase block mb-2 text-sm text-gray-700">{profileData[0].iconOrBlurp}</span>
                        <h2 className="mb-6 text-lg font-medium capitalize">{profileData[0].title}</h2>
                        <p className="text-sm mb-6">{profileData[0].highlight}</p>
                        <p className="text-sm">{profileData[0].shortInfo}</p>
                    </div>
                  </div>
              </div>
}
              {profileData && profileData[1] &&
              <div className="flex flex-wrap interactive-element pt-16">
                  <div className="lg:w-2/4 relative lg:pt-4 lg:pr-4 flex items-center ml-auto order-2 lg:order-1">
                    <div className="w-full">
                        <span className="font-medium uppercase block mb-2 text-sm text-gray-700">{profileData[1].iconOrBlurp}</span>
                        <h2 className="mb-6 text-lg font-medium capitalize">{profileData[1].title}</h2>
                        <p className="text-sm mb-6">{profileData[1].highlight}</p>
                        <p className="text-sm">{profileData[1].shortInfo}</p>
                    </div>
                  </div>
                  <div className="lg:w-4/12 relative lg:pt-4 lg:pr-4 lg:ml-8 order-1 lg:order-2 mb-6 lg:flex lg:justify-end">
                        <div className="hidden lg:block h-80 w-80 absolute top-0 right-0">
                            <div className={"card__profile__wrap flex items-center justify-center h-full w-full"}>Image Border</div>
                        </div>
                        <div className="h-80 w-80 relative ">
                            <ExternalImage src={profileData[1].image} folder="uploads/generalSections" layout="responsive" alt={profileData[1].imageAlt} width={300} height={300} objectFit="cover" />
                        </div>
                  </div>
              </div>
}

         {/* New About us sections start */}
         {profileData && profileData[2] &&
              <div className="flex flex-wrap interactive-element pt-4">
                  <div className="lg:w-4/12 relative lg:pt-4 lg:pl-4 mr-8 mb-6">
                        <div className="hidden lg:block h-80 w-80 absolute top-0 left-0">
                            <div className={"card__profile__wrap flex items-center justify-center h-full w-full"}>Image Border</div>
                        </div>
                        <div className="h-80 w-80 relative">
                            <ExternalImage folder="uploads/generalSections" src={profileData[2].image} layout="responsive" alt={profileData[2].imageAlt} width={300} height={300} objectFit="cover" />
                        </div>
                  </div>
                  <div className="lg:w-2/4 relative lg:pt-4 lg:pl-4 flex items-center">
                    <div className="w-full">
                        <span className="font-medium uppercase block mb-2 text-sm text-gray-700">{profileData[2].iconOrBlurp}</span>
                        <h2 className="mb-6 text-lg font-medium capitalize">{profileData[2].title}</h2>
                        <p className="text-sm mb-6">{profileData[2].highlight}</p>
                        <p className="text-sm">{profileData[2].shortInfo}</p>
                    </div>
                  </div>
              </div>
}
{profileData && profileData[3] &&
              <div className="flex flex-wrap interactive-element pt-16">
                  <div className="lg:w-2/4 relative lg:pt-4 lg:pr-4 flex items-center ml-auto order-2 lg:order-1">
                    <div className="w-full">
                        <span className="font-medium uppercase block mb-2 text-sm text-gray-700">{profileData[3].iconOrBlurp}</span>
                        <h2 className="mb-6 text-lg font-medium capitalize">{profileData[3].title}</h2>
                        <p className="text-sm mb-6">{profileData[3].highlight}</p>
                        <p className="text-sm">{profileData[3].shortInfo}</p>
                    </div>
                  </div>
                  <div className="lg:w-4/12 relative lg:pt-4 lg:pr-4 lg:ml-8 order-1 lg:order-2 mb-6 lg:flex lg:justify-end">
                        <div className="hidden lg:block h-80 w-80 absolute top-0 right-0">
                            <div className={"card__profile__wrap flex items-center justify-center h-full w-full"}>Image Border</div>
                        </div>
                        <div className="h-80 w-80 relative ">
                            <ExternalImage src={profileData[3].image} folder="uploads/generalSections" layout="responsive" alt={profileData[3].imageAlt} width={300} height={300} objectFit="cover" />
                        </div>
                  </div>
              </div>
}

              {/* New About us sections end */}
          </div>
      </section>
      {/* banner section */}
      <BannerSection content={richText.highlight}/>
      {/* section with image section */}
      <section className="py-16 lg:py-20">
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
                <div className="flex flex-wrap flex-row interactive-element top">
                    <div className="lg:w-4/12 xl:w-3/12 text-lg flex order-2 lg:order-1">
                        <p>{sectionWithImage[0].highlight}</p>
                    </div>
                    <div className="lg:w-8/12 xl:w-9/12 lg:pl-16 w-full mb-6 lg:mb-0 order-1 lg:order-2">
                        <div className="relative overflow-hidden">
                            <ExternalImage layout="responsive" className="transition-all transform duration-300 scale-100 hover:scale-125" folder="uploads/generalSections" width={600} height={375} src={sectionWithImage[0].image} alt={sectionWithImage[0].imageAlt}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap flex-row mt-12 lg:mt-20 interactive-element top">
                    <div className="lg:w-5/12 w-full mb-6 lg:mb-0">
                        <div className="relative overflow-hidden">
                            <ExternalImage layout="responsive" className="transition-all transform duration-300 scale-100 hover:scale-125" folder="uploads/generalSections" width={600} height={375} src={sectionWithImage[1].image} alt={sectionWithImage[1].imageAlt}/>
                        </div>
                    </div>
                    <div className="lg:w-7/12 lg:pl-16 text-lg">
                        <p>{sectionWithImage[1].highlight}</p>
                    </div>
                </div>
          </div>
      </section>
      {/* Service Section */}
      <section className="py-16 lg:py-20 bg-gray-50" id="mission">
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
            <div className="w-full interactive-element top">
                <span className="font-bold uppercase block mb-2 text-sm tracking-widest">#wearedat</span>
                <h2 className="mb-6 text-3xl font-semibold capitalize md:text-4xl ">Our Mission</h2>
            </div>
            <div className="mb-16 interactive-element top">
                <p className="max-w-sm mb-10">{ourMissionVisionHighlight}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 last:mb-0 mb-8 gap-x-8 gap-y-8">
                {
                    ourMissionVision.map(item => (
                        <div key={item.title} className="shadow-none bg-white bg-opacity-0 transition-all duration-300 ease-linear h-full interactive-element top">
                            <div className="mb-4 relative h-52 overflow-hidden">
                                <ExternalImage folder="uploads/generalSections" className="transform transition-all duration-300 in-expo hover:scale-125" src={item.image} alt={item.imageAlt} layout="responsive" width={340} height={210} objectFit="cover" />
                            </div>
                            <div className="card-height">
                                <h3 className="mb-4 text-xl font-medium">{item.title}</h3>
                                <span className="text-gray-500 mb-4 text-sm block">{item.highlight}</span>
                                <p className="text-gray-700 text-lg font-medium">{item.shortInfo}</p>
                                {
                                    item.iconOrBlurp &&
                                    <span className="text-gray-500 mt-4 block">– {item.iconOrBlurp}</span>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="pt-6 lg:pt-12 interactive-element top">
                <ModalButton btnText="Get in touch" btnClass="bg-white" btnIcon={true}/>
            </div>
        </div>
      </section>
      </Layout>
    </>
  )
}
export async function getServerSideProps() {
    /* api endpoints url */
    let datas = [`/aboutUsPage`]
    /* response after resolving promise */
    const response = await fetchData(datas);
    /* if response not resolve move to 404 page */
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {response}, // will be passed to the page component as props
    }
}
