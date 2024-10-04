import Layout from '@/components/Layout';
import ServicePageComponent from '@/service/ServicePageComponent';
import VillaPageComponent from '@/service/VillaPageComponent';
import fetchData from "@/apiData/resolver";

const service = ({response}) => {
    const [service] = response;
    return (
      <>
      <Layout modalForm={true} apiData={response} blogSection={true}>
      {
        service.data.templateId==2 ? 
        <VillaPageComponent response={response} />
        :
        <ServicePageComponent response={response} />
      }
      </Layout>
      </>
    )
}
export async function getServerSideProps({ params }) {
  /* api endpoints url */
  let datas = [`/services/${params.slug}`,`/projects`,`ourExpertisePage`]
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
export default service
