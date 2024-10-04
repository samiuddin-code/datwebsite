import Image from 'next/image'
import Meta from '@/components/Meta';
import LinkButton from '@/components/ui/LinkButton';
import { useRouter, withRouter } from 'next/router';
import Layout from '@/components/Layout';
import fetchData from '@/apiData/resolver';
import Img from "@/images/thanks/thank.svg"

const ThankYou = ({response}) => {
    const path = useRouter();
    return (
      <Layout apiData={response} noImageHeader={true}>
        <Meta title={"Thank You"} image={Img}/>
        <section className="relative lg:animate-to-top">
            <div className="flex flex-col relative h-screen items-center justify-center">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8 lg:pt-8">
                    <div className="w-32 mx-auto">
                        <Image src={Img} width={100} height={100} alt="mailbox icon for thank you page" layout="responsive"/>
                    </div>
                    <div className="text-center">
                        <h1 className={" w-full text-3xl font-bold relative z-10 mb-4"}>Thank you for submitting</h1>
                        <p className="mb-12 max-w-lg mx-auto font-medium text-lg text-gray-700 px-8" dangerouslySetInnerHTML={{__html:path.query.message}}/>
                        <LinkButton text="Go home" link="/"/>
                    </div>
                </div>
            </div>
        </section>
      </Layout>
    )
}
export async function getServerSideProps(context) {
  /* response after resolving promise */
  const response = await fetchData();
  /* if response not resolve move to 404 page */
  if (!response || Object.keys(context.query).length == 0 || context.query.message == "") {
    return {
      notFound: true,
    }
  }
  return {
    props: {response}, // will be passed to the page component as props
  }
}
export default withRouter(ThankYou)
