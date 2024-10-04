import React,{useRef,useState} from 'react'
import Image from 'next/image'
export const ClipBoard = ({message,email,animated}) => {
    const copyTxt = useRef();
    const [copied,setCopy] = useState(false)

   const handleCopyTxt = () => {
        let txtDiv = copyTxt.current;
        if (document.selection) {
            // IE
            var range = document.body.createTextRange();
            range.moveToElementText(txtDiv);
            range.select();
        } else if (window.getSelection) {
            // other browsers
            var range = document.createRange();
            range.selectNode(txtDiv);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
        setCopy(true);
        document.execCommand("copy");
    }
    return (
        <>
            <div className="font-bold mb-3">
                <div className={"inline-block relative top-2 mr-2 " + (animated ? "animate-bounce" : "")}>
                    <Image src={message} width="26" height="26" alt="Mail Icon Filled" />
                </div> 
                <span ref={copyTxt}>{email}</span>
            </div>
            <span className={(copied ? "text-green-900" : (animated ? "text-white opacity-80" : "text-gray-900 opacity-80")) + " cursor-pointer transition-all duration-300 ease-linear pl-9"} onClick={handleCopyTxt}>
                {
                    copied ? "Email is copied!" : "Click here to copy"
                }
            </span>
        </>
    )
}
