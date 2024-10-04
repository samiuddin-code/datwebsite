import { useState } from 'react';
import Step1 from '@/carrer/Step1';
import Step2 from '@/components/carrer/Step2';
import Step3 from '@/components/carrer/Step3';
import Step4 from '@/components/carrer/Step4';
import Step5 from '@/components/carrer/Step5';
import axios from 'axios';
import { useRouter } from 'next/router';

const CarrerForm = ({position,formDisplay}) => {
    const [formData,setFormData] = useState({
        interestedPosition: position
    });
    const [formSubmitting,setFormSubmitting] = useState(false);
    const [formMessage,setFormMessage] = useState(null);
    const [step,setStep] = useState(1);
    const router = useRouter()
    const wholeFormData = (data) => {
        setFormData(prevVal => ({
            ...prevVal,
            ...data
        }))
    }
    const moveToNextForm = () => setStep(step+1)
    const moveToPreviousForm = () => setStep(step-1)
    let breadcrumbs = ['Personal Information','Experience','Training','Skills','Job Details']
    const joinUs = (event) => {
        setFormSubmitting(true);
        // console.log("formdata "+formData);
        let formBody = new FormData();
        Object.entries(formData).map((element,index) => {
            formBody.append(element[0], element[1]);
        })
        // formBody.append('position', position);
        axios.post(`/candidate-request/candidate-data`,formBody,{
            crossDomain: true
        }).then(res => {
            let formMessage;
            let obj = {};
            if(res.data.errorMsg){
                res.data.errorMsg.map(item => (
                    obj[item.param]=item.msg
                ))
            }
            if(res.data.success){
                router.push({
                    pathname: '/thankyou',
                    query: { message: res.data.msg }
                });
            }else{
                formMessage = <span className="text-[#ff0000]">{res.data.msg}</span>
            }
            setFormMessage(formMessage);
            setFormSubmitting(false);
        }).catch(error => {
            setFormMessage(<span className="text-[#ff0000]">Please fix the above error</span>);
            setFormSubmitting(false);
        })
    }
    return (
        <div className={"pt-12 lg:pt-16"}>
            <h2 className="font-semibold text-2xl mb-3">Please fill up the Form</h2>
            <p className="text-gray-800 mb-12">Follow the below steps. * is marked required.</p>
            <div className="flex flex-wrap flex-row">
                <div className="w-full lg:w-4/12 xl:w-3/12">
                    <ul className="text-center flex flex-row lg:flex-col flex-wrap justify-around mb-12 lg:mb-0">
                        {
                            breadcrumbs.map((item,index) => 
                            <li key={item} className={" items-center flex justify-start flex-col lg:flex-row lg:pb-8 lg:last:pb-0 relative"}>
                                <span className={(step == (index + 1) ? "bg-green-900 text-white" : step > (index + 1) ? "bg-white border-green-900 text-green-900"  : "border-gray-50 bg-gray-50") + " relative z-10 w-8 h-8 rounded-full flex items-center justify-center lg:mr-8 transition-all duration-300 custom-transition border"}>{(index + 1)}</span>
                                <span className={(step==(index + 1) ? "font-medium" : "") + " text-lg hidden lg:block"}>{item}</span>
                                {
                                    <span className={(step > (index + 1) ? "border-green-900" : "border-gray-50") + " h-0.5 lg:h-full w-full lg:w-0.5 lg:border-l border-t lg:border-t-0 absolute top-4 lg:top-0 right-0 lg:right-auto left-4 z-0 hidden lg:block"}/>
                                }
                            </li>)
                        }
                    </ul>
                </div>
                <div className="w-full lg:w-8/12 xl:w-9/12">
                    <form method="post" autoComplete="off" onSubmit={joinUs} className={(formSubmitting ? "pointer-events-none" : "")}>
                        <Step1 step={step} breadcrumbs={breadcrumbs} wholeFormData={wholeFormData} moveToNextForm={moveToNextForm}/>
                        <Step2 step={step} breadcrumbs={breadcrumbs} wholeFormData={wholeFormData} moveToNextForm={moveToNextForm} moveToPreviousForm={moveToPreviousForm}/>
                        <Step3 step={step} breadcrumbs={breadcrumbs} wholeFormData={wholeFormData} moveToNextForm={moveToNextForm} moveToPreviousForm={moveToPreviousForm}/>
                        <Step4 step={step} breadcrumbs={breadcrumbs} wholeFormData={wholeFormData} moveToNextForm={moveToNextForm} moveToPreviousForm={moveToPreviousForm}/>
                        <Step5 step={step} breadcrumbs={breadcrumbs} formSubmitting={formSubmitting} formMessage={formMessage} wholeFormData={wholeFormData} moveToNextForm={moveToNextForm} moveToPreviousForm={moveToPreviousForm} formSubmit={joinUs} position={position}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CarrerForm
