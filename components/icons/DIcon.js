const DIcon = ({classList,color,height,width}) => {
    return (
        <svg width={width} height={height} className={classList} viewBox="0 0 409 393" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M241.108 1H341.96L582.067 392H499.725L291.62 53.3521L83.3423 392H1L241.108 1Z" stroke="#F7F3F1" strokeOpacity="0.2"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M138.189 391.548L292.494 142.446L445.07 391.548H138.189ZM230.91 344.665H352.694L292.148 242.93L230.91 344.665Z" stroke="#F7F3F1" strokeOpacity="0.2"/>
        </svg>
    )
}

DIcon.defaultProps = {
    color:'#1C2321',
    width:"384",
    height:"438"
}

export default DIcon
