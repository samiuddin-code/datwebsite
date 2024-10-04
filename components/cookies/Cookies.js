import styles from "./style.module.scss";
import SubmitButton from '@/ui/SubmitButton';
import CookieIcon from '@/icons/Cookie';
import SectionHeader from '@/ui/SectionHeader'
import Link from "next/link";
import { useEffect, useState } from "react";
const Cookies = () => {
    const [cookieAccepted, setCookieAccepted] = useState(true);

    const handleAccept = () => {
        setCookieAccepted(true);
        let cookieData = {
            accepted: true,
            date: new Date()
        }
        localStorage.setItem("COOKIE_ACCEPTANCE", JSON.stringify(cookieData));
    }

    useEffect(() => {
        let localData = localStorage.getItem("COOKIE_ACCEPTANCE");
        try{
            if(localData){
                let parsedData = JSON.parse(localData);
                let acceptedDate = new Date(parsedData.date);
                let last30Day = new Date();
                last30Day.setDate(last30Day.getDate() - 30);
                if(!parsedData.accepted || acceptedDate < last30Day){
                    setCookieAccepted(false);
                }
            }else{
                setCookieAccepted(false);
            }
        }catch(err){
            console.log(err);
            setCookieAccepted(false);
        }
    }, [])

    return <div className={styles.container + " " + ((!cookieAccepted) ? styles.visible : "")}>
        <div>
            <CookieIcon />
            <SectionHeader classList="w-full mt-4" animate={false} heading="Your Privacy" headingLevel={"h4"} />
            <p className="text-sm">
                We use cookies to operate this website, improve usability, personalize your experience, and improve our marketing. Your privacy is important to us, and we will never sell your data. <Link href="/privacy-policy"><span className={styles.cookiePolicyLink}>Privacy Policy.</span></Link>
            </p>
            <div className="sm:flex wrap sm:no-wrap gap-5 mb-5 mt-5">
                <SubmitButton onClick={handleAccept} classList={"bg-gray-50 w-[100%] text-center pl-1 pr-1 mt-2 " + styles.button} text="Accept all cookies" icon={false} />
                <SubmitButton onClick={handleAccept} classList={"bg-gray-50 w-[100%] text-center pl-1 pr-1 mt-2 " + styles.button} text="Necessary cookies only" icon={false} />
            </div>
        </div>
    </div>
}

export default Cookies;