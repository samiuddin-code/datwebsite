import Link from 'next/link'
import DIcon from '@/icons/DIcon'
import { ClipBoard } from '@/ui/ClipBoard'
import Logo from '@/icons/Logo'
import AddressSection from '@/footer/AddressSection'
import UsefullLink from '@/footer/UsefullLink'
import LinkButton from '@/ui/LinkButton'
import ClientSection from '@/footer/ClientSection'
import Message from '@/images/icons/contact-fill.svg'
import SocialLists from '@/ui/SocialLists'
export default function Footer({settingsWrap,clientsData}) {
    const {siteSetting,branchLocations} = settingsWrap.data;
    return (
        <>
            <ClientSection data={clientsData.data}/> 
            <footer className="bg-gray-900 overflow-x-hidden pb-16 text-white text-xs border-b-8 border-green-900 relative">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col lg:flex-row justify-between mt-16 lg:mt-20 px-8 opacity-80 2xl:relative interactive-element">
                    <DIcon color="#ffffff" height="400" classList="h-72 lg:h-auto absolute -right-8 bottom-64 lg:bottom-28 2xl:bottom-0 pointer-events-none opacity-100 d-icon"/>
                    <div className="w-full lg:w-3/12 ">
                        <h2 className="mb-10 text-4xl font-light">Do you have a question?</h2>
                        <LinkButton text="Contact Us" icon="true" link="/contact" classList="bg-gray-800"/>
                        <div className="relative block mt-10 mb-10 lg:mt-20 lg:mb-0 ">
                            <p className="text-white mb-6 font-medium text-lg opacity-80">For project inquiries,<br/>please contact:</p>
                            <ClipBoard email={siteSetting.email} message={Message} animated={true}/>
                        </div>
                    </div>
                    <div className="w-full lg:w-7/12 ">
                        <div className="flex-wrap flex-row mb-16 flex">
                            <div className="lg:w-4/12 hidden w-1/2 sm:block">
                                <ul>
                                    <UsefullLink text="Construction Engineering" link="/services/Construction-Engineering" />
                                    <UsefullLink text="Structural Engineering" link="/services/Structural-Engineering" />
                                    <UsefullLink text="Architectural Engineering" link="/services/Architectural-Engineering" />
                                    <UsefullLink text="Interior Design" link="/services/Interior-Design" />
                                    <UsefullLink text="MEP Engineering" link="/services/MEP-Engineering" />
                                    <UsefullLink text="Project Management" link="/services/Project-Management" />
                                    <UsefullLink text="Architect Of Record (AOR)" link="/services/Architect-Of-Record-(AOR)" />
                                    <UsefullLink text="Villa Design" link="/services/Villa-Design" />
                                    <li className="mb-1.5"><a className="relative transition-all duration-300 ease-linear left-0 hover:left-2 py-2" target="_blank" href="https://www.abudhabiapprovals.ae/services/abu-dhabi-municipality-approval">
                                    Abu Dhabi Municipality Approval
                                    </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-1/2 lg:pl-8">
                                <ul>
                                    <UsefullLink text="Home"  link="/"/>
                                    <UsefullLink text="Our Expertise" link="/services" />
                                    <UsefullLink text="Our Projects" link="/projects" />
                                    <UsefullLink text="About Us" link="/about" />
                                    <UsefullLink text="Online Payment" link="/payment" />
                                    <UsefullLink text="Blogs &amp; News" link="/blog" />
                                    <UsefullLink text="Terms and Conditions" link="/terms-and-conditions" />
                                    <UsefullLink text="Privacy Policy" link="/privacy-policy" />
                                    <UsefullLink text="Join Us" link="/join-us" />
                                </ul>
                            </div>
                        </div>
                        <AddressSection branchLocations={branchLocations}/>  
                    </div>
                </div>
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto mt-12 px-8 ">
                    <div className="opacity-80 flex flex-row">
                        <div className="w-1/2 text-center lg:text-left flex items-end">
                            <Link href="/">
                                <div className="text-white-900">
                                    <Logo />
                                    <span className="sr-only">Logo</span>
                                </div>
                            </Link>
                            <span className="ml-6 hidden lg:inline"><a href="/">{siteSetting.siteName}</a> &copy; {new Date().getFullYear()}. All Rights Reserved</span>
                        </div>
                        <div className="w-1/2 text-center lg:text-right">
                            <ul className="flex mt-6 justify-end w-full">
                                <SocialLists/>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full text-center lg:hidden mt-6">
                        <span className="lg:ml-6"><a href="/">{siteSetting.siteName}</a> &copy; {new Date().getFullYear()}. All Rights Reserved</span>
                    </div>
                </div>
            </footer>
        </>
    )
}
