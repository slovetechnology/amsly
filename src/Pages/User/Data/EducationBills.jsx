import React, { useCallback, useEffect, useState } from "react";
import UserLayout from "/src/Components/User/UserLayout";
import ContactToAdmin from "../ContactToAdmin";
import { Link } from "react-router-dom";
import { Api, GetUrl } from "/src/Components/Utils/Apis";
import { ErrorAlert } from "/src/Components/Utils/Utility";
import { PostUrl } from "/src/Components/Utils/Apis";
import Loading from "/src/Components/General/Loading";
import PerformTractionNotice from "./Compos/PerformTractionNotice";
import ConfirmAirtimePurchase from "./Compos/ConfirmAirtimePurchase";
import { useDispatch } from "react-redux";
import { dispatchUser } from "/src/app/reducer";
import ErroMessage from "./Compos/ErroMessage";

const EducationBills = () => {
  const [subs, setSubs] = useState([]);
  const [subdata, setSubdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singlesub, setSinglesub] = useState("");
  const [singlepack, setSinglepack] = useState("");
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [err, setErr] = useState({ tag: false, text: "" });
  const [view, setView] = useState(false);
  const [forms, setForms] = useState({
    mobile: "",
    pin: "",
  });

  const handleForms = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const fetchSubscription = useCallback(async () => {
    try {
      const res = await GetUrl(Api.subs.all_subscriptions);
      setSubs(res.subs);
      setSubdata(res.subdata);
    } catch (error) {
      return false;
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const handleSubs = (e) => {
    const id = e.target.value;
    if (id) {
      setSinglesub(id);
      const filter = subdata.filter((item) => item.network === parseInt(id));
      setDatas(filter);
    }
  };

  const handleSinglepack = (e) => {
    setSinglepack(e.target.value);
  };

  const handleVerification = async () => {
    if (!singlesub) return ErrorAlert("Select a subscription");
    if (!singlepack) return ErrorAlert("Select a package");
    if (!forms.mobile) return ErrorAlert("Enter a valid mobile number");
    if (!forms.pin) return ErrorAlert("Provide your transaction pin");
    setView(!view);
  };

  const handleSubmission = async () => {
    try {
      const formdata = {
        sub: singlepack,
        variation: 1,
        mobile: forms.mobile,
        pin: forms.pin,
      };
      setLoading(true);
      const res = await PostUrl(Api.bills.exam, formdata);
      setLoading(false);
      if (res.status === 200) {
        dispatch(dispatchUser(res.user));
        setView(!view);
        setOpen(!open);
      } else {
        setErr({ tag: true, text: `${res.msg}` });
        setView(!view)
      }
    } catch (error) {
      setView(!view)
      return setErr({ tag: true, text: ` ${error}` });
    }
  };
  
  return (
    <UserLayout pagetitle="Exam Purchase">
      {loading && <Loading />}
      {open && <PerformTractionNotice />}
      {view && (
        <ConfirmAirtimePurchase
          handleSubmission={handleSubmission}
          closeView={() => setView(!view)}
        />
      )}
      <div className="mt-10">
        <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
          {err.tag && <ErroMessage text={err.text} />}
          <form>
            <div className="mb-4">
              <div className="w-fit ml-auto mb-5 bg-red-500 rounded-lg p-1.5 text-white text-xs">
                Zero Charges Apply!!!
              </div>
              {/* <div className="capitalize">Exam Type</div> */}
              <select
                onChange={handleSubs}
                value={singlesub}
                className="input uppercase"
              >
                <option value="">--Select--</option>
                {subs?.map(
                  (item, i) =>
                    item.category === "exam" &&
                    item.locked === "no" && (
                      <option key={i} value={item.id}>
                        {item.network}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="mb-4">
              <div className="capitalize">Exam Type</div>
              <select
                onChange={handleSinglepack}
                value={singlepack}
                className="input"
              >
                <option value="">--Select--</option>
                {datas.map(
                  (item, i) =>
                    item.lock === "no" && (
                      <option key={i} value={item.id}>
                        {item.title} = &#8358;{item.price}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="mb-4">
              <div className="capitalize">Mobile Number </div>
              <input
                name="mobile"
                value={forms.mobile}
                onChange={handleForms}
                type="number"
                className="input"
              />
            </div>
            {user && (
              <div className="mb-4">
                <div className="capitalize bg-green-300/50 w-fit px-5 py-2 mb-3 text-green-700 rounded-md border border-green-400 shadow-xl">
                  Verified Account{" "}
                </div>
                <div className="rounded-lg bg-slate-200 border p-3 text-sm text-zinc-600">
                  {user}
                </div>
              </div>
            )}
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
                maxLength={4}
                name="pin"
                value={forms.pin}
                onChange={handleForms}
                type="password"
                className="input"
              />
            </div>
            <div className="w-fit ml-auto">
              <button
                type="button"
                onClick={handleVerification}
                className="bg-blue-600 capitalize rounded-full py-3 px-8 text-white"
              >
                purchase exam pin
              </button>
            </div>
            <ContactToAdmin />
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default EducationBills;
