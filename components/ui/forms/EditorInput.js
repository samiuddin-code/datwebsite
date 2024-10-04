import { useState } from 'react';
import Image from 'next/image';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import linkIcon from '@/images/icons/link.svg';
import ulIcon from '@/images/icons/ul.svg';
import olIcon from '@/images/icons/ol.svg';

const EditorInput = ({name,labelText}) => {
    const [labelPos,setLabelPos] = useState(false);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    function moveLabel(e){
        if(e.target.value == ""){
            setLabelPos(!labelPos);
        }else{
            setLabelPos(true)
        }
    }
    const richStyle = (e) => {
        let style = e.target.getAttribute("data-util");
        RichUtils.toggleInlineStyle(editorState,style);
        console.log(style);
    }
    return (
        <>
            {
                labelPos &&
                <ul className="flex flex-row border border-gray-900 border-b-0 border-opacity-20">
                    <li onClick={richStyle} data-util="BOLD" className="cursor-pointer font-bold px-4 py-2 flex items-center justify-center">B</li>
                    <li onClick={richStyle} data-util="ITALIC" className="cursor-pointer italic px-4 py-2 flex items-center justify-center">I</li>
                    <li onClick={richStyle} data-util="BOLD" className="cursor-pointer px-4 py-2 flex items-center justify-center">
                        <Image src={ulIcon} quality={75} width={20} height={20} className="pointer-events-none"/>
                    </li>
                    <li onClick={richStyle} data-util="BOLD" className="cursor-pointer px-4 py-2 flex items-center justify-center">
                        <Image src={olIcon} quality={75} width={20} height={20} className="pointer-events-none"/>
                    </li>
                    <li onClick={richStyle} data-util="BOLD" className="cursor-pointer px-4 py-2 flex items-center justify-center">
                        <Image src={linkIcon} quality={75} width={20} height={20} className="pointer-events-none"/>
                    </li>
                </ul>

            }
            <div className="border border-gray-900 border-opacity-20 h-40 p-4 relative">
                <label className={(labelPos ? "-top-2" : "top-4") + " absolute transition-all duration-300 custom-transition text-sm text-gray-700 bg-white px-2 pointer-events-none left-4" } htmlFor={name}>{labelText}</label>
                <Editor editorState={editorState} id={name} onChange={setEditorState} onFocus={moveLabel} onBlur={moveLabel} />
            </div>
        </>
    )
}

export default EditorInput
