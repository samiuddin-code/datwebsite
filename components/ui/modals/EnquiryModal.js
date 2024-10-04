import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import SubmitButton from '@/ui/SubmitButton'
import InputBox from '@/forms/InputBox'
import SelectBox from '@/forms/SelectBox'
import { headers } from '@/helpers/helpers'
import UploadFile from '@/forms/UploadFile'

const EnquiryModal = () => {
    const [formData,setFormData] = useState({
        serviceChosen:JSON.stringify(useRouter().query) === '{}' ? 'any' : useRouter().query.slug
    });
    const [formMessage,setFormMessage] = useState(null);
    const [errorMessage,setErrorMessage] = useState({});
    const [formSubmitting,setFormSubmitting] = useState(false);
    const path = useRouter();
    const sendMessage = (event) => {
        event.preventDefault()
        setFormSubmitting(true);
        axios.post(`${process.env.API_DOMAIN}/sendEnquiry`,formData,headers).then(res => {
                console.log(res);
                let formMessage;
                let obj = {};
                if(res.data.errorMsg){
                    res.data.errorMsg.map(item => (
                        obj[item.param]=item.msg
                    ))
                }
                if(res.data.code == 1){
                    path.push({
                        pathname: '/thankyou',
                        query: { message: res.data.msg }
                    });
                }else{
                    formMessage = <span className="text-[#ff0000]">{res.data.msg}</span>
                }
                setFormMessage(formMessage);
                setErrorMessage(obj);
                setFormSubmitting(false);
            })
            .catch(error => {
                console.log(error);
                setFormMessage(<span className="text-[#ff0000]">Error Encountered! Please Try again after a while</span>);
                setFormSubmitting(false);
            })
    }
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:(e.target.files != null ? e.target.files[0] : e.target.value)
        })
    }
    return (
        <form method="post" encType="multipart/form-data" autoComplete="off" onSubmit={sendMessage} className={(formSubmitting ? "pointer-events-none" : "")}>
            <div className={(path.pathname != "/" ? "md:grid-cols-2" : "" ) + " grid gap-x-8 mb-8"}>
                <InputBox labelText="Full Name" name="name" changeHandler={changeHandler} error={errorMessage}/>
                {
                    path.pathname != "/" &&
                    <InputBox labelText="Company Name" name="companyName" changeHandler={changeHandler} error={errorMessage}/>
                }
            </div>
            <div className={(path.pathname != "/" ? "md:grid-cols-3" : "md:grid-cols-2" ) + " grid gap-x-8 mb-8"}>
                <InputBox labelText="Contact Number" name="contactNumber" changeHandler={changeHandler} error={errorMessage}/>
                <InputBox labelText="Email" name="email" changeHandler={changeHandler} error={errorMessage}/>
                {
                    path.pathname != "/" &&
                    <SelectBox labelText="Choose Location" name="location" changeHandler={changeHandler} error={errorMessage}>
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                    </SelectBox>
                }
            </div>
            <div className="grid mb-6">
                <InputBox textareaField={true} classList="h-100" name="message" changeHandler={changeHandler} error={errorMessage} labelText="Type your message here" resize="resize-none"/>
            </div>
            {
                path.pathname != "/" &&
                <div className="w-full">
                    <UploadFile text="Upload Files" name="clientFiles" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*" formData={formData} error={errorMessage} onChange={changeHandler}/>
                </div>
            }
            <div className="mt-10">
                <SubmitButton text="Send enquiry" type="submit" animateIcon={formSubmitting} classList={(formSubmitting ? "pointer-events-none bg-gray-50" : "bg-gray-50")} />
                {
                    formMessage &&
                    <span className="mt-4 text-green-900 block">{formMessage}</span>
                }
            </div>
        </form>
    )
}

export default EnquiryModal
