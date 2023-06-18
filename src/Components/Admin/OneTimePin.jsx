import React, { useState } from 'react'
import ModalLayout from '../Utils/ModalLayout'
import { ToastAlert } from '../Utils/Utility'
import { Api, PostUrl } from '../Utils/Apis'
import { useDispatch } from 'react-redux'
import { dispatchUser } from '../../app/reducer'

const OneTimePin = () => {
    const [view, setView] = useState(false)
    const dispatch = useDispatch()
    const [screen, setScreen] = useState(1)
    const [codes, setCodes] = useState({ code0: '', code1: '', code2: '', code3: '', code4: '' })
    const [coded, setCoded] = useState({ code0: '', code1: '', code2: '', code3: '', code4: '' })

    const codeChangeHandler = (event) => {
        const element = event.target;
        const nextSibling = element.nextElementSibling;
        nextSibling ? nextSibling.focus() : element.blur();
        setCodes({ ...codes, [element.name]: element.value })
    };

    const codedChangeHandler = (event) => {
        const element = event.target;
        const nextSibling = element.nextElementSibling;
        nextSibling ? nextSibling.focus() : element.blur();
        setCoded({ ...coded, [element.name]: element.value })
    };

    const codeInputFields = new Array(5)
        .fill(0)
        .map((item, index) => (
            <input
                autoComplete='off'
                type='password'
                name={`code${index}`}
                key={index}
                placeholder="*"
                className="outline-none w-full border rounded-lg p-2.5 text-xl text-center"
                onChange={(event) => codeChangeHandler(event)}
                maxLength={1}
            />
        ));

    const codedInputFields = new Array(5)
        .fill(0)
        .map((item, index) => (
            <input
                autoComplete='off'
                type='password'
                name={`code${index}`}
                key={index}
                placeholder="*"
                className="outline-none w-full border rounded-lg p-2.5 text-xl text-center"
                onChange={(event) => codedChangeHandler(event)}
                maxLength={1}
            />
        ));
        const handleFirstValidation = () => {
            if (!codes.code0 || !codes.code1 || !codes.code2 || !codes.code3 || !codes.code4) return ToastAlert('Enter a valid access pin')
            setScreen(2)
        }
        
        const handleSecondValidation = async () => {
            if (!coded.code0 || !coded.code1 || !coded.code2 || !coded.code3 || !coded.code4) return ToastAlert('Enter a valid access pin')
            const firstcode = `${codes.code0}${codes.code1}${codes.code2}${codes.code3}${codes.code4}`
            const secondcode = `${coded.code0}${coded.code1}${coded.code2}${coded.code3}${coded.code4}`

            if(secondcode !== firstcode) return ToastAlert('Unable to verify your pin, wrong pin detected')
            
            const data = {
                pin: secondcode,
            }
            const res = await PostUrl(Api.user.setup_pin, data)
            if(res.status === 200) {
                dispatch(dispatchUser(res.user))
                ToastAlert(res.msg)
                setTimeout(() => {
                    window.location = ''
                }, 3000);
            }else {
                ToastAlert(res.msg)
            }
        }

    return (
        <ModalLayout>
            <div className="p-4">
                <div className="tetx-zinc-600 text-sm bg-red-50 p-3 rounded-lg">Looks like you have to set up your admin access pin before you can proceed</div>
                <div className="mt-10">
                    <div className={`${screen === 1 ? '' : 'hidden'}`}>
                        <div className="ml-5 mb-2">Enter your Admin Access Pin</div>
                        <div className="grid grid-cols-5 w-11/12 mx-auto gap-3">
                            {codeInputFields}
                        </div>
                        <div className="w-fit ml-auto mt-5">
                            <button onClick={handleFirstValidation} className="bg-indigo-600 rounded-lg py-2.5 px-5 text-white capitalize">next</button>
                        </div>
                    </div>
                    <div className={`${screen === 2 ? '' : 'hidden'}`}>
                        <div className="ml-5 mb-2">Confirm your Admin Access Pin</div>
                        <div className="grid grid-cols-5 w-11/12 mx-auto gap-3">
                            {codedInputFields}
                        </div>
                        <div className="w-fit ml-auto mt-5">
                            <button onClick={handleSecondValidation} className="bg-indigo-600 rounded-lg py-2.5 px-5 text-white capitalize">setup pin</button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default OneTimePin