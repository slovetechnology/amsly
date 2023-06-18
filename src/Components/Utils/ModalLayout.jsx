import React, { useEffect, useRef } from 'react'

const ModalLayout = ({children, closeView}) => {
    const togref = useRef()
    useEffect(() => {
        togref && window.addEventListener('click', e => {
            togref.current !== null && !togref.current.contains(e.target) && closeView()
        }, true)
    }, [])
  return (
    <div className={`fixed top-0 left-0 w-full h-screen px-3 bg-black/60 flex items-center justify-center z-[2]`}>
        <div ref={togref} data-aos="fade-down" className="bg-white w-full max-w-xl max-h-[80vh] rounded-lg overflow-y-auto scrolls">
            {children}
        </div>
    </div>
  )
}

export default ModalLayout