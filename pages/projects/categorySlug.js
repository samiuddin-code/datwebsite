import { useState } from 'react';
import { SwiperSlide } from "swiper/react";
import Layout from '@/components/Layout';
import SwiperComponent from '@/swiper/SwiperComponent';
import ExternalImage from '@/ui/ExternalImage';
import Meta from '@/components/Meta';
import ModalButton from '@/modals/ModalButton';
import fetchData from "@/apiData/resolver";

const project = ({response}) => {
    const [projectData] = response;
    const {data} = projectData;
    const [projectImages,setProjectImages] = useState(data.ProjectImages)
    function getCatImages(e){
        const dataType = e.target.getAttribute("data-type");
        const tab = document.querySelectorAll(".project-tab");
        tab.forEach(item => item.classList.remove("border-b-2","border-green-900","text-green-900"));
        e.target.classList.add("border-b-2","border-green-900","text-green-900")
        if(dataType == "All"){
            setProjectImages(data.ProjectImages);
        }else{
            setProjectImages(data.ProjectImages.filter(item => item.ImageCategory.title == dataType));
        }
    }
    return (
      <>
      <Layout modalForm={true} noImageHeader={true} apiData={response}>
            <Meta title={data.SEOTitle} description={data.SEODescription} keywords={data.SEOKeywords} directory='' image={data.altImage}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
            </Meta>
            <section className="lg:pt-32 pt-8 pb-20 relative">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
                    <SwiperComponent slidesPerView={1}
                        autoplay={{
                            "delay": 3000,
                            "disableOnInteraction": false,
                            "pauseOnMouseEnter":true
                        }} 
                        spaceBetween={0}>
                        {
                        projectImages.map((item,index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col w-full">
                                        <ExternalImage src={item.altImage} alt={item.imageAlt} layout="responsive" width={1070} height={630} objectFit="cover" priority={index == 0 ? true : false} /> 
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </SwiperComponent>
                    <ul className="flex flex-row justify-center interactive-element top flex-wrap">
                        <li className="mx-4 mt-4 border-b-2 border-green-900 text-green-900 project-tab transition-all duration-300 custom-transition cursor-pointer" data-type="All" onClick={getCatImages}>
                            <span className="font-bold uppercase block mb-1 pointer-events-none">All</span>
                        </li>
                        {
                            /* get unique set of image categories  */
                            [...new Set(data.ProjectImages.map(item => item.ImageCategory.title))].map(item => (
                                <li key={item} onClick={getCatImages} data-type={item} className="mx-4 mt-4 project-tab transition-all duration-300 custom-transition cursor-pointer">
                                    <span className="font-bold uppercase pointer-events-none">{item}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="pt-16 lg:pt-20 interactive-element top">
                        <h1 className="text-2xl md:text-3xl mb-10 font-semibold">{data.title}</h1>
                        <div className="flex flex-col lg:flex-row flex-wrap">
                            <div className="w-full lg:w-1/2 lg:order-2 lg:pl-16">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-y-8 gap-x-8">
                                    {
                                        data.ProjectMeta.map(item => (
                                            item.isMainFeature == 1 &&
                                            <div key={item.value} className="border border-gray-200 rounded text-center p-8 flex items-center justify-center flex-col ">
                                                <span className="text-sm">{item.title}</span>
                                                <div className="my-3 text-xl" dangerouslySetInnerHTML={{__html:item.icon}} />
                                                <h2 className="font-semibold text-lg uppercase">{item.value}</h2>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 lg:order-1 mt-8 lg:mt-0 lg:pr-8">
                                <p className="interactive-element top">{data.highlight}</p>
                                <ul className="mt-8 interactive-element top">
                                    {    
                                        data.ProjectMeta.map(item => (
                                            item.isMainFeature == 0 &&
                                            <li key={item.title} className="flex flex-row mb-4 last:mb-0">
                                                <span className="md:w-1/2 lg:w-5/12 xl:w-4/12 ">{item.title}</span>
                                                <span className="ml-4 md:ml-0 font-bold md:w-1/2 lg:w-7/12 xl:w-8/12 uppercase xl:pl-8">{item.value}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="bg-green-100 px-6 py-2 font-medium my-10 rounded interactive-element top hidden">The design and layout will be tailored again as per your requirement and plot size.</div>
                                <div className="interactive-element top">
                                    <ModalButton btnClass="bg-gray-50" btnText="Get in touch"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </Layout>
      </>
    )
}
export async function getServerSideProps({ params }) {
    /* api endpoints url */
    let datas = [`/projects/${params.slug}`]
    /* response after resolving promise */
    const response = await fetchData(datas);
    /* if response not resolve move to 404 page */
    if (response[0].data == null) {
      return {
        notFound: true,
      }
    }
    return {
      props: {response}, // will be passed to the page component as props
    }
}
export default project
