import { SwiperSlide } from "swiper/react";
import Card from '@/ui/Card'
import SectionHeader from '@/ui/SectionHeader'
import Meta from '@/components/Meta'
import SwiperComponent from '@/swiper/SwiperComponent'
import BlogSection from '@/blogs/BlogSection';
import ExternalImage from '@/ui/ExternalImage'
import BannerSection from '@/banners/BannerSection'
import HeroImage from '@/herosection/HeroImage'
import LinkButton from '@/ui/LinkButton'
import Layout from '@/components/Layout';
import ModalButton from "@/components/ui/modals/ModalButton";
import fetchData from "@/apiData/resolver";
import ProjectSection from "@/components/projects/ProjectSection";
import LatestNewsSection from "@/components/latest-news/news-section";

function Home({ response }) {
  const [homeSliders, homePage, latestNews, projects, services, blogs] = response;
  const settingsWrap = response[response.length - 1];
  const { siteSetting } = settingsWrap.data;
  const { richText, whoWeAre, whyChooseUs, sectionAboveFooter, sectionWithImage, seoData } = homePage.data;


  return (
    <>
      <Layout modalForm={true} apiData={response}>
        <Meta title={seoData.title} description={seoData.description} keywords={seoData.keywords} image={seoData.image} />
        {/* Hero Image section */}
        <HeroImage sliderData={homeSliders} buttonText="View more info" buttonLink="#" description={true} />
        {/* Latest News section */}
        <LatestNewsSection latestNews={latestNews} />
        {/* service / our expertise section */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0">
            <div className="lg:px-8">
              <SectionHeader span="Powered by engineers" classList="mb-4 w-full lg:mb-6 md:mb-6" heading="Our expertise" />
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
                }}  >
                {services.data.rows.map((item, index) => (
                  <SwiperSlide className="h-full" key={`services-${index}`}>
                    <Card heading={item.title} hover={true} span={`0${index + 1}`} fixedHeight={true} buttonData={{ enabled: true, link: `/services/${item.slug}`, text: "Read more", icon: true }} interactive={false}>
                      <ExternalImage src={item.altImage} layout="responsive" className="transform scale-100 group-hover:scale-110 transition-all duration-300 custom-transition" alt={item.title} width={700} height={394} objectFit="cover" />
                    </Card>
                  </SwiperSlide>
                ))}
              </SwiperComponent>
            </div>
            <div className="lg:px-8 interactive-element top mt-4">
              <LinkButton text="View all services" link="/services" classList="bg-white" />
            </div>
          </div>
        </section>
        {/* projects section */}
        <ProjectSection projects={projects} />
        {/* banner section */}
        <BannerSection content={richText.highlight} />
        {/* who we are & why choose us section */}
        <section className="pt-16 lg:pt-20 relative interactive-element top">
        <div className="lg:max-w-6xl mx-auto lg:px-8 mb-20">
  <div className="flex flex-col lg:flex-row lg:space-x-8">
    
    {/* Left Section: Text */}
    <div className="lg:w-1/2">
      <h2 className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 mb-16 text-xl lg:text-2xl xl:text-3xl leading-tight">
        {sectionWithImage[0].highlight}
      </h2>

      <p className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-lg leading-8 mb-10 2xl:mb-16">
        {sectionWithImage[0].shortInfo}
      </p>
    </div>

    {/* Right Section: First Image */}
    <div className="lg:w-1/2">
      <div className="relative h-80 mb-10">
        <ExternalImage
          src={sectionWithImage[0].image}
          className="hover:scale-125 transform transition-all duration-300 custom-transition"
          layout="fill"
          objectFit="cover"
          folder="uploads/generalSections"
          alt={sectionWithImage[0].imageAlt}
        />
      </div>
    </div>
  </div>

  {/* Second Text Section */}
  <div className="flex flex-col lg:flex-row lg:space-x-8 mt-10">
    <div className="lg:w-1/2">
      <p className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-0 text-lg leading-8">
        {sectionWithImage[1].highlight}
      </p>
    </div>

    {/* Right Section: Second Image */}
    <div className="lg:w-1/2">
      <div className="relative h-80 mb-10">
        <ExternalImage
          src={sectionWithImage[1].image}
          className="hover:scale-125 transform transition-all duration-300 custom-transition"
          layout="fill"
          objectFit="cover"
          folder="uploads/generalSections"
          alt={sectionWithImage[1].imageAlt}
        />
      </div>
    </div>
  </div>
</div>

          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 interactive-element top">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
              <div className="bg-gray-50 py-12 px-8 lg:pt-10 lg:pr-12 lg:pl-12 lg:pb-12">
                <h2 className="text-3xl  capitalize md:text-4xl ">{whoWeAre.title}</h2>
                <div className="h-0.5 w-16 bg-gray-200 mt-2 mb-8" />
                <div className="text-sm">
                  <p className="mb-6">{whoWeAre.highlight}</p>
                  {whoWeAre.shortInfo}
                </div>
              </div>
              <div className="bg-gray-50 py-12 px-8 lg:pt-10 lg:pr-12 lg:pl-12 lg:pb-12">
                <h2 className="text-3xl  capitalize md:text-4xl ">{whyChooseUs.title}</h2>
                <div className="h-0.5 w-16 bg-gray-200 mt-2 mb-8" />
                <div className="text-sm">
                  <p className="mb-6">{whyChooseUs.highlight}</p>
                  {whyChooseUs.shortInfo}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* blogs section */}
        <BlogSection data={blogs.data.rows} />
        {/* section above footer with image */}
        <section className="py-16 lg:py-20 relative bg-gray-50 interactive-element top">
          <div className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl lg:px-8 lg:mx-auto flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-7/12 lg:pr-8 md:text-white">
              <div className="max-w-lg sm:max-w-xl md:max-w-2xl px-8 mx-auto lg:max-w-auto lg:px-0">
                <h1 className="relative font-bold uppercase block mb-6 text-sm lg:tracking-widest z-10">{sectionAboveFooter.highlight}</h1>
                <h2 className="relative mb-10 text-3xl lg:text-5xl lg: z-10 leading-none">{sectionAboveFooter.title} </h2>
              </div>
              <div className="relative mb-10 md:mb-0 md:absolute md:top-0 md:left-0 h-72 md:h-full w-full z-0">
                <ExternalImage alt={sectionAboveFooter.imageAlt} folder="uploads/generalSections" src={sectionAboveFooter.image} layout="fill" objectFit="cover" />
              </div>
              <div className="relative max-w-lg sm:max-w-xl md:max-w-2xl px-8 mx-auto lg:max-w-auto lg:px-0 text-sm lg:pr-36 leading-5 z-10" dangerouslySetInnerHTML={{ __html: sectionAboveFooter.shortInfo }} />
            </div>
            <div className="max-w-lg sm:max-w-xl md:max-w-2xl pl-8 pr-8 lg:pr-0 ml-auto mr-auto lg:mr-0 w-full lg:w-4/12 lg:text-right mt-10 relative z-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:w-64 ml-auto">
                <div>
                  <LinkButton text="Send Enquiry" icon="true" link="/contact#contactForm" classList="bg-white w-full" />
                </div>
                <div>
                  <ModalButton btnClass="bg-white w-full" btnText="Book a meeting" />
                </div>
                <div>
                  <LinkButton text="Send whatsapp" target="_blank" rel="noopener noreferrer" link={`https://api.whatsapp.com/send?phone=${siteSetting.whatsAppNumber}&text=Hi%20DAT!`} icon="true" classList="bg-white w-full" />
                </div>
                <div>
                  <LinkButton text="Call us" target="_blank" rel="noopener noreferrer" icon="true" link={`tel:${siteSetting.phoneNumber}`} classList="bg-white w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* clients section */}
      </Layout>
    </>
  )
}
export async function getServerSideProps() {
  /* api endpoints url */
  let datas = [
    `/homeSliders`, `/homePage`, `blogs?category=2&latestOnly=yes`, `/projects?limit=6&page=1`,
    `/services?limit=15&page=1`, `/blogs?category=3`
  ]
  /* response after resolving promise */
  const response = await fetchData(datas);
  /* if response not resolve move to 404 page */
  if (!response) {
    return {
      notFound: true,
    }
  }
  return {
    props: { response }, // will be passed to the page component as props
  }
}
export default Home
