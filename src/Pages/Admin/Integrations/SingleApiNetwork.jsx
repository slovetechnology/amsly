import React from 'react'
import { SlPencil, SlTrash } from 'react-icons/sl'


const SingleApiNetwork = ({item, handleNetworksDeleting, handleNetworksUpdating}) => {
    return (
        <div className="grid grid-cols-4 p-1.5 border-b">
            {/* <div className="text-sm flex items-center gap-3"> <ImCompass /> {item.title}</div> */}
            <div className="col-span-3">
                <div className="grid grid-cols-2">
                    <div className="text-xs">User Will See:</div>
                    <div className="text-xs text-right">{item.title}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="text-xs">Service Provider Will See:</div>
                    <div className="text-xs text-right">{item.tag || '--'}</div>
                </div>
            </div>
            <div className="flex items-center">
                <div onClick={() => handleNetworksDeleting(item.id)} className="cursor-pointer col-span-1 w-fit ml-auto text-red-600"> <SlTrash /> </div>
                <div onClick={() => handleNetworksUpdating(item)} className="cursor-pointer col-span-1 w-fit ml-auto text-teal-600"> <SlPencil /> </div>
            </div>
        </div>
    )
}

export default SingleApiNetwork