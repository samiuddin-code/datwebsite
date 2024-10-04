import { trimSpaces } from "@/helpers/helpers"

const AddressSection = ({branchLocations}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-24">
            {
                branchLocations.map(item => (
                    <div key={item.title} className="mb-8">
                        <address className="not-italic font-bold">
                            <span className="block mb-2 font-normal">{item.title}</span>
                            <a title={item.contactText} href={`tel:${trimSpaces(item.contactNumber)}`} target="_blank" rel="noopener noreferer" className="font-bold block mb-2 ">{item.contactNumber}</a>
                            <a href={item.mapLocation} target="_blank" rel="noopener noreferer" className="leading-4 block">{item.address}</a>
                        </address>
                    </div>
                ))
            }
        </div>
    )
}

export default AddressSection
