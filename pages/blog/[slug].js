import Moment from 'react-moment';
import Layout from '@/components/Layout';
import ExternalImage from '@/ui/ExternalImage';
import BlogSection from '@/blogs/BlogSection';
import Styles from '@/css/blogs.module.scss';
import Meta from '@/components/Meta';
import fetchData from "@/apiData/resolver";

const blog = ({response}) => {
    const [blogData, blogs] = response;
    const {data} = blogData;
    return (
      <>
      <Layout noImageHeader={true} apiData={response} blogSection={false}>
        <Meta title={data.SEOTitle} description={data.SEODescription} keywords={data.SEOKeywords} directory='' image={data.altImage}/>
            <article className="py-10 relative">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-8 animate-to-top relative">
                    <div className=" pb-20 lg:pt-20">
                        <span className="text-gray-800 mb-4 block">
                            <Moment format="DD/MM/YYYY">{data.createdAt}</Moment>    
                        </span>
                        <h1 className="text-2xl lg:text-4xl font-bold">{data.title}</h1>
                    </div>
                </div>
                <div className="relative animate-to-top">
                    <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-8 text-xl">
                        <div className="relative z-10 py-16 lg:py-20" dangerouslySetInnerHTML={{__html:data.shortDescription}} />
                        <div className="bg-gray-50 h-full w-full absolute top-0 left-0" />
                    </div>
                </div>
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-8 text-lg">
                    <div className="pt-16 lg:pt-20 pb-8 lg:pb-10 interactive-element top">
                        <ExternalImage src={data.altImage} key={data.title} alt={data.imageAlt} width="1070" height="630" layout="responsive" objectFit="cover" />
                    </div>
                    <div className={Styles.blog__styles + " interactive-element top"} dangerouslySetInnerHTML={{__html:data.content}}/>
                </div>
                {
                   ( data.PageImages && data.PageImages.length > 0 ) ?
                    data.PageImages.map(item => (
                        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-8 text-lg">
                            <div className="pt-16 lg:pt-20 pb-8 lg:pb-10 interactive-element top">
                                <ExternalImage src={item.altImage} key={item.title} alt={item.imageAlt} width="1070" height="630" layout="responsive" objectFit="cover" />
                            </div>
                            <div className={Styles.blog__styles + " interactive-element top"} dangerouslySetInnerHTML={{__html:item.highlight}}/>
                            <div className={Styles.blog__styles + " interactive-element top"} dangerouslySetInnerHTML={{__html:item.imageDescription}}/>
                        </div>
                    ))
                   :
                   ''
                }
                    
                
            </article>
            {/* blogs section */}
            <BlogSection data={blogs.data.rows} />
      </Layout>
      </>
    )
}
export async function getServerSideProps({ params, query }) {
    /* api endpoints url */
    let datas = [`/blogs/${params.slug}?preview=${query.preview === "yes" ? "yes" : "no"}`, `/blogs?ignoreSlug=${params.slug}`]
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
export default blog
