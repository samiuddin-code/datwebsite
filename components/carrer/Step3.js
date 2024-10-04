import {useState} from 'react'
import InputBox from '@/forms/InputBox'
import SubmitButton from '@/ui/SubmitButton'
import { ArrowForward } from '@/icons/UtilIcons'
import { sentenceCase } from '@/helpers/helpers'

const Step3= (props) => {
    const [errorMessage,setErrorMessage] = useState({});
    const [formData,setFormData] = useState({});
    const [formVal,setFormVal] = useState(1);
    const changeHandler = (e) => {
        setErrorMessage(prevVal => ({
            ...prevVal,
            [e.target.name]:(e.target.value == "" ? `${sentenceCase(e.target.name)} cannot be empty` : "")
        }))
        setFormData({
            ...formData,
            [e.target.name]:(e.target.files != null ? e.target.files[0] : e.target.value)
        })
    }
    const onClick = () => {
        props.wholeFormData(formData);
        props.moveToNextForm();
    }
    const addFields = () => setFormVal(formVal + 1)
    const removeFields = () => setFormVal(formVal - 1)
    let formHtml = [];
    for (let i = 1; i <= formVal; i++){
        formHtml.push(<div key={i}>
            <div className="grid mb-6">
                <InputBox type="text" error={errorMessage} labelText="Institute Name" name={`trainings[${i-1}][instituteName]`} onChange={changeHandler}/>
            </div>
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 mb-6">
                <InputBox type="text" error={errorMessage} labelText="Course Title" name={`trainings[${i-1}][courseTitle]`} onChange={changeHandler}/>
                <InputBox type="date" error={errorMessage} labelText="Start Date" name={`trainings[${i-1}][startDate]`} onChange={changeHandler}/>
                <InputBox type="date" error={errorMessage} labelText="End Date" name={`trainings[${i-1}][endDate]`} onChange={changeHandler}/>
            </div>
            <div className="grid mb-8">
                <InputBox error={errorMessage} textareaField={true} labelText="Work summary" name={`trainings[${i-1}][otherInformation]`} onChange={changeHandler}/>
            </div>
            <span onClick={removeFields} className="underline text-[#ff0000]">Delete</span>
            <span className="block my-4 border-b border-gray-50"/>
        </div>)
    }
    return (
        <div className={(props.step == 3 ? "block" : "hidden") + " lg:px-8"}>
        <h2 className="font-medium text-2xl mb-8">{props.breadcrumbs[props.step-1]}</h2>
            {formHtml}
            <span onClick={addFields} className="underline text-green-900 mb-8 inline-block">Add more</span>
            <div className="flex justify-between">
                <div className="cursor-pointer text-green-900 mr-8 relative pl-8 flex items-center" onClick={props.moveToPreviousForm}>
                    <span className="hidden sm:block">Previous Step</span>
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 rotate-180 text-xl leading-4 transition-all duration-300 custom-transition z-10">
                        <ArrowForward/>
                    </span>
                </div>
                <SubmitButton onClick={onClick} text="Next Step" icon={true}/>
            </div>
        </div>
    )
}

export default Step3