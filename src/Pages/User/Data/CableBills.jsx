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

const CableBills = () => {
  const [subs, setSubs] = useState([]);
  const [subdata, setSubdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singlesub, setSinglesub] = useState("");
  const [singlepack, setSinglepack] = useState("");
  const dispatch = useDispatch()
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [view, setView] = useState(false);
  const [forms, setForms] = useState({
    iuc: "",
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
    if (!forms.iuc) return ErrorAlert("Enter a valid IUC number");
    if (!forms.pin) return ErrorAlert("Provide your transaction pin");
    const formdata = {
      service: singlesub,
      pack: singlepack,
      iuc: forms.iuc,
      pin: forms.pin,
    };
    setLoading(true);
    const res = await PostUrl(Api.bills.verify_iuc, formdata);
    setLoading(false)
    if (res.status === 200) {
      setUser(res.msg)
    } else {
      return ErrorAlert(res.msg);
    }
  };

  const handleSubmission = async () => {
    try {
      const formdata = {
        sub: singlesub,
        plan: singlepack,
        iuc: forms.iuc,
        pin: forms.pin,
      };
      setLoading(true);
      const res = await PostUrl(Api.bills.cable, formdata);
      setLoading(false);
      if (res.status === 200) {
        dispatch(dispatchUser(res.user));
        setView(!view);
        setOpen(!open);
      } else {
        ErrorAlert(res.msg);
      }
    } catch (error) {
      return ErrorAlert(`Error ${error}`);
    }
  };
  return (
    <UserLayout pagetitle="cable subscriptions">
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
          <form>
            <div className="mb-4">
              <div className="w-fit ml-auto bg-red-500 rounded-lg p-1.5 text-white text-xs">
                Zero Charges Apply!!!
              </div>
              <div className="capitalize">Choose Decoder</div>
              <select
                onChange={handleSubs}
                value={singlesub}
                className="input uppercase"
              >
                <option value="">--Select--</option>
                {subs?.map(
                  (item, i) =>
                    item.category === "cable" && (
                      <option key={i} value={item.id}>
                        {item.network}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="mb-4">
              <div className="capitalize">Choose Package</div>
              <select
                onChange={handleSinglepack}
                value={singlepack}
                className="input"
              >
                <option value="">--Select--</option>
                {datas.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.title} = &#8358;{item.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <div className="capitalize">Smart IUC No. </div>
              <input
                name="iuc"
                value={forms.iuc}
                onChange={handleForms}
                type="number"
                className="input"
              />
            </div>
            {user && (
              <div className="mb-4">
                <div className="capitalize bg-green-300/50 w-fit px-5 py-2 mb-3 text-green-700 rounded-md border border-green-400 shadow-xl">Verified Account </div>
                <div className="rounded-lg bg-slate-200 border p-3 text-sm text-zinc-600">{user}</div>
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
                type="text"
                className="input"
              />
            </div>
            {user ? (
              <>
                <div className="w-fit ml-auto">
                  <button
                    type="button"
                    onClick={() => setView(!view)}
                    className="bg-green-600 capitalize rounded-full py-3 px-8 text-white"
                  >
                    purchase subscription
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-fit ml-auto">
                  <button
                    type="button"
                    onClick={handleVerification}
                    className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white"
                  >
                    verify IUC
                  </button>
                </div>
              </>
            )}
            <ContactToAdmin />
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default CableBills;
