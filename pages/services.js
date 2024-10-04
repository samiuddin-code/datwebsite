import { useState } from 'react'
import SectionHeader from '@/ui/SectionHeader'
import Meta from '@/components/Meta'
import HeroSection from '@/herosection/HeroSection'
import { headers, text_portion } from '@/helpers/helpers'
import ExternalImage from '@/ui/ExternalImage'
import Card from '@/ui/Card'
import Layout from '@/components/Layout'
import SubmitButton from '@/ui/SubmitButton'
import fetchData from "@/apiData/resolver";

function Services({response}) {
  const [expertise] = response;
  const {bannerData, seoData} = expertise.data;
  const {services} = expertise;
  const [page,setPage] = useState(2);
  const [serviceData,setServiceData] = useState(services.rows);
  const [preloader,setPreloader] = useState(false);
  async function fetchData(pageNumber){
      const response = await fetch(`${process.env.API_DOMAIN}/ourExpertisePage?limit=15&page=${pageNumber}`,headers);
      return response.json();
  }
  function loadData(){
      setPage(page+1);
      setPreloader(true);
      fetchData(page).then(response=>{
        setServiceData(prevVal => [...prevVal,...response.services.rows])
        setPreloader(false);
      })
  }
  return (
    <>
      <Layout apiData={response}>
        <Meta title={seoData.title} keywords={seoData.keywords} description={seoData.description} image={seoData.image}/>
        {/* Hero Image section */}
        <HeroSection imageAlt={bannerData.imageAlt} image={bannerData.image} folder="uploads/generalSections" title={bannerData.highlight} description={bannerData.shortInfo} />
        {/* Service Section */}
        <section className={(preloader ? "opacity-70 pointer-events-none" : "opacity-100 pointer-events-auto") + " py-12 lg:py-16 bg-gray-50"}>
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
            <SectionHeader span="Powered By Engineers" heading="How can DAT help you?" />
            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {
                serviceData.map((item) => (
                  <Card key={item.title} heading={item.title} hover={true} fixedHeight={true} buttonData={{enabled:true,link:`/services/${item.slug}`,text:"Read more",icon:true}} description={text_portion(item.description,0,200)} interactive={true}>
                    <ExternalImage src={item.altImage} layout="responsive" className="transform scale-100 group-hover:scale-110 transition-all duration-300 custom-transition" alt={item.title} width={700} height={394} objectFit="cover" />
                  </Card>
                ))
              }
              </div>
              {
                (services.count != serviceData.length ) &&
                <div className="mt-16 lg:mt-20 flex interactive-element top">
                    <div className="w-full text-center">
                        <SubmitButton onClick={loadData} text="Load More" classList="bg-gray-900 text-white" icon={false}/>
                    </div>
                </div>
              }
          </div>
        </section>
      </Layout>
    </>
  )
}
export async function getServerSideProps() {
  /* api endpoints url */
  let datas = [`/ourExpertisePage?limit=15`]
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
export default Services
