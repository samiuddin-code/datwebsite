import { useState } from 'react'
import { useRouter } from 'next/router'
import { text_portion, plainString } from '@/helpers/helpers'
import ExternalImage from '@/ui/ExternalImage'
import Card from '@/ui/Card'
import SubmitButton from '@/ui/SubmitButton'
import axios from 'axios'
import SectionHeader from '@/ui/SectionHeader'
import LinkButton from '../ui/LinkButton'
import SwiperComponent from '@/swiper/SwiperComponent'
import { SwiperSlide } from "swiper/react";
import {convertDate} from "../helpers/helpers";

const LatestNewsSection = ({ latestNews }) => {
  const [page, setPage] = useState(2);
  const [newsData, setNewsData] = useState(latestNews.data.rows);
  const [preloader, setPreloader] = useState(false);
  const path = useRouter();

  //console.log("latestNews", latestNews)

  const fetchData = async (pageNumber) => {
    if (latestNews.data.category) {
      const url = `${process.env.API_DOMAIN}/blogs/category/${latestNews.data.category.slug}?limit=6&page=${pageNumber}`
      const response = await axios.get(url).then(res => res.data);
      return response;
    } else {
      const url = `${process.env.API_DOMAIN}/blogs?limit=6&page=${pageNumber}`
      const response = await axios.get(url).then(res => res.data);
      return response;
    }
  }

  const loadData = () => {
    setPage(page + 1);
    setPreloader(true);
    fetchData(page).then(response => {
      setNewsData(prevVal => [...prevVal, ...response.data.rows])
      setPreloader(false);
    })
  }

  if(newsData.length === 0){
    return <></>
  }

  return (
    <section className={(preloader ? "opacity-70 pointer-events-none" : "opacity-100 pointer-events-auto") + " py-16 lg:py-20"}>
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8">
        <SectionHeader
          span="Constructive Reads"
          heading={"Latest News"}
        />

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
          }}
        >
          {newsData.map((item, index) => (
            <SwiperSlide className="h-full" key={`blog-${index}`}>
              <Card
                key={item.title}
                heading={item.title}
                imageHover={true}
                fixedHeight={true}
                span={convertDate(item.createdAt)}
                description={plainString(item.shortDescription)}
                buttonData={{
                  enabled: true,
                  link: `/blog/${item.slug}`,
                  text: "See more",
                  icon: true
                }}
                interactive={false}
              >
                <ExternalImage
                  src={item.altImage}
                  layout="responsive"
                  alt={item.title}
                  width={700}
                  height={394}
                  objectFit="cover"
                  className="filter blur-none group-hover:blur-sm"
                />
              </Card>
            </SwiperSlide>
          ))}
        </SwiperComponent>
      </div>
    </section>
  )
}
export default LatestNewsSection
