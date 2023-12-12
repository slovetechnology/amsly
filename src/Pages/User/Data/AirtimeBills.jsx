import React, { useEffect, useState } from "react";
import UserLayout from "../../../Components/User/UserLayout";
import ContactToAdmin from "../ContactToAdmin";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "/src/Components/General/Loading";
import ConfirmAirtimePurchase from "./Compos/ConfirmAirtimePurchase";
import { ErrorAlert } from "/src/Components/Utils/Utility";
import { Api, PostUrl } from "/src/Components/Utils/Apis";
import { dispatchUser } from "/src/app/reducer";
import PerformTractionNotice from "./Compos/PerformTractionNotice";
import ErroMessage from "./Compos/ErroMessage";

const AirtimeBills = () => {
  const { subs, user } = useSelector((state) => state.data);
  const [mainsub, setMainsub] = useState({});
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState({ tag: false, text: '' })
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const [mainAmount, setMainAmount] = useState(0);
  const [forms, setForms] = useState({
    network: "",
    amount: "",
    mobile: "",
    pin: "",
    sub: "",
  });
  const handleForms = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleMainSub = (e) => {
    const id = e.target.value;
    // const findData = subs.find((item) => item.id?.toString() === id);
    const findData = user.levels?.levelsub?.find((item) => item?.id === parseInt(id));
    setMainsub(findData);
    console.log(findData)
    setForms({
      ...forms,
      sub: id,
      amount: '',
      network: findData?.id,
    });
    setMainAmount(0)

  };

  const ConfirmSubmission = (e) => {
    e.preventDefault();
    if (!forms.network) return ErrorAlert("Select your preferred network");
    if (!forms.amount) return ErrorAlert("Subscription Amount required");
    if (!forms.mobile) return ErrorAlert("Mobile Number required");
    if (!forms.pin) return ErrorAlert("Airtime Pin required");
    setView(!view);
  };

  const handleSubmission = async () => {
    try {
      const formdata = {
        ...forms,
        dataAmount: mainAmount
      };

      setLoading(true);
      const res = await PostUrl(Api.bills.airtime, formdata);
      setLoading(false);
      if (res.status === 200) {
        setOpen(!open);
        dispatch(dispatchUser(res.user));
        setView(!view);
      } else {
        setErr({ tag: true, text: `${res.msg}` });
        setView(!view)
      }
    } catch (error) {
      setView(!view)
      return setErr({ tag: true, text: ` ${error}` });
    }
  };

  const handleCalculation = (val) => {
    if (mainsub) {
      const sum = parseFloat(val * mainsub.percent / 100);
      setMainAmount(sum);
    }
  };

  const handleDuplicate = () => {
    const unique = user.levels?.levelsub?.filter((obj, i) => {
      return i === user.levels?.levelsub?.findIndex((o) => obj.subs?.id === o.subs?.id)
    });
    return (
      <>
        <select name="network" onChange={handleMainSub} className="input">
          <option value="">--Select--</option>
          {unique?.map(
            (item, i) =>
              item?.subs?.category.endsWith("-vtu") &&
              item?.subs?.locked === "no" && (
                <option key={i} value={item?.id}>
                  {/* {item?.network.split(" ")[0]} */}
                  {item?.subs?.tag}
                </option>
              )
          )}
        </select>
      </>
    )
  }

  return (
    <UserLayout pagetitle="buy your airtime VTU">
      {open && <PerformTractionNotice />}
      {loading && <Loading />}
      {view && (
        <ConfirmAirtimePurchase
          handleSubmission={handleSubmission}
          closeView={() => setView(!view)}
        />
      )}
      <div className="mt-10">
        <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
          {err.tag && <ErroMessage text={err.text} />}
          <form onSubmit={ConfirmSubmission}>
            <div className="mb-4">
              <div className="capitalize">Choose Network</div>
              {handleDuplicate()}
            </div>
            {mainsub?.id && <div className="mb-4">
              <div className="text-right text-red-600 text-sm">
                {mainsub?.id ? ` Charges ${mainsub.percent}%` : ""}
              </div>
              {mainAmount !== 0 && <div className="text-sm text-zinc-600 text-right">
                Amount to Pay: &#8358;{mainAmount || 0}
              </div>}
              <div className="capitalize">recharge amount </div>
              <input
                onKeyUp={(e) => handleCalculation(e.target.value)}
                name="amount"
                value={forms.amount}
                onChange={handleForms}
                type="number"
                className="input"
              />
            </div>}
             
            <div className="mb-4">
              <div className="capitalize">mobile number </div>
              <input
                name="mobile"
                value={forms.mobile}
                onChange={handleForms}
                type="number"
                className="input"
              />
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-2">
                <div className="capitalize">transaction pin </div>
                <div className="text-right">
                  Don't have!{" "}
                  <Link to="/create_pin" className="text-indigo-600">
                    Create Pin
                  </Link>{" "}
                </div>
              </div>
              <input
                name="pin"
                value={forms.pin}
                maxLength={4}
                onChange={handleForms}
                type="password"
                className="input"
              />
            </div>
            <div className="w-fit ml-auto">
              <button className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white">
                make payment
              </button>
            </div>
            <ContactToAdmin />
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default AirtimeBills;
