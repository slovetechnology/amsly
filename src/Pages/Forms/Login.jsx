import React, { useState } from 'react'
import Navbar from '../../Components/General/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import man from '../../Assets/Images/man.png'
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa'
import { SwalAlert, ToastAlert } from '../../Components/Utils/Utility'
import { Api, NormalPostUrl } from '../../Components/Utils/Apis'
import Cookies from 'js-cookie'
import { Roles } from '../../Components/Utils/Roles'
import { decodeToken } from 'react-jwt'
import { ToastContainer } from 'react-toastify'
import Loading from '../../Components/General/Loading'

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [screen, setScreen] = useState(1)
    const [isPass, setIsPass] = useState(false)
    const Icon = !isPass ? FaEyeSlash : FaEye
    const [forms, setForms] = useState({
        email: '',
        password: ''
    })
    const [codes, setCodes] = useState({ code0: '', code1: '', code2: '', code3: '', code4: '' })

    const codeChangeHandler = (event) => {
        const element = event.target;
        const nextSibling = element.nextElementSibling;
        nextSibling ? nextSibling.focus() : element.blur();
        setCodes({ ...codes, [element.name]: element.value })
    };

    const codeInputFields = new Array(5)
        .fill(0)
        .map((item, index) => (
            <input
                autoComplete='off'
                autoFocus="on"
                type='password'
                name={`code${index}`}
                key={index}
                placeholder="*"
                className="outline-none w-full border rounded-lg p-2.5 text-xl text-center"
                onChange={(event) => codeChangeHandler(event)}
                maxLength={1}
            />
        ));


    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async () => {
        if (!forms.email) return ToastAlert('Email Address is required')
        if (!forms.password) return ToastAlert('password is required')
        const data = {
            email: forms.email,
            password: forms.password
        }
        setLoading(true)
        const res = await NormalPostUrl(Api.user.user_login, data)
        setLoading(false)
        if (res.status === 200) {
            Cookies.set('session', res.token)
            const decoded = decodeToken(res.token)
            const findUser = Roles.find(item => item.role === decoded.role)
            ToastAlert(res.msg)
            setTimeout(() => {
                return window.location = `${findUser.url}`
            }, 2000);
        }
        else if (res.status === 201) {
            return setScreen(2)
        }
        else if (res.status === 403) {
return SwalAlert('Request Failed', res.msg, 'info')
        }
        else {
            return ToastAlert(res.msg)
        }
    }
    const handleAdminAccess = async () => {
        if (!codes.code0 || !codes.code1 || !codes.code2 || !codes.code3 || !codes.code4) return ToastAlert('Enter a valid access pin')
        const data = {
            pin: `${codes.code0}${codes.code1}${codes.code2}${codes.code3}${codes.code4}`,
            email: forms.email
        }
        setLoading(true)
        const res = await NormalPostUrl(Api.user.confirm_access, data)
        setLoading(false)
        if (res.status === 200) {
            Cookies.set('session', res.token)
            const decoded = decodeToken(res.token)
            const findUser = Roles.find(item => item.role === decoded.role)
            ToastAlert(res.msg)
            setTimeout(() => {
                return navigate(`${findUser.url}`)
            }, 2000);
        }
        else if (res.status === 201) {
            setScreen(2)
        }
        else {
            return ToastAlert(res.msg)
        }
    }
    return (
        <div>
            {loading && <Loading />}
            <Navbar />
            <div className="w-11/12 mb-16 py-10 mx-auto max-w-xl bg-white shadow-xl rounded-lg p-4">
                <form className={`${screen === 1 ? '' : 'hidden'}`}>
                    <div className="flex items-center mb-6 gap-4 border-b pb-3">
                        <img src={man} alt="" className="rounded-full w-14 object-cover" />
                        <div className="">
                            <div className="text-3xl text-indigo-600 drop-shadow-lg">Login Account</div>
                            <div className="text-zinc-600 text-sm lg:text-base">Kindly sign-in to your account to start your daily adventures</div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-6">
                            <div className="uppercase">Email address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="text-right"> <Link to='/forgot_password' className='text-indigo-600'>Forgot Password?</Link> </div>
                        <div className="mb-6 relative">
                            <div onClick={() => setIsPass(!isPass)} className="absolute top-8 right-4 cursor-pointer text-2xl text-slate-500"> <Icon /> </div>
                            <div className="uppercase">password</div>
                            <input name="password" value={forms.password} onChange={handleForms} type={isPass ? 'text' : 'password'} className="input" />
                        </div>
                        <div className="mt-6 w-11/12 mx-auto">
                            <button type="button" onClick={handleSubmit} className="bg-indigo-600 rounded-lg text-white capitalize py-4 w-full flex items-center shadow-xl justify-center gap-2">login account <FaArrowRight /> </button>
                        </div>
                    </div>
                    <fieldset className='border-t-2 mt-4'>
                        <legend className='uppercase text-center px-3'>or</legend>
                        <div className="text-center text-zinc-600 mt-3 capitalize"> <Link to='/register' className='text-indigo-600'>Create</Link> an account </div>
                    </fieldset>
                </form>
                <form className={`${screen === 2 ? '' : 'hidden'}`}>
                    <div className="flex items-center mb-6 gap-4 border-b pb-3">
                        <img src={man} alt="" className="rounded-full w-14 object-cover" />
                        <div className="">
                            <div className="text-3xl text-indigo-600 drop-shadow-lg">Confirm Admin Access</div>
                            <div className="text-zinc-600 text-sm lg:text-base">Kindly enter your administrative PIN to access your portal</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 w-11/12 mx-auto gap-3">
                        {codeInputFields}
                    </div>
                    <div className="mt-6 w-11/12 mx-auto">
                        <button type="button" onClick={handleAdminAccess} className="bg-indigo-600 rounded-lg text-white capitalize py-4 w-full flex items-center shadow-xl justify-center gap-2">confirm access <FaArrowRight /> </button>
                    </div>
                    <fieldset className='border-t-2 mt-4'>
                        <legend className='uppercase text-center px-3'>or</legend>
                        <div className="text-center text-zinc-600 mt-3 capitalize"> <Link to='/register' className='text-indigo-600'>Create</Link> an account </div>
                    </fieldset>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
