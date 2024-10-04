import React, { useEffect, useState } from 'react'
import { Upload } from '@/icons/UtilIcons'

const UploadFile = ({name,error,formData,text,...rest}) => {
    const urlImage = formData[name] != undefined && URL.createObjectURL(formData[name])
    const [errorMsg,setErrorMsg] = useState(error[name]);
    useEffect(() => {
        setErrorMsg(error[name])
        return () => {
            setErrorMsg('')
        }
    })
    return (
        <>
            <label htmlFor={name} className="cursor-pointer border rounded-md text-left inline-block text-sm py-2 pl-4 pr-10 capitalize leading-4 relative">                    
                <span className="relative z-10">{text}</span>
                <span className="absolute top-1 right-2 ml-8 text-xl leading-4 transition-all duration-300 custom-transition z-10">
                    <Upload/>
                </span>
            </label>
            {
                formData[name] != undefined &&
                <div className="inline-block ml-4 relative group">
                    <span>{formData[name].name}</span>
                    <img src={urlImage} className="w-24 h-24 object-cover absolute transform bottom-8 -right-4 group-hover:opacity-100 opacity-0 transition-all duration-300 custom-transition rounded pointer-events-none" alt={formData[name].name}/>
                </div>
            }
            {
                errorMsg != '' &&
                <span className="ml-4 text-[#ff0000] text-sm inline-block" >{errorMsg}</span>
            }
            <input className="hidden" id={name} name={name} type="file" {...rest} />
        </>
    )
}

export default UploadFile
