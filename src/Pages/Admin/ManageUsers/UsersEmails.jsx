import React from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { Api, GetUrl } from '../../../Components/Utils/Apis'
import { useQuery } from 'react-query'

const UsersEmails = () => {
    const fetchuserEmails = async () => {
        const res = await GetUrl(Api.user.all_emails)
        if (res.status === 200) {
            return res.msg
        }
    }
    const { data, isLoading } = useQuery('admin-fetch-all-emails', fetchuserEmails)
    return (
        <AdminLayout>
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="text-xl text-zinc-600 font-semibold uppercase">all users <span className="text-red-600"> Email addresses</span> </div>
                    <div className="mt-10">
                        {isLoading && <div className="text-center">Loading...</div> }
                        <div className="overflow-y-auto h-fit max-h-[32rem] p-3 break-words border rounded-lg">
                            {!isLoading && data?.length > 0 && data.map((item, i) => (
                                <span key={i}>{item},</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UsersEmails