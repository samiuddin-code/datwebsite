import {useState} from 'react'
import InputBox from '@/forms/InputBox'
import SubmitButton from '@/ui/SubmitButton'
import SelectBox from '@/forms/SelectBox'
import { ArrowForward } from '@/icons/UtilIcons'
import { sentenceCase } from '@/helpers/helpers'

const Step4 = (props) => {
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
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-8 mb-6">
                <InputBox type="text" error={errorMessage} labelText="Skill Name" name={`skills[${i-1}][name]`} onChange={changeHandler}/>
                <SelectBox labelText="Proficiency" name={`skills[${i-1}][proficiency]`} changeHandler={changeHandler} error={errorMessage}>
                    <option value="Expert">Expert</option>
                    <option value="Average">Average</option>
                    <option value="Beginner">Beginner</option>
                </SelectBox>
            </div>
            <span onClick={removeFields} className="underline text-[#ff0000]">Delete</span>
            <span className="block my-4 border-b border-gray-50"/>
        </div>)
    }
    return (
        <div className={(props.step == 4 ? "block" : "hidden") + " lg:px-8"}>
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

export default Step4
