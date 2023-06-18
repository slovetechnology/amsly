import React, { useState } from 'react'
import Navbar from '../../Components/General/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import man from '../../Assets/Images/man.png'
import { FaArrowRight } from 'react-icons/fa'
import { ToastAlert } from '../../Components/Utils/Utility'
import { ToastContainer } from 'react-toastify'
import { Api, NormalPostUrl } from '../../Components/Utils/Apis'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import { Roles } from '../../Components/Utils/Roles'
import Loading from '../../Components/General/Loading'

const VerifySignup = () => {
    const [codes, setCodes] = useState({ code0: '', code1: '', code2: '', code3: '', code4: '' })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

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


    const handleSecondValidation = async () => {
        if (!codes.code0 || !codes.code1 || !codes.code2 || !codes.code3 || !codes.code4) return ToastAlert('Enter a valid account verification code')

        const data = {
            code: `${codes.code0}${codes.code1}${codes.code2}${codes.code3}${codes.code4}`
        }

        setLoading(true)
        const res = await NormalPostUrl(Api.user.verify_signup_otp, data)
        setLoading(false)
        if (res.status === 200) {
            Cookies.set('session', res.token)
            const decoded = decodeToken(res.token)
            const findUser = Roles.find(item => item.role === decoded.role)
            Cookies.remove('v-email')
            ToastAlert(res.msg)
            window.location = `${findUser.url}`
        } else {
            return ToastAlert(res.msg)
        }
    }

    const ResendCode = async () => {
        const data = {
            email: Cookies.get('v-email')
        }
        setLoading(true)
        const res = await NormalPostUrl(Api.user.resend_verify_otp, data)
        setLoading(false)
        if(res.status === 200) {
            ToastAlert(res.msg)
        }else {
            ToastAlert(res.msg)
        }
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
                            <div className="text-3xl text-indigo-600 drop-shadow-lg">Verify Account</div>
                            <div className="text-zinc-600 text-sm lg:text-base">Create and activate your account within few clicks</div>
                        </div>
                    </div>
                    <div className={``}>
                        <div className="mb-10">
                            <div className="text-slate-600 mb-4">Enter the Account authentication code sent to your email address </div>
                            <div className="grid grid-cols-5 gap-3">
                                {codeInputFields}
                            </div>
                            <div className="text-zinc-600 flex flex-row items-center gap-2 mt-5">Didn't recieve any code? <div className="text-indigo-600 cursor-pointer" onClick={ResendCode}>resend Code</div> </div>
                        </div>
                        <div className="mt-6 w-11/12 mx-auto">
                            <button type="button" onClick={handleSecondValidation} className="bg-indigo-600 shadow-xl rounded-lg text-white capitalize py-4 w-full flex items-center justify-center gap-2">verify account <FaArrowRight /> </button>
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

export default VerifySignup
