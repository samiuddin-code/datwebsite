import { useEffect, useState } from 'react';
import styles from '@/css/InputBox.module.scss'

const SelectBox = ({labelText,children,classList,name,changeHandler,error,rounded,...rest}) => {
    const [labelPos,setLabelPos] = useState(false);
    const [errorMsg,setErrorMsg] = useState(error[name]);
    function moveLabel(e){
        console.log(e);
        if(e.target.value == ""){
            setLabelPos(!labelPos);
        }else{
            setLabelPos(true)
        }
    }
    useEffect(() => {
        setErrorMsg(error[name])
        return () => {
            setErrorMsg('')
        }
    })
    return (
        <div className={(rounded ? "" : styles.inputboxHeight) + ' relative'}>
            <label className={(rounded ? (labelPos ? "px-4 -top-3" : "left-4") : "left-0") + (labelPos ? " top-0" : " top-3") + " bg-white absolute text-gray-700 text-sm transition-all duration-300 custom-transition pointer-events-none z-10"} htmlFor={name}>{labelText}</label>
            {
                (rounded) &&
                <span className={(labelPos ? "opacity-0" : "opacity-100") + ` bg-white w-full absolute pointer-events-none border border-gray-900 border-opacity-20 transition-all custom-transition bottom-2 rounded h-11 top-0`}/>
            }
            <select id={name} onChange={changeHandler} name={name} onFocus={moveLabel} onBlur={moveLabel} className={(rounded ? `h-11 px-4 border rounded` : "border-b pt-7 ") + " outline-none transition-all duration-300 custom-transition  border-gray-900 border-opacity-20 h-full w-full focus:border-green-900"} {...rest} >
                {children}
            </select>
            {
                errorMsg != '' &&
                <span className="text-[#ff0000] text-sm block" >{errorMsg}</span>
            }
        </div>
    )
}
SelectBox.defaultProps = {
    classList:'h-11',
    rounded:true
}
export default SelectBox
