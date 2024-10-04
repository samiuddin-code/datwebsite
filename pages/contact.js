import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import axios from "axios"
import Layout from "@/components/Layout"
import Meta from "@/components/Meta"
import CallImage from '@/images/icons/call.svg'
import SectionHeader from "@/ui/SectionHeader"
import Message from '@/images/icons/email.svg'
import { ClipBoard } from "@/ui/ClipBoard"
import { trimSpaces } from "@/helpers/helpers"
import ExternalImage from "@/ui/ExternalImage"
import InputBox from "@/forms/InputBox"
import SubmitButton from "@/ui/SubmitButton"
import fetchData from "@/apiData/resolver";
import { Chevron } from "@/icons/UtilIcons";
import Styles from "@/css/card.module.scss";
import LinkButton from "@/components/ui/LinkButton"

const Contact = ({ response }) => {
    const [contactData, blogData, clientData, settingsWrap] = response;
    const { siteSetting, branchLocations } = settingsWrap.data;
    const [formData, setFormData] = useState({});
    const [formMessage, setFormMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState({});
    const [formSubmitting, setFormSubmitting] = useState(false);
    const router = useRouter();
    const sendMessage = (event) => {
        event.preventDefault();
        setFormSubmitting(true);
        axios.post(`/sendContactRequest`, formData).then(res => {
            let formMessage;
            let obj = {};
            if (res.data.errorMsg) {
                res.data.errorMsg.map(item => (
                    obj[item.param] = item.msg
                ))
            }
            if (res.data.success) {
                router.push({
                    pathname: '/thankyou',
                    query: { message: res.data.msg }
                });
            } else {
                formMessage = <span className="text-[#ff0000]">{res.data.msg}</span>
            }
            setFormMessage(formMessage);
            setErrorMessage(obj);
            setFormSubmitting(false);
        }).catch(error => {
            console.log(error);
            setFormMessage(<span className="text-[#ff0000]">Please fix the above error</span>);
            setFormSubmitting(false);
        })
    }
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Layout apiData={response} noImageHeader={true}>
            <Meta title={contactData.data.seoData.title} description={contactData.data.seoData.description} keywords={contactData.data.seoData.keywords} image={contactData.data.seoData.image} />
            <section className="py-16 lg:py-20 pt-8 lg:pt-40 relative lg:animate-to-top">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 relative">
                    <SectionHeader animate={false} classList="w-full font-medium" headingLevel='h1' heading={contactData.data.bannerData.title} />
                    <p className="mb-12 text-gray-700">{contactData.data.bannerData.highlight}</p>
                    <div className="grid lg:grid-cols-2 gap-x-8 text-center">
                        <div className="bg-opacity-80 bg-green-50 p-6 mb-8 lg:mb-0 shadow-none custom-transition duration-300 transition-all hover:shadow-lg">
                            <div className="relative">
                                <Link href={`tel:${siteSetting.phoneNumber.replace(/\s/g, '')}`}>
                                    <span className="w-16 h-16 bg-green-100 flex items-center justify-center text-green-900 text-3xl rounded-full cursor-pointer mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                            <div className="">
                                <h2 className="font-semibold text-2xl mb-4 mt-4">Call Us Now</h2>
                                <p className="text-gray-800 mb-4">Call us any time from 09:00 till 18:00 Sat - Thu</p>
                                <LinkButton classList="bg-white text-gray-900 py-3" text="Call Now" link={`tel:${siteSetting.phoneNumber.replace(/\s/g, '')}`} />
                            </div>
                        </div>
                        <div className="bg-opacity-80 bg-green-50 p-6 shadow-none custom-transition duration-300 transition-all hover:shadow-lg">
                            <div className="relative">
                                <Link href={`mailto:${siteSetting.email}`}>
                                    <span className="w-16 h-16 bg-green-100 flex items-center justify-center text-green-900 text-3xl rounded-full cursor-pointer mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                            <div className="">
                                <h2 className="font-semibold text-2xl mb-4 mt-4">Mail Us Now</h2>
                                <p className="text-gray-800 mb-4">Email us anytime, we usually reply within 24 hours</p>
                                <LinkButton classList="bg-white text-gray-900 py-3" text="Mail Now" link={`mailto:${siteSetting.email}`} />
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 pt-20">
                        {
                            branchLocations.map(item => (
                                <div className="interactive-element top mb-8 md:mb-0">
                                    <a href={item.mapLocation} target="_blank">
                                        <ExternalImage key={branchLocations.title} alt={branchLocations.title} src={item.image} folder="uploads/locations" layout="responsive" width={352} height={260} objectFit="cover" className="filter blur-none group-hover:blur-sm" />
                                    </a>
                                    <div className="pt-6">
                                        <div className={Styles.card__contact__height + " relative"}>
                                            <h2 className="mb-4 text-xl font-medium cursor-pointer">{item.title}</h2>
                                            <p className="text-gray-700 text-sm mb-4">{item.address}</p>
                                            <a href={`tel:${trimSpaces(item.contactNumber)}`} rel="noopener noreferrer" target="_blank" className="text-gray-700 text-sm">{item.contactNumber}</a>
                                            <div className="absolute bottom-0 left-0">
                                                <a href={item.mapLocation} target="_blank" rel="noopener noreferrer" className="tracking-widest text-sm group-hover:text-green-900 uppercase leading-4 relative group overflow-hidden inline-block transition-all duration-300 custom-transition pr-8">
                                                    <span className="font-medium lg:font-normal text-gray-900 relative z-10 transform lg:top-12 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:top-0 transition-all duration-300">View google map</span>
                                                    <span className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 custom-transition z-10 text-gray-900 w-4 lg:left-0 group-hover:right-4 lg:group-hover:left-btn-inset">
                                                        <span className="text-4xl leading-4 relative flex items-center justify-center group-hover:text-green-900 transition-all duration-300 custom-transition">
                                                            <Chevron />
                                                        </span>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="pb-16 lg:pb-20" id="contactForm">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-8 interactive-element top">
                    <SectionHeader classList="mb-10" heading="Let's discuss your project" span="Powered by engineers" animate={false} />
                    <form method="post" autoComplete="off" onSubmit={sendMessage} className={(formSubmitting ? "pointer-events-none" : "")}>
                        <div className="grid lg:grid-cols-2 lg:gap-16">
                            <div className="grid grid-cols-1 gap-y-8">
                                <InputBox rounded={false} labelText="Full Name" onChange={changeHandler} name="name" error={errorMessage} />
                                <InputBox rounded={false} labelText="Email" type="email" onChange={changeHandler} name="email" error={errorMessage} />
                                <InputBox rounded={false} labelText="Contact Number" onChange={changeHandler} name="contactNumber" error={errorMessage} />
                            </div>
                            <div className="grid mt-12 lg:mt-0 ">
                                <InputBox textareaField={true} classList="h-100" name="message" onChange={changeHandler} labelText="Type your message here" resize="resize-none" error={errorMessage} />
                            </div>
                        </div>
                        <div className="mt-16">
                            <SubmitButton type="submit" text="Send enquiry" animateIcon={formSubmitting} classList={(formSubmitting ? "pointer-events-none bg-gray-50" : "bg-gray-50")} />
                            {
                                formMessage &&
                                <span className="mt-4 block">{formMessage}</span>
                            }
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
export async function getServerSideProps() {
    const page = ['contactUsPage']
    const response = await fetchData(page);
    /* if response not resolve move to 404 page */
    if (!response) {
        return {
            notFound: true,
        }
    }
    return { props: { response } };
}
export default Contact
