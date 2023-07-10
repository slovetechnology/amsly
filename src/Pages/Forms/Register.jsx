import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/General/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import man from '../../Assets/Images/man.png'
import { FaArrowRight } from 'react-icons/fa'
import { ToastAlert } from '../../Components/Utils/Utility'
import { ToastContainer } from 'react-toastify'
import { Api, NormalPostUrl } from '../../Components/Utils/Apis'
import Cookies from 'js-cookie'
import Loading from '../../Components/General/Loading'

const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {ref} = useParams()
    const [forms, setForms] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    })
    const [agree, setAgree] = useState(false)
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(ref) {
            localStorage.setItem('ref', ref)
        }
    }, [])
    const handleFirstValidation = async() => {
        if (!forms.firstname) return ToastAlert('firstname is required')
        if (!forms.lastname) return ToastAlert('lastname is required')
        if (!forms.email) return ToastAlert('email is required')
        if (!forms.phone) return ToastAlert('phone is required')
        if (!forms.username) return ToastAlert('username is required')
        if (!forms.password) return ToastAlert('password is required')
        if (!forms.confirm_password) return ToastAlert('confirm password is required')
        if (forms.confirm_password !== forms.password) return ToastAlert('password(s) do not match')
        if (!agree) return ToastAlert('You have to agree to our terms and conditions to complete your registration process')
        let upline;
        if(localStorage.getItem('ref')) {
            upline = localStorage.getItem('ref')
        }else {
            upline = ''
        }
        const data = {
            ...forms,
            upline: upline
        }
        setLoading(true)
        const res = await NormalPostUrl(Api.user.register_user, data)
        setLoading(false)
        if(res.status === 200) {
            Cookies.set('v-email', res.msg)
            localStorage.removeItem('ref')
            return navigate(`/verify_account`)
        }
        return ToastAlert(res.msg)
    }
    return (
        <div>
            {loading && <Loading /> }
            <Navbar />
            <div className="w-11/12 mb-16 py-10 mx-auto max-w-xl bg-white shadow-xl rounded-lg p-4">
                <form>
                    <div className="flex items-center mb-6 gap-4 border-b pb-3">
                        <img src={man} alt="" className="rounded-full w-14 object-cover" />
                        <div className="">
                            <div className="text-3xl text-indigo-600 drop-shadow-lg">Create Account</div>
                            <div className="text-zinc-600 text-sm lg:text-base">Create and activate your account within few clicks</div>
                        </div>
                    </div>
                    <div className={``}>

                        <div className="grid grid-cols-2 gap-5 mb-6">
                            <div className="">
                                <div className="uppercase">first name</div>
                                <input name="firstname" value={forms.firstname} onChange={handleForms} type="text" className="input" />
                            </div>
                            <div className="">
                                <div className="uppercase">last name</div>
                                <input name="lastname" value={forms.lastname} onChange={handleForms} type="text" className="input" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="uppercase">phone number</div>
                            <input name="phone" value={forms.phone} onChange={handleForms} type="number" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="uppercase">email address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="uppercase">username</div>
                            <input name="username" value={forms.username} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="uppercase">password</div>
                            <input name="password" value={forms.password} onChange={handleForms} type="password" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="uppercase">confirm password</div>
                            <input name="confirm_password" value={forms.confirm_password} onChange={handleForms} type="password" className="input" />
                        </div>
                        <div className="text-center mt-6">
                            <label>
                                <input value={agree} checked={agree} onChange={e => setAgree(e.target.checked)} type="checkbox" className="" />
                                <span className="ml-3">I agree to terms and conditions</span>
                            </label>
                        </div>
                        <div className="mt-6 w-11/12 mx-auto">
                            <button type="button" onClick={handleFirstValidation} className="bg-indigo-600 rounded-lg text-white capitalize py-4 w-full flex items-center shadow-xl justify-center gap-2">create account <FaArrowRight /> </button>
                        </div>
                    </div>
                    <fieldset className='border-t-2 mt-4'>
                        <legend className='uppercase text-center px-3'>or</legend>
                        <div className="text-center text-zinc-600 mt-3 capitalize"> <Link to='/login' className='text-indigo-600'>login</Link> existing account </div>
                    </fieldset>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register
