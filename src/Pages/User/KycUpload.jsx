import React, { useRef, useState } from 'react'
import UserLayout from '../../Components/User/UserLayout'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { Api, PostUrl } from '/src/Components/Utils/Apis'
import { SwalAlert } from '/src/Components/Utils/Utility'

const KycUpload = () => {
    const refidfront = useRef()
    const refidback = useRef()
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        gender: '', maritalStatus: '', kyc: '', dob: '', address: '', kycnote: ''
    })
    const [images, setImages] = useState({
        idfront: null,
        idback: null
    })
    const handleFront = e => {
        setImages({
            ...images,
            idfront: e.target.files[0]
        })
    }
    const handleBack = e => {
        setImages({
            ...images,
            idback: e.target.files[0]
        })
    }
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const removeFront = () => {
        setImages({
            ...images,
            idfront: null
        })
        refidfront.current.value = null
    }

    const removeBack = () => {
        setImages({
            ...images,
            idback: null
        })
        refidback.current.value = null
    }

    const handleSubmit = async () => {
        console.log(images)
        if (!forms.gender) return ErrorAlert(`gender field is required`)
        if (!forms.maritalStatus) return ErrorAlert(`marital status field is required`)
        if (!forms.dob) return ErrorAlert(`date of birth field is required`)
        if (!forms.address) return ErrorAlert(`residential address field is required`)
        if (!forms.kyc) return ErrorAlert(`mode of verification field is required`)
        if (forms.kyc === 'nin' && !forms.kycnote) return ErrorAlert(`your NIN field is required`)
        const data = new FormData()
        data.append('idfront', images.idfront)
        data.append('idback', images.idback)
        data.append('gender', forms.gender)
        data.append('address', forms.address)
        data.append('dob', forms.dob)
        data.append('kycnote', forms.kycnote)
        data.append('kyc', forms.kyc)
        data.append('maritalStatus', forms.maritalStatus)
        setLoading(true)
        try {
            // perform submission
            const res = await PostUrl(Api.user.upload_kyc, data)
            if(res.status === 200) {
                SwalAlert('Request Sent', `${res.msg}`, 'success')
            }else {
                SwalAlert('Request Failed', `${res.msg}`, 'error')
            }
        } catch (error) {
            ErrorAlert(`${error}`)
        }finally {
            setLoading(false)
        }
    }
    return (
        <UserLayout pagetitle="KYC Upload">
            <div className="grid grid-cols-1 mb-16 mt-8 px-3 lg:grid-cols-2 gap-7">
                <div className="bg-white rounded-lg h-fit shadow-xl">
                    <div className="border-b p-3">Official Information</div>
                    <div className="p-4">
                        <div className="mb-6">
                            <div className="uppercase">Mode of Identification</div>
                            <select name="kyc" value={forms.kyc} onChange={handleForms} className="input">
                                <option>--Select--</option>
                                <option value="nin">NIN</option>
                                <option value="voters card">Voters Card</option>
                                <option value="driver\'s lincense">Driver's Lincense</option>
                            </select>
                        </div>
                        {forms.kyc === 'nin' && <>
                            <div className="mb-6">
                                <div className="">Provide NIN number</div>
                                <input type="text" name="kycnote" value={forms.kycnote} onChange={handleForms} className="input" />
                            </div>
                        </>}
                        {forms.kyc !== 'nin' && <div className="">
                            <div className="mb-6">
                                <div className="uppercase">Upload Document (Front)</div>
                                <div className="flex items-center gap-8">
                                    <input type="file" ref={refidfront} onChange={handleFront} className="input" />
                                    {images.idfront && <button onClick={removeFront} className="cursor-pointer text-red-600 text-xl"> <FaTimes /> </button>}
                                </div>
                            </div>
                            <div className="">
                                <div className="uppercase">Upload Document (Back)</div>
                                <div className="flex items-center gap-8">
                                    <input type="file" ref={refidback} onChange={handleBack} className="input" />
                                    {images.idback && <button onClick={removeBack} className="cursor-pointer text-red-600 text-xl"> <FaTimes /> </button>}
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="">
                    <div className="bg-white rounded-lg h-fit shadow-lg">
                        <div className="border-b p-3">Personal Information</div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="">
                                    <div className="uppercase">Gender</div>
                                    <select name="gender" value={forms.gender} onChange={handleForms} className="input">
                                        <option>--Select Gender--</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="">
                                    <div className="uppercase">Relationship Status</div>
                                    <select name="maritalStatus" value={forms.maritalStatus} onChange={handleForms} className="input">
                                        <option>--Select--</option>
                                        <option value="married">Married</option>
                                        <option value="single">Single</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="perfer not to say">prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6">
                                <div className="uppercase">Date of Birth</div>
                                <input type="date" name="dob" value={forms.dob} onChange={handleForms} className="input" />
                            </div>
                            <div className="">
                                <div className="uppercase">residential Address</div>
                                <textarea cols="30" rows="4" name="address" value={forms.address} onChange={handleForms} className="input"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-7 w-fit ml-auto">
                        <button onClick={handleSubmit} className="bg-indigo-600 shadow-xl rounded-full py-3 px-6 text-white capitalize font-semibold">submit</button>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default KycUpload
