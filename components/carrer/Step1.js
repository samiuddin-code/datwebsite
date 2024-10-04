import { useState } from 'react'
import InputBox from '@/forms/InputBox'
import SelectBox from '@/forms/SelectBox'
import SubmitButton from '@/ui/SubmitButton'
import { sentenceCase } from '@/helpers/helpers'

const Step1 = (props) => {
    const [errorMessage,setErrorMessage] = useState({});
    const [formData,setFormData] = useState({});
    const [formMessage,setFormMessage] = useState(null);
    const changeHandler = (e) => {
        let msg = "";
        if(e.target.name != "middleName"){
            msg = (e.target.value == "" ? `${sentenceCase(e.target.name)} cannot be empty` : "")
        }
        setErrorMessage(prevVal => ({
            ...prevVal,
            [e.target.name]:msg
        }))
        setFormData({
            ...formData,
            [e.target.name]:(e.target.files != null ? e.target.files[0] : e.target.value)
        })
    }
    const onClick = () => {
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
                props.wholeFormData(formData);
                props.moveToNextForm();
            }
            setFormMessage(formMove ? null : "Please fix above error");
        }else{
            setFormMessage("* marked fields cannot be empty");
        }
    }
    return (
        <div className={(props.step == 1 ? "block" : "hidden") + " lg:px-8"}>
            <h2 className="font-medium text-2xl mb-8">{props.breadcrumbs[props.step-1]}</h2>
            <div className="grid mb-6 md:grid-cols-3 gap-y-6 gap-x-8">
                <InputBox type="text" error={errorMessage} labelText="First Name (*)" name="firstName" onChange={changeHandler}/>
                <InputBox type="text" error={errorMessage} labelText="Middle Name" name="middleName" onChange={changeHandler}/>
                <InputBox type="text" error={errorMessage} labelText="Last Name (*)" name="lastName" onChange={changeHandler}/>
            </div>
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-8 mb-6">
                <InputBox type="email" error={errorMessage} labelText="Email Address (*)" name="email" onChange={changeHandler}/>
                <InputBox type="text" error={errorMessage} labelText="Contact Number (*)" name="contactNumber" onChange={changeHandler}/>
            </div>
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-8 mb-6">
                <InputBox type="text" error={errorMessage} labelText="Nationality (*)" name="nationality" onChange={changeHandler}/>
                <SelectBox labelText="Choose Gender (*)" name="gender" changeHandler={changeHandler} error={errorMessage}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </SelectBox>
            </div>
            {
                formMessage &&
                <div className="grid mb-8">
                    <span className="text-[#ff0000] block font-medium">{formMessage}</span>
                </div>
            }
            <div className="text-right">
                <SubmitButton onClick={onClick} text="Next Step" icon={true}/>
            </div>
        </div>
    )
}

export default Step1
