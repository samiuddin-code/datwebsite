import React from 'react'
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/icons/SocialIcons'

const SocialLists = () => {
    return (
        <>
            <li className="flex-inline">
                <a href="https://www.facebook.com/DATengineeringConsultancy" rel="noreferrer noopener" target="_blank" className="text-white">
                    <FacebookIcon/>
                    <span className="sr-only">Facebook</span>
                </a>
            </li>
            <li className="ml-12 flex-inline">
                <a href="https://instagram.com/dat.architects?igshid=YmMyMTA2M2Y" rel="noreferrer noopener" target="_blank" className="text-white">
                <InstagramIcon/>
                    <span className="sr-only">Instagram</span>
                </a>
            </li>
            <li className="ml-12 flex-inline">
                <a href="https://www.linkedin.com/company/dat-engineering-consultancy/" target="_blank" rel="noreferrer noopener" className="text-white">
                    <LinkedInIcon/>
                    <span className="sr-only">Linked In</span>
                </a>
            </li>
        </>
    )
}

export default SocialLists
