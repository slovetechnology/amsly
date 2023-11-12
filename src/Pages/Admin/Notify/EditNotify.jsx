import { useParams } from 'react-router-dom'
import NotifyForm from './NotifyForm'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import React, { useEffect, useState } from 'react'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { Api, GetUrl } from '/src/Components/Utils/Apis'

const EditNotify = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    useEffect(() => {
        const FetchNotify = async () => {
            setLoading(true)
            try {
                const res = await GetUrl(`${Api.notify.notify}/${id}`)
                if(res.status === 200) return setData(res.msg)
            } catch (error) {
                ErrorAlert(`${error}`)
            }finally {
                setLoading(false)
            }
        }
        FetchNotify()
    }, [])
    return (
        <AdminLayout>
            <div className="">
               {!loading && <NotifyForm notify={data} />}
            </div>
        </AdminLayout>
    )
}

export default EditNotify