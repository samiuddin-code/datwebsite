import Link from "next/link";
import { Chevron } from "@/icons/UtilIcons";

const LinkAnchor = ({link,text,classList,icon,external,...rest}) => {
    let btnClass = classList + (icon ? " pr-8" : "");
    return (
        <>
            {
                external ? 
                    <a {...rest} href={link} target="_blank" rel="noopener noreferrer" className={btnClass + " tracking-widest text-sm group-hover:text-green-900 uppercase leading-4 relative group overflow-hidden inline-block transition-all duration-300 custom-transition"}>
                        <span className="font-medium lg:font-normal text-gray-900 relative z-10 transform lg:top-12 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:top-0 transition-all duration-300">{text}</span>
                        {
                            icon &&
                            <span className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 custom-transition z-10 text-gray-900 w-4 lg:left-0 group-hover:right-4 lg:group-hover:left-btn-inset">
                                <span className="text-4xl leading-4 relative flex items-center justify-center group-hover:text-green-900 transition-all duration-300 custom-transition">
                                    <Chevron/>
                                </span>
                            </span>
                        }
                    </a>
                    :<Link href={link}>
                        <div {...rest} className={btnClass + " tracking-widest text-sm group-hover:text-green-900 uppercase leading-4 relative group overflow-hidden inline-block transition-all duration-300 custom-transition"}>
                            <span className="font-medium lg:font-normal text-gray-900 relative z-10 transform lg:top-12 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:top-0 transition-all duration-300">{text}</span>
                            {
                                icon &&
                                <span className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 custom-transition z-10 text-gray-900 w-4 lg:left-0 group-hover:right-4 lg:group-hover:left-btn-inset">
                                    <span className="text-4xl leading-4 relative flex items-center justify-center group-hover:text-green-900 transition-all duration-300 custom-transition">
                                        <Chevron/>
                                    </span>
                                </span>
                            }
                        </div>
                    </Link>
            }
        </>
    )
}

LinkAnchor.defaultProps = {
  link: '/',
  classList: 'text-gray-500',
  text: 'Click here',
  icon: true,
  external:false
}

export default LinkAnchor
