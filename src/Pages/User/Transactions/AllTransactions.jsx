import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import { Api, GetUrl } from '../../../Components/Utils/Apis'
import { SlBell } from 'react-icons/sl'
import moment from 'moment'

const AllTransactions = () => {
  const [trans, setTrans] = useState([])
  const fetchTransactions = useCallback(async () => {
    const res = await GetUrl(Api.transactions.user)
    return setTrans(res.msg)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])
  return (
    <UserLayout pagetitle="all transactions">
      <div className="">
        <div className="w-11/12 mx-auto">
          <div className="">
            {trans.map((item, i) => (
              <div className={`flex gap-2 bg-white mb-2 relative`} key={i}>
                <div className={`flex items-center justify-center p-2 text-white ${item.status === 'success' ? 'bg-teal-400' : 'bg-red-600'} text-2xl`}><SlBell /></div>
                <div className="py-3 pr-3">
                  <div className="text-xs shadow-xl uppercase bg-slate-100 py-1 px-3 w-fit mb-2 text-zinc-600 font-semibold">{item.title}</div>
                  <div className="text-sm text-slate-600 uppercase flex items-center gap-5"> Status <div className={`${item.status === 'success' ? 'bg-teal-600' : 'bg-red-500'} text-white py-1.5 px-5 text-xs rounded-lg`}>{item.status}</div> </div>
                  <div className="text-sm text-slate-600"> <span className="font-semibold">Transaction ID: </span> {item.txid}</div>
                  <div className="text-sm text-slate-600"> <span className="font-semibold">Message: </span> {item.note}</div>
                  <div className="text-sm text-slate-600"> <span className="font-semibold">Date: </span> {moment(item.createdAt).format('DD-MM-YYYY h:m A')} </div>
                  <div className={`text-sm ${item.amount.toString().startsWith('-') ? 'text-red-600' : 'text-teal-500'}`}> <span className="font-semibold">Amount: </span> &#8358;{item.amount}</div>
                  <div className="text-sm text-slate-600"> <span className="font-semibold">Prev Balance: </span> &#8358;{item.prevbal?.toLocaleString()}</div>
                  <div className="text-sm text-slate-600"> <span className="font-semibold">Current Balance: </span> &#8358;{item.currbal?.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default AllTransactions