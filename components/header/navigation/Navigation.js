import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = ({ navigation, isStick, noImageHeader }) => {
    const router = useRouter();
    const active = "opacity-100";
    const nonactive = "opacity-0";

    return (
        <div 
            id="header-nav" 
            className={`${isStick ? "border-opacity-0" : "border-opacity-60"} ${noImageHeader ? "border-green-100" : "border-white"} transition-all ease-linear duration-300 flex border-b-2 tracking-widest`}
        >
            {
                navigation.slice(0, 5).map((item, index) => (
                    <Link key={item.text} href={item.link}>
                        <div 
                            className={`${(router.pathname === item.link) ? "text-white opacity-100" : "text-white opacity-80"} ${isStick ? "xl:mx-4 text-gray-900" : (noImageHeader ? "xl:mx-6 text-gray-900" : "xl:mx-6 text-white")} rounded-none transition-all duration-300 ease-linear uppercase mx-6 py-3 text-sm font-bold relative group hover:opacity-100`} 
                            style={{ marginRight: index < navigation.length - 1 ? '1.5rem' : '0' }} // Add margin-right conditionally
                        >
                            <span className={`${(router.pathname === item.link ? active : nonactive)} ${isStick ? "-bottom-2.5 bg-green-900" : (noImageHeader ? "bg-green-900 -bottom-0.5" : "bg-white -bottom-0.5")} w-full bg-white absolute h-1 left-0 transition-all duration-300 ease-linear group-hover:opacity-100`}></span> 
                            {
                                router.pathname === item.link &&
                                <span className="sr-only">current</span>
                            }
                            {item.text}
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}

export default Navigation;
