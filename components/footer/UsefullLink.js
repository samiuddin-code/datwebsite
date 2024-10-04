import Link from 'next/link'
const UsefullLink = ({text,link}) => {
    return(
        <li className="mb-1.5">
            <Link href={link}>
                <div className="relative transition-all duration-300 ease-linear left-0 hover:left-2 py-2">
                    {text}
                </div>
            </Link>
        </li>
    )
}
export default UsefullLink