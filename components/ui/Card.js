import React from 'react'
import Link from 'next/link'
import LinkAnchor from '@/ui/LinkAnchor'
import { ArrowForward } from '@/icons/UtilIcons'
import Styles from "@/css/card.module.scss"

const Card = ({span,heading,description,buttonData,hover,children,fixedHeight,imageHover,interactive, classList}) => {
    return (
        <div className={(hover ? "lg:hover:shadow-xl lg:hover:bg-opacity-100 lg:p-6 " : "") + (interactive ? " interactive-element top " : "") + " shadow-none bg-white bg-opacity-0 h-full group transition custom-transition duration-300 "+classList}>
            <div className="mb-4 cursor-pointer relative group">
                {
                    buttonData.external ? 
                    <a target="_blank" rel="noopener noreferrer" href={buttonData.link ? buttonData.link : "/"}>
                        <div className="overflow-hidden">
                            {children}
                        </div>
                    </a> : 
                    <Link href={buttonData.link ? buttonData.link : "/"}>
                        <div className="overflow-hidden">
                            {children}
                        </div>
                    </Link>
                }
                {
                    imageHover && 
                    <div className="bg-green-900 flex items-center justify-center text-white absolute top-0 left-0 w-full h-full bg-opacity-10 transition-all ease-linear duration-300 group-hover:bg-opacity-70 pointer-events-none opacity-0 group-hover:opacity-100">
                        <span className="w-12 h-12 flex items-center justify-center border border-white rounded-full">
                            <ArrowForward/>
                        </span>
                    </div>
                }
            </div>
            <div className={(fixedHeight ? (description ? Styles.card__fixed__height : Styles.card__fixed__height__nodesc) : " ") + (imageHover ? ` ${Styles.card__hover}`: " ")}>
                {
                    span &&
                    <span className="text-gray-800 mb-4 block">{span}</span>
                }
                {
                    buttonData.external ? 
                    <a target="_blank" rel="noopener noreferrer" href={buttonData.link ? buttonData.link : "/"}>
                        <h3 className="mb-4 text-xl font-medium cursor-pointer line-clamp line-clamp-5">{heading}</h3>
                    </a>:
                    <Link href={buttonData.link ? buttonData.link : "/"}>
                        <h3 className="mb-4 text-xl font-medium cursor-pointer line-clamp line-clamp-5">{heading}</h3>
                    </Link>
                }
                {
                    description &&
                    <div className="text-gray-700 text-sm line-clamp line-clamp-5 " dangerouslySetInnerHTML={{ __html: description }}/>
                }
                {
                    buttonData.enabled &&
                    <div className="mt-6">
                        <LinkAnchor external={buttonData.external} link={buttonData.link} text={buttonData.text} icon={buttonData.icon} classList={buttonData.classList}/>
                    </div>
                }
            </div>
        </div>
    )
}

Card.defaultProps = {
    hover : false,
    imageSource : 'images/file.jpg',
    heading:"Some long long heading data",
    fixedHeight:true,
    imageHover:false,
    interactive:false,
    buttonData:{
        enabled:false,
        external:false,
    }
}

export default Card;
