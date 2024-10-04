import React from 'react'
import Moment from 'react-moment'

const PaymentCard = ({formData}) => {
    return (
        <div className="bg-green-50 p-8 lg:sticky lg:top-20 lg:self-start">
            <div className="relative">
                <h3 className="uppercase mb-1 font-semibold">
                    Invoice : {formData.invoiceNumber}
                </h3>
                <span className="text-gray-500">
                    <Moment format="DD/MM/YYYY">{new Date()}</Moment>    
                </span>
            </div>
            {
                ((formData.firstName && formData.lastName) || (formData.issuedBy) || (formData.email) || (formData.projectTitle)) &&
                <span className="border-b my-4 border-gray-100 block"/> 
            }
            {
                (formData.firstName && formData.lastName) &&
                <h2 className="text-2xl mb-6 font-semibold">
                    {formData.firstName + " " + formData.lastName}
                </h2>
            }
            {
                (formData.issuedBy) &&
                <p className="mb-3">
                    <span className="mr-4 font-medium w-28 inline-block">Issued By</span>
                    {formData.issuedBy}
                </p>
            }
            {
                (formData.amount) &&
                <p className="mb-3">
                    <span className="mr-4 font-medium w-28 inline-block">Amount</span>
                    {formData.amount} AED
                </p>
            }
            {
                (formData.email) &&
                <p className="mb-3">
                    <span className="mr-4 font-medium w-28 inline-block">Email</span>
                    {formData.email}
                </p>
            }
            {
                (formData.projectTitle) &&
                <p className="mb-3">
                    <span className="mr-4 font-medium w-28 inline-block">Project Title</span>
                    {formData.projectTitle}
                </p>
            }
        </div>
    )
}

export default PaymentCard
