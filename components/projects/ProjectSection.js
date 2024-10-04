import { useState } from 'react'
import { text_portion } from '@/helpers/helpers'
import ExternalImage from '@/ui/ExternalImage'
import Card from '@/ui/Card'
import SubmitButton from '@/ui/SubmitButton'
import axios from 'axios'
import SectionHeader from '@/ui/SectionHeader'
import LinkButton from '../ui/LinkButton'
import { useRouter } from 'next/router'

function ProjectSection({projects}) {
    const [page,setPage] = useState(2);
    // console.log(projects);
    // return <>sdfsdf</>
    const [projectData,setProjectData] = useState(projects.data.rows);
    const [preloader,setPreloader] = useState(false);
    const path = useRouter();
    async function fetchData(pageNumber){
        if(projects.data.category){
          const response = await axios.get(`${process.env.API_DOMAIN}/projects/category/${projects.data.category.slug}?limit=6&page=${pageNumber}`).then(res => res.data);
          return response;
        }else{
          const response = await axios.get(`${process.env.API_DOMAIN}/projects?limit=6&page=${pageNumber}`).then(res => res.data);
          return response;
        }

    }
    function loadData(){
        setPage(page+1);
        setPreloader(true);
        fetchData(page).then(response=>{
            setProjectData(prevVal => [...prevVal,...response.data.rows])
            setPreloader(false);
        })
    }
  return (
    <>
      <section className={(preloader ? "opacity-70 pointer-events-none" : "opacity-100 pointer-events-auto") + " py-16 lg:py-20"}>
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
          <SectionHeader span="Latest Design" heading={((projects.data.category) ?  projects.data.category.title : "Featured")+ " Projects"} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {
        projectData.map((item) => (
            <Card 
                key={item.title} 
                heading={item.title} 
                imageHover={true} 
                fixedHeight={true} 
                buttonData={{enabled:true,link:`/projects/${item.ProjectCategory.slug}/${item.slug}`,text:"See more",icon:true}} 
                description={text_portion(item.highlight, 0, 200)} 
                interactive={true}
            >
                <div className="relative w-full h-0" style={{ paddingBottom: '75%' }}> {/* Set the aspect ratio here */}
                    <ExternalImage 
                        src={item.altImage} 
                        layout="fill"  // Use 'fill' for absolute positioning
                        alt={item.title} 
                        objectFit="cover"  // Maintain aspect ratio
                        className="filter blur-none group-hover:blur-sm absolute top-0 left-0"  // Make sure the image is positioned absolutely
                    />
                </div>
            </Card>
        ))
    }
</div>

                <div className="mt-16 lg:mt-20 flex interactive-element top justify-end">
                {
                    (projects.data.count != projectData.length) &&
                        <div className={(path.asPath =="/" ? "hidden lg:block w-1/2" : "w-full text-center")}>
                            <SubmitButton onClick={loadData} classList="bg-gray-50" text="Load More" link={""} icon={false}/>
                        </div>
                }
                {
                  path.asPath == "/" &&
                  <div className={(projects.data.count != projectData.length ? "lg:w-full" : "lg:w-1/2") + " w-full lg:text-right"}>
                    <LinkButton text="View all projects" link="/projects" icon="true"/>
                  </div>
                }
              </div>
        </div>
      </section>
    </>
  )
}
export default ProjectSection
