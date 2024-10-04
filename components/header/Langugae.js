import Link from 'next/link'

const Langugae = ({isStick,noImageHeader}) => {
    return (
        <ul className={(isStick ? "text-gray-900" : (noImageHeader ? " text-gray-900" : " text-white" ) ) + " transition-all duration-300 ease-linear flex space-x-6 opacity-80 text-sm"}>
            <li className="py-3 uppercase font-semibold">
                <Link href="/">
                    Eng
                </Link>
            </li>
            <li className="py-3 uppercase font-semibold">
                <Link href="/">
       عربي
                </Link>
            </li>
        </ul>
    )
}

export default Langugae
