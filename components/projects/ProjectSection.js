import { useState } from 'react';
import { text_portion } from '@/helpers/helpers';
import ExternalImage from '@/ui/ExternalImage';
import Card from '@/ui/Card';
import SubmitButton from '@/ui/SubmitButton';
import axios from 'axios';
import SectionHeader from '@/ui/SectionHeader';
import LinkButton from '../ui/LinkButton';
import { useRouter } from 'next/router';

function ProjectSection({ projects }) {
  const [page, setPage] = useState(2);
  const [projectData, setProjectData] = useState(projects.data.rows);
  const [preloader, setPreloader] = useState(false);
  const path = useRouter();

  async function fetchData(pageNumber) {
    const url = projects.data.category
      ? `${process.env.API_DOMAIN}/projects/category/${projects.data.category.slug}?limit=6&page=${pageNumber}`
      : `${process.env.API_DOMAIN}/projects?limit=6&page=${pageNumber}`;
      
    const response = await axios.get(url).then((res) => res.data);
    return response;
  }

  function loadData() {
    setPage(page + 1);
    setPreloader(true);
    fetchData(page).then((response) => {
      setProjectData((prevVal) => [...prevVal, ...response.data.rows]);
      setPreloader(false);
    });
  }

  return (
    <section className={`py-16 lg:py-20 ${preloader ? 'opacity-70 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader span="Latest Design" heading={`${projects.data.category ? projects.data.category.title : 'Featured'} Projects`} />
        <div className="grid lg:grid-cols-1 lg:flex-col gap-8">
  {projectData.map((item, index) => (
    <div key={item.title} className="relative flex flex-col lg:flex-row gap-8">
      
      {/* Image Background with Overlay */}
      <div className="relative w-full lg:w-[1800px] h-2/3 lg:h-[600px] rounded-lg shadow-lg overflow-hidden">
        <ExternalImage 
          src={item.altImage} 
          layout="fill" 
          alt={item.title} 
          objectFit="cover" 
          className="absolute inset-0"
        />
        
        {/* Transparent Overlay for Card */}
        <div className="absolute inset-0 flex items-start mr-30 pb-30 justify-start bg-black bg-opacity-0 rounded-lg">
          {/* Card Component */}
          <div className="w-full lg:w-3/12 ml-16 mt-24 h-[430px] flex flex-col justify-start p-6 bg-white rounded-3xl shadow-2xl opacity-15 backdrop-blur-sm  ">
            <Card 
              heading={item.title} 
              description={text_portion(item.highlight, 0, 200)} 
              interactive={true} 
              buttonData={{
                enabled: true, 
                link: `/projects/${item.ProjectCategory.slug}/${item.slug}`, 
                text: "See more", 
                icon: true
              }}
            />
          </div>
        </div>
      </div>
      
    </div>
  ))}
</div>



        <div className="mt-16 lg:mt-20 flex flex-col lg:flex-row justify-end items-center">
          {projects.data.count !== projectData.length && (
            <div className={`w-full ${path.asPath === '/' ? 'lg:w-1/2' : 'text-center'}`}>
              <SubmitButton onClick={loadData} classList="bg-gray-50" text="Load More" link={""} icon={false}/>
            </div>
          )}
          {path.asPath === '/' && (
            <div className={`w-full ${projects.data.count !== projectData.length ? 'lg:w-1/2 lg:text-right' : 'lg:text-right'}`}>
              <LinkButton text="View all projects" link="/projects" icon="true"/>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
