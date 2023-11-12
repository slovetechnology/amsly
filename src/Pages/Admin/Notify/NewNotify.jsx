
import NotifyForm from './NotifyForm'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import React from 'react'

const NewNotify = () => {
  return (
    <AdminLayout>
        <div className="">
            <div className="">
                <NotifyForm notify={null} />
            </div>
        </div>
    </AdminLayout>
  )
}

export default NewNotify