import React from 'react'
import ModalLayout from '../Utils/ModalLayout'
import { useSelector } from 'react-redux'
import { Api, PostUrl } from '../Utils/Apis'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Logout = ({ closeView }) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.data)
    const handlwLogout = async () => {
        const res = await PostUrl(Api.user.user_logout)
        if (res.status === 200) {
            Cookies.set('session', '')
            navigate('/login')
        }
    }
    return (
        <ModalLayout closeView={closeView}>
            <div className="p-4">
                <div className="text-center"> Hi {user.firstname}, Are you sure you want to <span className="text-red-700">logout?</span> </div>
                <div className="mt-10 w-10/12 mx-auto">
                    <button onClick={handlwLogout} className="bg-red-700 text-white rounded-lg py-3 w-full capitalize">proceed action</button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default Logout