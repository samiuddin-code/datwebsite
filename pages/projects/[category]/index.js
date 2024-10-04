import Meta from '@/components/Meta'
import HeroSection from '@/herosection/HeroSection'
import Layout from '@/components/Layout'
import fetchData from "@/apiData/resolver";
import ProjectSection from '@/components/projects/ProjectSection'

function Projects({response}) {
    const [projects] = response;
    let seoData = {};
;    if(projects.data.category){
        seoData = {
            title: projects.data.category.seoTitle,
            keywords: projects.data.category.seoKeywords,
            description: projects.data.category.seoDescription,
            image: projects.data.category.image
        }
    }
    // console.log(projectPage);
    // return <>asdsad</>
    // const projects = projectPage.data;
  return (
    <>
    <Layout apiData={response} blogSection={true}>
      <Meta title={seoData.title} description={seoData.description} keywords={seoData.keywords} directory='' image={seoData.image} />
      {/* Hero Image section */}
      <HeroSection imageAlt={projects.data.category.imageAlt} image={projects.data.category.image} folder="uploads/" title={projects.data.category.highlight} description={projects.data.category.description}/>
      {/* Service Section */}
      <ProjectSection projects={projects}/>
      </Layout>
    </>
  )
}
export async function getServerSideProps({params}) {
  /* api endpoints url */
  let datas = [`/projects/category/${params.category}?limit=6&page=1`]
  /* response after resolving promise */
  const response = await fetchData(datas);
//   console.log(response);
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
