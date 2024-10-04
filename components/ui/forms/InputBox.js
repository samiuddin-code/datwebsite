import { useEffect, useState } from "react"
import styles from '@/css/InputBox.module.scss'

const InputBox = ({labelText,children,classList,resize,textareaField,name,changeHandler,type,error,rounded,...rest}) => {
    const [labelPos,setLabelPos] = useState(false);
    const [errorMsg,setErrorMsg] = useState(error[name]);
    function moveLabel(e){
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
        <>
        {textareaField ? 
        <div className={classList +' relative'}>
            <label className={(labelPos ? "-top-2" : "top-4") + " absolute transition-all duration-300 custom-transition text-sm text-gray-700 bg-white px-2 pointer-events-none left-4" } htmlFor={name}>{labelText}</label>
            <textarea onFocus={moveLabel} name={name} onBlur={moveLabel} onChange={changeHandler} id={name} className={"outline-none transition-all duration-300 custom-transition border p-6 border-gray-900 border-opacity-20 h-full w-full focus:border-green-900 " + (resize) } {...rest} ></textarea>
            {
                errorMsg != '' &&
                <span className="text-[#ff0000] text-sm block" >{errorMsg}</span>
            }
            {children}
        </div>
        :
        <div className={(rounded ? "" : styles.inputboxHeight) + ' relative'}>
            <label className={(rounded ? ((labelPos ? `px-2 -top-3 left-2 ` : `${styles.label__width} left-4 `)) : "left-0") + (labelPos ? " top-0" : " top-3") + " bg-white absolute text-sm transition-all duration-300 custom-transition text-gray-700 pointer-events-none" } htmlFor={name}>{labelText}</label>
            <input type={type} onFocus={moveLabel} name={name} onBlur={moveLabel} onChange={changeHandler} id={name} className={(rounded ? `h-11 px-4 border rounded` : "border-b pt-7 ") + " outline-none transition-all duration-300 custom-transition  border-gray-900 border-opacity-20 h-full w-full focus:border-green-900"} {...rest} />
            {
                errorMsg != '' &&
                <span className="text-[#ff0000] text-sm block" >{errorMsg}</span>
            }
            {children}
        </div>}
        </>
    )
}
InputBox.defaultProps = {
    textareaField:false,
    classList:'',
    resize:'',
    rounded:true,
    type:'text'
}
export default InputBox
