import React, { useContext } from 'react'
import Image from 'next/image'
import CrossImage from '@/images/icons/clear.svg'
import { GlobalContext } from '@/context/GlobalState'
import { useRouter } from 'next/router'
import EnquiryModal from './EnquiryModal'

const ModalComponent = () => {
    const path = useRouter()
    const { modal,modalState } = useContext(GlobalContext);
    return (
        <>  {
            modal && 
                <style>
                {
                    `body{overflow:hidden}`
                }
                </style>
            }
            <div className={(modal ? "translate-y-0 pointer-events-auto opacity-100" : "translate-y-full pointer-events-none opacity-0") + " fixed top-0 left-0 h-full w-full bg-green-900 bg-opacity-20 transform transition-all duration-300 custom-transition z-50 overflow-y-auto px-8"} tabIndex="-1">
                <div className="absolute top-0 left-0 w-full h-full" onClick={modalState}/>
                <div className="max-w-2xl mx-auto w-full bg-white shadow-sm rounded-lg relative z-10">
                    <div className="my-8">
                    {/* modal header */}
                        <div className="px-8 py-6 relative border-b border-green-100">
                            <h3 className="text-lg font-bold text-green-900">{path.asPath == "/" ? "Book A Meeting" : "Send Enquiry"}</h3>
                            <div className="absolute top-6 right-6 text-center cursor-pointer" onClick={modalState}>
                                <Image src={CrossImage} alt="contact image" width="24" height="24" className="pointer-events-none" />
                                <span className="sr-only">Close</span>
                            </div>
                        </div>
                        <div className="px-8 py-8">
                            <EnquiryModal />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ModalComponent
