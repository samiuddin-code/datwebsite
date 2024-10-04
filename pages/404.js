import Meta from '@/components/Meta';
import LinkButton from '@/components/ui/LinkButton';
import Styles from '@/components/css/404.module.scss';

const Custom400 = () => {
    return (
      <>
        <Meta title={"Error 404"}/>
        <section className="relative animate-to-top">
            <div className="flex flex-col relative h-screen items-center justify-center">
                <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8">
                    <div className="text-center">
                        <h1 className={Styles.hero__title + " w-full text-6xl sm:text-9xl leading-7 sm:leading-normal font-bold relative z-10 mb-12 sm:mb-0"}>Error 404</h1>
                        <p className="mb-12 max-w-lg mx-auto font-medium text-lg text-gray-700 px-8">Ooops! We forgot to architect this page. Meanwhile you can explore our other pages in website.</p>
                        <LinkButton text="Go home" link="/"/>
                    </div>
                </div>
            </div>
        </section>
      </>
    )
}
export default Custom400
