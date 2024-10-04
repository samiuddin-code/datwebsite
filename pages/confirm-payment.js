import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetchData from '@/components/api_data/resolver';``
import Layout from '@/components/Layout'
import Meta from '@/components/Meta';
import Moment from 'react-moment';
import SubmitButton from '@/components/ui/SubmitButton';
import axios from 'axios';
import LinkButton from '@/components/ui/LinkButton';
const confirmPayment = ({response,host}) => {
    const fetcher = (url) => axios.post(url,{
        'callbackURL': `https://${host}/transaction?requestId=${router.query.requestId}&tcs=${router.query.tcs}`,
        'declinedURL': `https://${host}/transaction?requestId=${router.query.requestId}&tcs=${router.query.tcs}`,
        'cancelledURL': `https://${host}/transaction?requestId=${router.query.requestId}&tcs=${router.query.tcs}`
    }).then((res) => res.data.data)
    const settingsWrap = response[response.length - 1];
    const {siteSetting} = settingsWrap.data;
    const router = useRouter()
    const printData = () => {
        const elm = document.getElementById('print-content');
        const clone = elm.cloneNode(true)
        clone.querySelector(".print__button").remove();
        clone.querySelectorAll("h3").forEach(item => item.style.fontSize="16px")
        clone.querySelectorAll("h3").forEach(item => item.style.fontWeight="bold")
        clone.querySelectorAll("h3").forEach(item => item.style.margin="0px 0px 4px 0px")
        clone.querySelectorAll("h3 span").forEach(item => item.style.fontSize="16px")
        clone.querySelectorAll("h3 span").forEach(item => item.style.fontWeight="normal")
        clone.querySelectorAll("h3 span").forEach(item => item.style.marginLeft="8px")
        clone.querySelector("table").style.marginTop="8px";
        clone.querySelector("table").style.display="block";
        clone.querySelector("table").style.border="1px solid #E8E9E9";
        clone.querySelector("table").style.width="100%";
        clone.querySelector("table td").style.padding="8px 16px";
        clone.querySelector("table th").style.padding="8px 16px";
        clone.querySelector("table td").style.textAlign="left";
        clone.querySelector("table th").style.textAlign="left";
        clone.querySelector("p").style.fontSize="14px";
        const content = clone.innerHTML;
        let w=window.open();
        w.document.write(content);
        w.print();
        w.close();
    }
    const { data, error } = useSWR(`/confirm-payment?requestId=${router.query.requestId}&tcs=${router.query.tcs}`, fetcher)
    if (error) return (
        <Layout apiData={response} noImageHeader={true}>
            <Meta title={"Confirm Payment"}/>
            <section className="relative pt-8 lg:pt-40 pb-16 lg:pb-20" id="print-content">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl px-8 mx-auto"> 
                    <h2 className="text-2xl font-bold">Failed to load...</h2>
                </div>
            </section>
        </Layout>)
    if (!data) return (
        <Layout apiData={response} noImageHeader={true}>
            <Meta title={"Confirm Payment"}/>
            <section className="relative pt-8 lg:pt-40 pb-16 lg:pb-20" id="print-content">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl px-8 mx-auto"> 
                    <h2 className="text-2xl font-bold">Loading...</h2>
                </div>
            </section>
        </Layout>)
    return (
        <Layout apiData={response} noImageHeader={true}>
            <Meta title={"Confirm Payment"}/>
            <section className={"relative pt-8 lg:pt-40 pb-16 lg:pb-20"} id="print-content">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl px-8 mx-auto">    
                    <h2 className="text-3xl mb-12 font-semibold">{`Hi, ${data.transitionData.firstName}  ${data.transitionData.lastName}`}</h2>
                    <div className="flex justify-center sm:flex-row flex-col flex-wrap">
                        <h3 className="w-full sm:w-1/2 lg:w-1/4 mb-6 last:mb-0">
                            <span className="font-semibold uppercase text-sm">Invoice Number: </span>
                            <span className="text-lg mt-2 block">
                                #{data.transitionData.invoiceNumber}  
                            </span>
                        </h3>
                        <h3 className="w-full sm:w-1/2 lg:w-1/4 mb-6 last:mb-0">
                            <span className="font-semibold uppercase text-sm">Issued By: </span>
                            <span className="text-lg mt-2 block">
                                {data.transitionData.issuedBy}  
                            </span>
                        </h3>
                        <h3 className="w-full sm:w-1/2 lg:w-1/4 mb-6 last:mb-0">
                            <span className="font-semibold uppercase text-sm">Payment Date: </span>
                            <span className="text-lg mt-2 block">
                                <Moment format="DD/MM/YYYY">{data.transitionData.createdAt}</Moment>   
                            </span>
                        </h3>
                        <h3 className="w-full sm:w-1/2 lg:w-1/4 mb-6 last:mb-0">
                            <span className="font-semibold uppercase text-sm">Email: </span>
                            <span className="text-lg mt-2 block">
                                {data.transitionData.email}  
                            </span>
                        </h3>
                    </div>
                    <div className="mt-8 mb-12">
                        <div className="bg-green-50">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-8 border-b border-white py-4 uppercase font-semibold text-sm  text-left">Project Title</th>
                                        <th className="px-8 border-b border-white py-4 uppercase font-semibold text-sm  text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-8 font-normal py-4 text-lg">{data.transitionData.projectTitle}</td>
                                        <td className="px-8 font-normal py-4 text-right text-lg">{data.transitionData.amount} AED</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap print__button">
                            <div className="w-full lg:w-1/2">
                                <LinkButton href={data.paymentURL} external={true} classList="bg-gray-50 mb-8" text="Confirm Payment">Confirm Payment</LinkButton>
                            </div>
                            <div className="w-full lg:w-1/2 lg:text-right">
                                <SubmitButton classList="border border-green-900 text-green-900 mb-8" icon={false} onClick={printData} text="Print Invoice"/>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                        Once The Payment is Made, the confirmation notice along with the transaction Id will be sent to the respective email address within 24 hours of the receipt of payment.</p>

                        <p className="text-gray-600">In case of any error in the data above please contact to DAT Administrator with email <a className="underline" href={`mailto:${siteSetting.email}`}>{siteSetting.email}</a>. You can also contact in our landline number <a className="underline" href={`tel:${siteSetting.phoneNumber.replace(/\s/g, '')}`}>{siteSetting.phoneNumber}</a>
                        </p>
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
  if (!response || Object.keys(context.query).length == 0 || context.query.requestId == "" || context.query.tcs == "") {
    return {
      notFound: true,
    }
  }
  return {
    props: {response,host:context.req.headers.host}, // will be passed to the page component as props
  }
}
export default confirmPayment
