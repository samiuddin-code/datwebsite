import Link from 'next/link';
import {useRouter} from 'next/router'
import SocialLists from '@/ui/SocialLists';
const MobileNavigation = ({navigation,isOpen,hide,show,toggle}) => {
    const router = useRouter()
    const active = "w-full"
    const nonactive = "w-0"
    return (
        <div className={(isOpen ? "animate-skew-nav" : "animate-skew-nav-reverse") + " flex flex-col h-full transform -skew-x-12 -translate-x-full relative"}>
            <ul className="flex flex-col">
                {
                    navigation.map(item => (
                        <li key={item.text}>
                            <Link href={item.link}>
                                <div onBlur={hide} onFocus={show} onClick={toggle} className={(router.pathname == item.link && "mb-4") + " rounded-none transition-all duration-1000 ease-linear capitalize text-white py-3 text-xl relative inline-block"}>
                                    <span className={(router.pathname == item.link ? active : nonactive) + " bg-white absolute h-0.5 bottom-0 left-0 transition-all duration-1000 ease-linear"}></span> 
                                    {
                                        router.pathname == item.link &&
                                        <span className="sr-only">current</span>
                                    }
                                    {item.text}
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-24 lg:w-1/2">
                <ul className="flex mt-6 ">
                    <SocialLists/>
                </ul>
            </div>
        </div>
    )
}
export default MobileNavigation
