import Meta from '@/components/Meta'
import HeroSection from '@/herosection/HeroSection'
import Layout from '@/components/Layout'
import fetchData from "@/apiData/resolver";
import ProjectSection from '@/components/projects/ProjectSection'

function Projects({response}) {
    const [projectPage] = response;
    const {projects,bannerData,seoData} = projectPage.data;
  return (
    <>
    <Layout apiData={response} blogSection={true}>
      <Meta title={seoData.title} description={seoData.description} keywords={seoData.keywords} image={seoData.image} />
      {/* Hero Image section */}
      <HeroSection imageAlt={bannerData.imageAlt} image={bannerData.image} folder="uploads/generalSections" title={bannerData.highlight} description={bannerData.shortInfo}/>
      {/* Service Section */}
      <ProjectSection projects={projects}/>
      </Layout>
    </>
  )
}
export async function getServerSideProps() {
  /* api endpoints url */
  let datas = [`/projectPage?limit=6&page=1`]
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
export default Projects
