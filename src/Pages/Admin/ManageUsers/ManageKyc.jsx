import { Api, GetUrl } from '/src/Components/Utils/Apis'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import React, { useCallback, useEffect, useState } from 'react'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import spins from '/src/Assets/Images/spins.gif'
import moment from 'moment'
import UpdateKycModal from '/src/Components/Admin/UpdateKycModal'
import Loading from '/src/Components/General/Loading'
import { PostUrl } from '/src/Components/Utils/Apis'
import { ToastAlert } from '/src/Components/Utils/Utility'

const tableHeader = [
    "fullname",
    "email",
    "KYC Status",
    "kycnote",
    "Mode of verification",
    "Gender",
    "marital status",
    "date of birth",
    "phone number",
    "Role",
    "username",
    "Registration Date",
    "",
]
const ManageKyc = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(false)
    const [single, setSingle] = useState({})
    const [loads, setLoads] = useState(false)

    const FetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const res = await GetUrl(Api.user.all_users)
            if (res.status === 200) return setData(res.msg)
        } catch (error) {
            ErrorAlert(`${error}`)
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => { FetchUsers() }, [FetchUsers])

    const handleView = item => {
        setView(!view)
        setSingle(item)
    }
    const ProceedToUpdate = async (values) => {
        setLoads(true)
        try {
            const res = values.tag === 'delete' ? await PostUrl(Api.user.delete_kyc, values) : await PostUrl(Api.user.update_kyc, values)
            if(res.status === 200) {
                ToastAlert(`${res.msg}`)
                FetchUsers()
                setView(!view)
            }else {
                ErrorAlert(`${res.msg}`)
            }
        } catch (error) {
            return ErrorAlert(`${error}`)
        }finally {
            setLoads(false)
        }
    }
    return (
        <AdminLayout>
          {loads &&  <Loading />}
           {view && <UpdateKycModal data={single} closeView={() => setView(!view)} ProceedToUpdate={ProceedToUpdate} />}
            <div className="overflow-x-auto scrollsdown">
                <div className="w-fit">
                    {loading && <div className="w-fit mx-auto"> <img src={spins} alt="" className="w-20" /> </div>}
                    {!loading && <table className="w-full table-auto border bg-white">
                        <thead>
                            <tr className='border bg-slate-800 text-white'>
                                {tableHeader.map((item, i) => (
                                    <td key={i} className='border p-2 text-sm capitalize'>{item}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                item.role !== 'admin' && <tr key={i}>
                                    <td className='p-2 border text-sm'>{item.firstname} {item.lastname}</td>
                                    <td className='p-2 border text-sm'>{item.email}</td>
                                    <td className='p-2 border text-sm'>{item.verified === 'declined' ? `Declined` : item.verified === 'verified' ? `Verified` : 'Pending'}</td>
                                    <td className='p-2 border text-sm'>{item.kycnote?.slice(0, 10) || `Nil`}</td>
                                    <td className='p-2 border text-sm'>{item.kyc || `Nil`}</td>
                                    <td className='p-2 border text-sm'>{item.gender || `Nil`}</td>
                                    <td className='p-2 border text-sm'>{item.maritalStatus || `Nil`}</td>
                                    <td className='p-2 border text-sm'>{item.dob || `Nil`}</td>
                                    <td className='p-2 border text-sm'>{item.phone || `Nil`}</td>
                                    <td className='p-2 border text-sm uppercase'>{item.role || `Nil`}</td>
                                    <td className='p-2 border text-sm'>{item.username || `Nil`}</td>
                                    <td className='p-2 border text-sm'>{moment(item.createdAt).format('DD-MM-YYYY') || `Nil`}</td>
                                    <td className='p-2 border text-sm'> <button onClick={() => handleView(item)} className="bg-slate-300 text-xs font-semibold py-2 px-3 rounded-md">Manage</button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </div>
        </AdminLayout>
    )
}

export default ManageKyc