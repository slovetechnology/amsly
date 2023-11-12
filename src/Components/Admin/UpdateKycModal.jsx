import { ErrorAlert } from '/src/Components/Utils/Utility'
import { imageUrl } from '/src/Components/Utils/Apis'
import ModalLayout from '/src/Components/Utils/ModalLayout'
import React, { useState } from 'react'

const UpdateKycModal = ({ closeView, data, ProceedToUpdate }) => {
    const [view, setView] = useState(1)
    const [tag, setTag] = useState('')
    const [forms, setForms] = useState({
        note: '', userid: '', tag: ''
    })
    const handleForms = e => {
        setForms({
            ...forms, 
            [e.target.name]: e.target.value
        })
    }

    const handleView = tag => {
        setView(2)
        setTag(tag)
    }

    const ProceedUpdate = () => {
        if(tag === 'declined' && !forms.note) return ErrorAlert(`Provide a reason for declining this document`)
        if(tag === 'verified') {
            setForms({
                ...forms,
                note: ''
            })
        }
        let formNote = {}
        if(tag === 'declined') {formNote = {note: forms.note}}else {formNote = {}}
        ProceedToUpdate({userid: data.id, ...formNote, tag})
    }
    return (
        <ModalLayout closeView={closeView}>
            {view === 1 && <div className="w-11/12 mx-auto">
                <div className="text-center font-semibold mb-5 text-xl pt-5">Kyc Information</div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">Fullname</div>
                    <div className="text-sm text-right">{data.firstname} {data.lastname}</div>
                </div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">Phone number</div>
                    <div className="text-sm text-right">{data.phone}</div>
                </div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">address</div>
                    <div className="text-sm text-right">{data.address}</div>
                </div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">date of birth</div>
                    <div className="text-sm text-right">{data.dob}</div>
                </div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">gender</div>
                    <div className="text-sm text-right">{data.gender}</div>
                </div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">email address</div>
                    <div className="text-sm text-right">{data.email}</div>
                </div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">Mode of verification</div>
                    <div className="text-sm text-right">{data.kyc}</div>
                </div>
                {data.kyc === 'nin' && <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">kyc details</div>
                    <div className="text-sm text-right">{data.kycnote}</div>
                </div>}
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">current level</div>
                    <div className="text-sm text-right">{data.level?.title}</div>
                </div>
                <div className="grid grid-cols-2 py-1">
                    <div className="text-sm">KYC Status</div>
                    <div className="text-sm text-right">{data.verified === 'verified' ? <div className='text-xs bg-green-400 py-2 px-3 rounded-md w-fit ml-auto capitalize'>verified</div> : data.verified === 'declined' ? <div className='text-xs bg-red-400 py-2 px-3 rounded-md w-fit ml-auto capitalize'>declined</div> : <div className='text-xs bg-slate-400 py-2 px-3 rounded-md w-fit ml-auto capitalize'>pending</div>}</div>
                </div>
               {data.kyc !== 'nin' && <div className="">
                    <div className="font-semibold border-t">View Attachments</div>
                    {data.idfront && <div className="w-11/12 mx-auto">
                        <div className="mb-1 text-sm mt-4">ID Card Front Cover</div>
                        <img src={`${imageUrl}/documents/${data.idfront }`} alt="" className="w-full h-auto max-h-[10rem] object-contain" />
                    </div>}
                    {data.idback && <div className="w-11/12 mx-auto">
                        <div className="mb-1 text-sm mt-4">ID Card Back Cover</div>
                        <img src={`${imageUrl}/documents/${data.idback }`} alt="" className="w-full h-auto max-h-[10rem] object-contain" />
                    </div>}
                </div>}
               {!['verified', 'declined'].includes(data.verified) && <div className="flex items-center justify-end gap-14 mb-6 mt-3">
                    <button onClick={() => handleView('declined')} className="bg-red-500 py-2 px-3 rounded-lg capitalize text-white">declined</button>
                    <button onClick={() => handleView('verified')} className="bg-teal-500 py-2 px-3 rounded-lg capitalize text-white">verify</button>
                </div>}
               {data.verified === 'declined' && <div className="w-fit ml-auto mt-6 mb-3">
                    <button onClick={() => handleView('delete')} className="bg-red-500 py-2 px-3 rounded-lg capitalize text-white">delete</button>
                </div>}
            </div>}
            {view === 2 && <div className='w-11/12 mx-auto'>
                <div className="text-center pt-3 mb-4">Are you sure you want to <span className={`${tag === 'verified' ? 'text-teal-500' : 'text-red-500'}`}>{tag}</span> this document?.</div>
               {tag === 'declined' && <div className="mb-4">
                    <div className="">Reason for decling this document</div>
                    <textarea name="note" onChange={handleForms} value={forms.note} cols="30" rows="5" placeholder='Reason' className="input"></textarea>
                </div>}
                {tag === 'delete' && <div className="bg-red-100 text-red-900 p-2 text-sm">When this is deleted custom can be able to submit another kyc document for a fresh verification.</div> }
                <div className="mt-10 mb-5">
                    <div className="flex items-center justify-between">
                        <button onClick={() => setView(1)} className="bg-slate-500 py-2 px-3 rounded-lg capitalize text-white">cancel</button>
                        <button onClick={ProceedUpdate} className="bg-teal-500 py-2 px-3 rounded-lg capitalize text-white">proceed</button>
                    </div>
                </div>
            </div>}
        </ModalLayout>
    )
}

export default UpdateKycModal