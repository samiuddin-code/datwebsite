const SectionHeader = ({span,heading,headingLevel,classList,animate}) => {
    let headingHtml = <h6 className="font-semibold mb-6 text-3xl capitalize md:text-4xl ">{heading}</h6>;
    switch (headingLevel) {
        case 'h1':
            headingHtml = <h1 className="font-semibold mb-6 text-3xl capitalize md:text-4xl ">{heading}</h1>
            break;
        case 'h2':
            headingHtml = <h2 className="font-semibold mb-6 text-3xl capitalize md:text-4xl ">{heading}</h2>
            break;
        case 'h3':
            headingHtml = <h3 className="font-semibold mb-6 text-3xl capitalize md:text-4xl ">{heading}</h3>
            break;
        case 'h4':
            headingHtml = <h4 className="font-semibold text-xl capitalize md:text-2xl ">{heading}</h4>
            break;
        case 'h5':
            headingHtml = <h5 className="font-semibold mb-6 text-3xl capitalize md:text-4xl ">{heading}</h5>
            break;
        default:
            break
    }
    return (
        <div className={(animate ? "interactive-element top " : "") + classList}>
            {
                span &&
                <span className="font-bold uppercase block mb-2 text-sm tracking-widest">{span}</span>
            }
            {headingHtml}
        </div>
    )
}

SectionHeader.defaultProps = {
    animate: true,
    heading: "Some heading text",
    classList: "mb-8 lg:mb-10 w-full",
    headingLevel:'h2'
}

export default SectionHeader
