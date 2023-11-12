import React from 'react'

const HomeTag = ({item}) => {
    return (
        <div className="bg-white rounded-lg p-3.5">
            <div className="text-xl text-green-600 mt-2">{item.val}</div>
            <div className="text-sm md:text-base capitalize font-medium text-slate-600 mb-4">{item.title}</div>
            <div className="bg-gradient-to-r from-green-700 to-green-300 rounded-full h-2"></div>
        </div>
    )
}

export default HomeTag
