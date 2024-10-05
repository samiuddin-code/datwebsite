import Moment from "react-moment"
import { useState } from "react"
import Layout from "@/components/Layout"
import Meta from "@/components/Meta"
import ExternalImage from "@/ui/ExternalImage"
import Card from "@/ui/Card"
import { headers } from "@/helpers/helpers"
import SubmitButton from "@/ui/SubmitButton"
import fetchData from "@/apiData/resolver";
import HeroSection from "@/herosection/HeroSection"
import SectionHeader from "@/components/ui/SectionHeader"

const ProjectCategory = ({response}) => {
    const [data] = response;
    const {categoryData, seoData } = data.data
    const [page,setPage] = useState(2);
    const [categoryList,setCategoryList] = useState(categoryData.rows);
    const [preloader,setPreloader] = useState(false);
    async function fetchData(pageNumber){
        const response = await fetch(`${process.env.API_DOMAIN}/projects-category?page=${pageNumber}`,headers);
        return response.json();
    }
    function loadData(){
        setPage(page+1);
        setPreloader(true);
        fetchData(page).then(response=>{
            setCategoryList(prevVal => [...prevVal,...response.data.rows])
            setPreloader(false);
        })
    }
    return (
        <Layout apiData={response} noImageHeader={true}>
            <Meta title={seoData.title} description={seoData.description} keywords={seoData.keywords} image={seoData.image} />
            <section className={(preloader ? "opacity-70 pointer-events-none" : "opacity-100 pointer-events-auto") + " py-16 lg:py-20 pt-8 lg:pt-40 relative lg:animate-to-top"}>
    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
        <SectionHeader heading="Our Projects" classList="-mt-4" animate={false}/>
        <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                categoryList.map((item, index) => (
                    <Card 
                        key={item.title} 
                        heading={item.title} 
                        interactive={index > 2} 
                        imageHover={true} 
                        fixedHeight={false} 
                        buttonData={{ enabled: true, link: `/projects/${item.slug}`, text: "View Projects", icon: true }} 
                        classList="mt-4"
                    >
                        {/* Set a fixed height for the image container */}
                        <div className="relative h-[260px] w-full overflow-hidden"> {/* Adjust height as needed */}
                            <ExternalImage 
                                src={item.image} 
                                layout="fill" // Use layout fill for absolute positioning
                                className="object-cover filter blur-none group-hover:blur-sm" // Ensure it covers the container
                                alt={item.title} 
                            />
                        </div>
                    </Card>
                ))
            }
        </div>
        {
            (categoryData?.count !== categoryList.length) &&
            <div className="mt-16 lg:mt-20 flex interactive-element top">
                <div className="w-full text-center">
                    <SubmitButton onClick={loadData} text="Load More" classList="bg-gray-900 text-white" icon={false}/>
                </div>
            </div>
        }
    </div>
</section>

        </Layout>
    )
}
export async function getServerSideProps() {
    /* api endpoints url */
    let datas = [`/projectCategoryPage`]
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
export default ProjectCategory
