import { ArrowForward } from "@/icons/UtilIcons";

const SubmitButton = ({text,classList,icon,type,animateIcon, ...rest}) => {
    let btnClass = classList + (icon ? " pr-20" : " pr-8");
    return (
        <button type={type} {...rest} className={btnClass + " text-left tracking-widest inline-block text-sm py-5 pl-8 uppercase leading-4 relative group overflow-x-hidden hover:text-white"}>
            <span className="relative z-10">{text}</span>
            {
                icon &&
                <span className={(animateIcon ? "animate-left-right" : "") + " ml-8 absolute right-12 top-1/2 transform -translate-y-1/2 text-xl leading-4 group-hover:right-8 transition-all duration-300 custom-transition z-10"}>
                    <ArrowForward/>
                </span>
            }
            <span className="w-full h-0 absolute bottom-0 left-0 bg-green-900 custom-transition transition-all duration-300 group-hover:h-full pointer-events-none"></span>
        </button>
    )
}

SubmitButton.defaultProps = {
  classList: 'bg-gray-50 text-gray-900 ',
  text: 'Click here',
  icon: true,
  type: 'button',
  animateIcon:false,
}

export default SubmitButton
