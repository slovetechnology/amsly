import React from 'react'
import UserLayout from '../../Components/User/UserLayout'
import { FaCheck, FaTimes } from 'react-icons/fa'

const KycUpload = () => {
    return (
        <UserLayout pagetitle="KYC Upload">
            <div className="grid grid-cols-1 mb-16 mt-8 px-3 lg:grid-cols-2 gap-7">
                <div className="bg-white rounded-lg h-fit shadow-xl">
                    <div className="border-b p-3">Official Information</div>
                    <div className="p-4">
                        <div className="mb-6">
                            <div className="uppercase">Mode of Identification</div>
                            <select name="" id="" className="input">
                                <option>--Select--</option>
                                <option value="nin">NIN</option>
                                <option value="voters card">Voters Card</option>
                                <option value="driver\'s lincense">Driver's Lincense</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <div className="uppercase">Upload Document (Front)</div>
                            <div className="flex items-center gap-8">
                                <input type="file" name="" id="" className="input" />
                                <div className="cursor-pointer text-green-600 text-xl"> <FaCheck /> </div>
                                <div className="cursor-pointer text-red-600 text-xl"> <FaTimes /> </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="uppercase">Upload Document (Back)</div>
                            <div className="flex items-center gap-8">
                                <input type="file" name="" id="" className="input" />
                                <div className="cursor-pointer text-green-600 text-xl"> <FaCheck /> </div>
                                <div className="cursor-pointer text-red-600 text-xl"> <FaTimes /> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="bg-white rounded-lg h-fit shadow-lg">
                        <div className="border-b p-3">Personal Information</div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="">
                                    <div className="uppercase">Gender</div>
                                    <select name="" id="" className="input">
                                        <option>--Select Gender--</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="">
                                    <div className="uppercase">Relationship Status</div>
                                    <select name="" id="" className="input">
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
                                <input type="date" name="" className="input" />
                            </div>
                            <div className="">
                                <div className="uppercase">residential Address</div>
                                <textarea cols="30" rows="4" className="input"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-7 w-fit ml-auto">
                        <button className="bg-indigo-600 shadow-xl rounded-full py-3 px-6 text-white capitalize font-semibold">submit</button>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default KycUpload
