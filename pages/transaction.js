import Image from 'next/image'
import Meta from '@/components/Meta';
import LinkButton from '@/components/ui/LinkButton';
import Layout from '@/components/Layout';
import fetchData from '@/apiData/resolver';
import PayDone from "@/images/thanks/pay.svg"
import Alert from "@/images/thanks/alert.svg"

const ThankYou = ({response}) => {
    const [payResponse] = response;
    const {transactionData,transactionStatus} = payResponse.data;
    console.log(transactionData);
    let status,message;
    switch (transactionStatus) {
        case 1:
            status = "Your transaction is pending."
            message = "Pending"
            break;
        case 2: 
            status = "Your transaction is authorised."
            message = "Authorised"
            break;
        case 3: 
            status = `Your transaction of ${transactionData.amount} AED is paid. Your invoice number is #${transactionData.invoiceNumber}`
            message = `Payment Done`
            break;
        case -1:
        case -2:
        case -3:
            status = "Your transaction is declined. Try again."
            message = "Payment Cancelled"
        default:
            break;
    }
    return (
      <Layout apiData={response} noImageHeader={true}>
        <Meta title={"Thank You"} image={PayDone}/>
        <section className="relative lg:animate-to-top">
            <div className="flex flex-col relative h-screen items-center justify-center">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8">
                    <div className="w-32 mx-auto">
                        {
                          transactionStatus == 3 ? 
                          <Image src={PayDone} alt="Payment done icon for payment page" width={100} height={100} layout="responsive"/> :
                          <Image src={Alert} alt="Payment error icon for payment page" width={100} height={100} layout="responsive"/> 
                        }

                    </div>
                    <div className="text-center">
                        <h1 className={" w-full text-3xl font-bold relative z-10 mb-4"}>{message}</h1>
                        <p className="mb-12 max-w-lg mx-auto font-medium text-lg text-gray-700 px-8">Hi, {transactionData.firstName} {transactionData.lastName}, {status} </p>
                        {
                            transactionStatus == 3 ?
                            <LinkButton text="Go home" link="/"/> :
                            <LinkButton text="Go to payment" link="/payment"/> 
                        }
                    </div>
                </div>
            </div>
        </section>
      </Layout>
    )
}
export async function getServerSideProps(context) {
    const pages = [`submit-transaction?requestId=${context.query.requestId}&tcs=${context.query.tcs}`]
    console.log(context.query);
  /* response after resolving promise */
  const response = await fetchData(pages);
  /* if response not resolve move to 404 page */
  if (!response || Object.keys(context.query).length == 0 || context.query.requestId == "" || context.query.tcs == "") {
    return {
      notFound: true,
    }
  }
  return {
    props: {response}, // will be passed to the page component as props
  }
}
export default ThankYou
