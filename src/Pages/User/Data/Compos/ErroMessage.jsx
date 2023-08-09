import React from 'react'

const ErroMessage = ({text}) => {
  return (
    <div>
        <div className="bg-red-300/50 mb-3 text-red-800 shadow-md text-sm  rounded-lg p-3">{text}</div>
    </div>
  )
}

export default ErroMessage