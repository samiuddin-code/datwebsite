import Layout from "@/components/Layout"
import Meta from "@/components/Meta"
import ExternalImage from "@/ui/ExternalImage"
import SectionHeader from "@/ui/SectionHeader"
import CarrerForm from "@/carrer/CarrerForm"
import fetchData from "@/apiData/resolver";
import { useState } from "react"

const joinUs = ({response}) => {
    const [pageData,vacancyList] = response;
    const {data} = pageData;
    const {seoData,bannerData,pageContent} = data;
    const vacancy = vacancyList.data;
    const [form,setForm] = useState(false);
    const [position,setPosition] = useState(null);
    const applyToPositions = (event) => {
        const elm = document.querySelector("#section-scroll");
        document.querySelectorAll(".card-vacancy").forEach(item => item.classList.remove("bg-green-900","text-white","bg-opacity-40"))
        let data = event.target.getAttribute("data-key");
        let target = event.target;
        setForm(true);
        setPosition(data);
        target.classList.contains("bg-green-900") ? target.classList.remove("bg-green-900","text-white","bg-opacity-40") : target.classList.add("bg-green-900","text-white","bg-opacity-100");
        window.scrollTo({top:(elm.offsetHeight + elm.offsetTop),left:0,behavior:"smooth"})
        console.log(document.querySelector("#section-scroll"))
    }
    return (
        <Layout apiData={response} noImageHeader={true}>
        <Meta title={seoData.title} description={seoData.description} keywords={seoData.keywords} image={seoData.image}>
            <meta charSet="utf-8" />
        </Meta>
        <section className="py-16 lg:py-20 pt-8 lg:pt-40 relative">
            <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
                <SectionHeader classList="mb-4 lg:animate-to-top relative" heading="Join Us Now" animate={false} />
                <div className="text-base lg:animate-to-top relative" dangerouslySetInnerHTML={{__html:pageContent.highlight}}/>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8 mt-16" id="section-scroll">
                    {
                        vacancy.map((item,index) => (
                            <div data-key={item.title} onClick={applyToPositions} key={item.title} className={(index > 1 ? "interactive-element top" : "") + " bg-gray-50 bg-opacity-40 border border-gray-100 rounded p-6 flex items-center justify-center flex-col cursor-pointer card-vacancy transition-all duration-300 custom-transition"}>
                                <h2 className="text-xl font-bold w-full pointer-events-none">{item.title}</h2>
                                <div className="my-3 text-sm pointer-events-none" dangerouslySetInnerHTML={{__html:item.description}} />
                                <span className="font-bold underline w-full cursor-pointer pointer-events-none">Apply now</span>
                            </div>
                        ))
                    }
                    <div data-key={"other"} onClick={applyToPositions} className={(vacancy.lenght > 2 ? "interactive-element top" : "") + " bg-gray-50 bg-opacity-40 border border-gray-100 rounded p-6 flex items-center justify-center flex-col cursor-pointer card-vacancy transition-all duration-300 custom-transition"}>
                        <h2 className="text-xl font-bold w-full pointer-events-none">Other Positions</h2>
                        <div className="my-3 text-sm pointer-events-none">
                            If you are expert and curious of any other fields that you dont find listed here. Feel free to apply to other fields too.
                        </div>
                        <span className="font-bold underline w-full pointer-events-none" >Apply for other positions</span>
                    </div>
                </div>
                {   
                    form &&
                    <>
                        <CarrerForm position={position} />
                    </>
                }
            </div>
        </section>
        </Layout>
    )
}
export async function getServerSideProps() {
    /* api endpoints url */
    let datas = [`/generalContent?pageTitle=join-us`,`/vacancy-list`]
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
export default joinUs
