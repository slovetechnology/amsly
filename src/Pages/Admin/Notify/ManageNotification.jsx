import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Api } from '/src/Components/Utils/Apis'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { GetUrl } from '/src/Components/Utils/Apis'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmAirtimePurchase from '/src/Pages/User/Data/Compos/ConfirmAirtimePurchase'
import { PostUrl } from '/src/Components/Utils/Apis'
import Loading from '/src/Components/General/Loading'

const tableHeader = [
    "position",
    "message",
    "",
    "",
]
const ManageNotification = () => {
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(null)
    const [view, setView] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const FetchNotify = useCallback(async () => {
        setLoading(true)
        try {
            const res = await GetUrl(Api.notify.notify)
            if (res.status === 200) {
                setData(res.msg)
            }
        } catch (error) {
            ErrorAlert(`${error}`)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { FetchNotify() }, [FetchNotify])

    const OpenOptions = (id) => {
        setId(id)
        setView(!view)
    }

    const DeleteNotify = async () => {
        setLoading(true)
        try {
            const res = await PostUrl(Api.notify.delete_notify, { id: id })
            if (res.status === 200) {
                FetchNotify()
                setView(!view)
            }
        } catch (error) {
            ErrorAlert(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {loading && <Loading />}
            {view &&
                <ConfirmAirtimePurchase title="Are you sure you want to delete this notification!."
                    closeView={() => setView(!view)}
                    handleSubmission={DeleteNotify}
                />}
            <div className="">
                <div className="w-fit ml-auto mb-10">
                    <Link to={`/auth/admin/manage_notification/new`} className="bg-blue-600 text-white rounded-lg py-2 px-5 capitalize">add</Link>
                </div>
                <div className="">
                    <table className="w-full table-auto border bg-white">
                        <thead>
                            <tr className='border bg-slate-800 text-white'>
                                {tableHeader.map((item, i) => (
                                    <td key={i} className='border p-2'>{item}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr key={i}>
                                    <td className='p-2 border'>{item.tag}</td>
                                    <td className='p-2 border'>{item.message}</td>
                                    <td onClick={() => navigate(`/auth/admin/manage_notification/${item.id}/edit`)} className='p-2 border cursor-pointer'>Edit</td>
                                    <td onClick={() => OpenOptions(item.id)} className='p-2 cursor-pointer border'>Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ManageNotification