import React from 'react'

const HomeTag = ({amount, title, }) => {
    return (
        <div className="bg-white rounded-lg p-3.5">
            <div className="text-xl text-green-600 mt-2">&#8358;{amount}</div>
            <div className="text-lg capitalize font-light text-slate-600 mb-4">{title}</div>
            <div className="bg-gradient-to-r from-green-700 to-green-300 rounded-full h-2"></div>
        </div>
    )
}

export default HomeTag
