import { useRef, useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import Meta from '@/components/Meta';
import InputBox from '@/components/ui/forms/InputBox';
import SectionHeader from '@/components/ui/SectionHeader';
import SubmitButton from '@/components/ui/SubmitButton';
import fetchData from "@/apiData/resolver";
import PaymentCard from '@/components/ui/PaymentCard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import copy from '@/images/icons/copy.svg'

const payment = ({response,host}) => {
    const [formData,setFormData] = useState({});
    const [errorMessage,setErrorMessage] = useState({});
    const [formSubmitting,setFormSubmitting] = useState(false);
    const [formMessage,setFormMessage] = useState(null);
    const [checked,setChecked] = useState(false);
    const [paymentLink,setPaymentLink] = useState(false);
    const router = useRouter();
    const copyTxt = useRef();
    const [copied,setCopy] = useState(false)
   const handleCopyTxt = () => {
        let txtDiv = copyTxt.current;
        if (document.selection) {
            // IE
            var range = document.body.createTextRange();
            range.moveToElementText(txtDiv);
            range.select();
        } else if (window.getSelection) {
            // other browsers
            var range = document.createRange();
            range.selectNode(txtDiv);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
        setCopy(true);
        document.execCommand("copy");
    }
    const createPaymentLink = (redirect=false) => {
        axios.post(`${process.env.API_DOMAIN}/getPaymentLink`,formData).then(res => {
            let formMessage;
            let obj = {};
            if(res.data.errorMsg){
                res.data.errorMsg.map(item => (
                    obj[item.param]=item.msg
                ))
            }
            if(res.data.success){
                formMessage = res.data.paymentLink
                setPaymentLink(true);
                if(redirect){
                    router.push(formMessage);
                }
            }else{
                formMessage = <span className="text-[#ff0000]">{res.data.msg}</span>
            }
            setFormMessage(formMessage);
            setErrorMessage(obj);
            setFormSubmitting(false);
        }).catch(error => {
            setFormMessage(<span className="text-[#ff0000]">Please fix the above error</span>);
            setFormSubmitting(false);
        })
    }
    const getPaymentLink = () => {
        if(checked){
            createPaymentLink();
        }else{
            setFormMessage(<span className="text-[#ff0000]">You didnt accept Terms &amp; Conditions.</span>)
        }
    }
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const acceptTerms = (e) => {
        var checked = e.target.checked;
        setChecked(checked);
    }
    const sendToPaymentPage = () => {
        createPaymentLink(true);
    }
    return (
      <>
      <Layout noImageHeader={true} apiData={response}>
        <Meta title="Online Payment" description="Now You can pay Us Online. All Major Credit and Debit cards accepted" />
        <section className="py-16 lg:py-20 pt-8 lg:pt-40 relative lg:animate-to-top">
            <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-5xl mx-auto px-8 lg:px-8">
                <SectionHeader animate={false} classList="w-full" headingLevel='h1' heading="Online Payment"/>
                <p className="mb-10 text-gray-700">Hi {formData.firstName ? formData.firstName : "User"},
                    You are about to make an online payment {formData.amount ? `of ${formData.amount} AED` : ""}. If you choose to complete the payment, you will be redirected to our merchant page to process your payment.
                </p>
                <form autoComplete="off" method="post" onSubmit={(e) => e.preventDefault()} className={formSubmitting ? "pointer-events-none opacity-80" : ""}>
                    <div className="grid lg:grid-cols-2 gap-x-12">
                        <div>
                            <div>
                                <h2 className="font-semibold uppercase mb-2">Amount Details</h2>
                                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                    <InputBox labelText="Amount (AED)" name="amount" type="number" onChange={changeHandler} error={errorMessage} />
                                    <InputBox type="text" labelText="Invoice Number" name="invoiceNumber" onChange={changeHandler} error={errorMessage} />
                                </div>
                            </div>
                            <span className="border-b my-10 lg:my-4 border-gray-100 block"/>
                            <div>
                                <h2 className="font-semibold uppercase mb-2">Personal Details</h2>
                                <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                                    <InputBox type="text" labelText="First Name" name="firstName" onChange={changeHandler} error={errorMessage} />
                                    <InputBox type="text" labelText="Last Name" name="lastName" onChange={changeHandler} error={errorMessage} />
                                    <InputBox type="email" labelText="Email Address" name="email" onChange={changeHandler} error={errorMessage} />
                                    <InputBox type="text" labelText="Phone Number" name="contactNumber" onChange={changeHandler} error={errorMessage} />
                                </div>
                            </div>
                            <span className="border-b my-10 lg:my-4 border-gray-100 block"/>
                            <div>
                                <h2 className="font-semibold uppercase mb-2">Project Details</h2>
                                <div className="grid gap-y-4">
                                    <InputBox type="text" labelText="Project Title" name="projectTitle" onChange={changeHandler} error={errorMessage} />
                                    <InputBox type="text" labelText="Remarks" name="remarks" onChange={changeHandler} error={errorMessage} />
                                    <InputBox type="text" labelText="Link Issuing Name" name="issuedBy" onChange={changeHandler} error={errorMessage} />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-y-3 mt-8 mb-4 lg:my-0">
                            <PaymentCard formData={formData}/>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label>
                            <input className="mr-2" name="terms&amp;Condition" onChange={acceptTerms} type="checkbox" required="" />
                            I have reviewed the <a className="underline" target="_blank" rel="noopener noreferrer" href="/terms-and-conditions">terms and conditions</a> and I agree to make this online payment.
                        </label>
                    </div>n
                    {
                        formMessage &&
                        <div className="mt-8 block px-8 bg-green-50 py-4 rounded relative cursor-pointer " onClick={handleCopyTxt}>
                            <div className="break-words" ref={copyTxt}>{paymentLink ? <span className="text-green-900">{host + formMessage}</span> : formMessage}</div>
                            {
                                paymentLink &&
                                <span className="absolute flex items-center -top-4 right-4 bg-white text-gray-900 px-2 py-1 rounded-lg text-sm pointer-events-none">
                                    Copy
                                    <Image width={16} height={16} src={copy} alt="copy icon" className="pl-4" />
                                </span>
                            }
                        </div>
                    }
                    {
                        copied &&
                        <span className="text-green-900">Link is copied to your clipboard.</span>
                    }
                    <div className="mt-12">
                        <SubmitButton text="Make Payment" onClick={sendToPaymentPage} animateIcon={formSubmitting} classList={(formSubmitting ? "pointer-events-none bg-gray-50" : "bg-gray-50")}/>
                        <span onClick={getPaymentLink} className="w-full block mt-8 sm:ml-8 sm:mt-0 sm:inline sm:w-auto underline text-green-900 cursor-pointer">Get payment link</span>
                    </div>
                </form>
            </div>
        </section>
      </Layout>
      </>
    )
}
export async function getServerSideProps(context) {
    /* response after resolving promise */
    const response = await fetchData();
    /* if response not resolve move to 404 page */
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {response,host:context.req.headers.host}, // will be passed to the page component as props
    }
}
export default payment
