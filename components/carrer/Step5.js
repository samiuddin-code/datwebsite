import {useState} from 'react'
import InputBox from '@/forms/InputBox'
import SubmitButton from '@/ui/SubmitButton'
import UploadFile from '@/forms/UploadFile'
import { ArrowForward } from '@/icons/UtilIcons'
import { sentenceCase } from '../helpers/helpers'

const Step5 = (props) => {
    const [errorMessage,setErrorMessage] = useState({});
    const [formData,setFormData] = useState({
        interestedPosition:props.position,
    });
    const [formMessage,setFormMessage] = useState(null);
    const changeHandler = (e) => {
        setErrorMessage(prevVal => ({
            ...prevVal,
            [e.target.name]:(e.target.value == "" ? `${sentenceCase(e.target.name)} cannot be empty` : "")
        }))
        setFormData({
            ...formData,
            [e.target.name]:(e.target.files != null ? e.target.files[0] : e.target.value)
        })
        props.wholeFormData({
            [e.target.name]:(e.target.files != null ? e.target.files[0] : e.target.value)
        })
    }
    const onClick = () => {
        console.log(formData);
        let formMove = false
        if(Object.keys(errorMessage).length != 0){
            for(let item in errorMessage){
                if(errorMessage[item] == ""){
                    formMove = true
                }else{
                    formMove = false
                    break;
                }
            }
            if(formMove){
                props.formSubmit();
            }
            setFormMessage(formMove ? null : "Please fix above error");
        }else{
            setFormMessage("* marked fields cannot be empty");
        }
    }
    return (
        <div className={(props.step == 5 ? "block" : "hidden") + " lg:px-8"}>
        <h2 className="font-medium text-2xl mb-8">{props.breadcrumbs[props.step-1]}</h2>
            <div className="grid mb-6 gap-y-6 gap-x-8">
                <InputBox type="text" readOnly={props.position != "other"} error={errorMessage} defaultValue={props.position} labelText="Interested Position (*)" name="interestedPosition" onChange={changeHandler}/>
                <InputBox error={errorMessage} type="number" labelText="Total Years Of Experience (*)" name="totalExperience" onChange={changeHandler}/>
            </div>
            <div className="grid mb-6">
                <InputBox textareaField={true} error={errorMessage} labelText="Objective (*)" name="objectiveOfJoining" onChange={changeHandler}/>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-12">
                <div>
                    <UploadFile formData={formData} text="Upload Resume (*)" name="resume" error={errorMessage} onChange={changeHandler}/>
                </div>
                <div>
                    <UploadFile formData={formData} text="Upload Files" name="otherFiles" error={errorMessage} onChange={changeHandler}/>
                </div>
            </div>
            {
                formMessage &&
                <div className="grid mb-12">
                    <span className="text-[#ff0000] block font-semibold">{formMessage}</span>
                </div>
            }
            <div className="flex justify-between">
                <div className="cursor-pointer text-green-900 mr-8 relative pl-16 group flex items-center" onClick={props.moveToPreviousForm}>
                    <span className="hidden sm:block">Previous Step</span>
                    <span className="mr-8 absolute left-8 top-1/2 transform -translate-y-1/2 rotate-180 text-xl leading-4 group-hover:left-0 transition-all duration-300 custom-transition z-10">
                        <ArrowForward/>
                    </span>
                </div>
                <div className="mt-16">
                    <SubmitButton onClick={onClick} type="button" text="Send enquiry" animateIcon={props.formSubmitting} classList={(props.formSubmitting ? "pointer-events-none bg-gray-50" : "bg-gray-50")}/>
                    {
                        props.formMessage &&
                        <span className="mt-4 block">{props.formMessage}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Step5
