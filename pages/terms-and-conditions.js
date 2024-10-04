import Layout from '@/components/Layout';
import blogStyles from '@/css/blogs.module.scss';
import Meta from '@/components/Meta';
import fetchData from "@/apiData/resolver";
import SectionHeader from '@/ui/SectionHeader';

const TermsConditions = ({response}) => {
    const [pageData] = response;
    const {data} = pageData;
    const {seoData,bannerData,pageContent} = data;
    return (
      <>
      <Layout apiData={response} noImageHeader={true}>
        <Meta title={seoData.title} description={seoData.description} keywords={seoData.keywords} image={seoData.image}/>
        <article className="py-16 lg:py-20 pt-8 lg:pt-40 relative lg:animate-to-top">
            <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-8">
                <SectionHeader heading={bannerData.title} animate={false}/>
                <div className={blogStyles.blog__styles} dangerouslySetInnerHTML={{__html:pageContent.description}}/>
            </div>
        </article>
      </Layout>
      </>
    )
}
export async function getServerSideProps() {
    /* api endpoints url */
    let datas = [`/generalContent?pageTitle=terms-and-conditions`]
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
export default TermsConditions
