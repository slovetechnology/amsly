
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
import { useDispatch, useSelector } from "react-redux";
import { dispatchUser } from "/src/app/reducer";
import ErroMessage from "./Compos/ErroMessage";

const MeterBills = () => {
  const { user } = useSelector((state) => state.data);
  const [subs, setSubs] = useState([]);
  const [subdata, setSubdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singlesub, setSinglesub] = useState("");
  const [singlepack, setSinglepack] = useState("");
  const dispatch = useDispatch()
  const [err, setErr] = useState({ tag: false, text: '' })
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [verif, setVerif] = useState("");
  const [view, setView] = useState(false);
  const [autos, setAutos] = useState([]);
  const [forms, setForms] = useState({
    iuc: "",
    pin: "",
    amount: '',
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
      const filter = user.levels?.levelpack?.filter((item) => item?.packs?.network === parseInt(id));
      setDatas(filter);
    }
  };

  const handleSinglepack = async (e) => {
    const val = e.target.value
    setSinglepack(val);

    const res = await GetUrl(`${Api.subs.user_get_automation}/${val}`);
    if (res.status === 200) return setAutos(res.msg);
    console.log(res)
  };

  const handleVerification = async () => {
    if (!singlesub) return ErrorAlert("Select a subscription");
    if (!singlepack) return ErrorAlert("Select a package");
    if (!forms.iuc) return ErrorAlert("Enter a valid IUC number");
    if (!forms.pin) return ErrorAlert("Provide your transaction pin");
    const formdata = {
      service: singlesub,
      serviceType: singlepack,
      iuc: forms.iuc,
      pin: forms.pin,
    };
    setLoading(true);
    const res = await PostUrl(Api.bills.verify_meter, formdata);
    setLoading(false)
    if (res.status === 200) {
      setVerif(res.msg)
    } else {
      return ErrorAlert(res.msg);
    }
  };
  // 45700848851
  const handleSubmission = async () => {
    try {
      const formdata = {
        sub: singlesub,
        serviceType: singlepack,
        iuc: forms.iuc,
        pin: forms.pin,
        amount: forms.amount
      };
      setLoading(true);
      const res = await PostUrl(Api.bills.electricity, formdata);
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

  const handleDuplicates = () => {
    const unique2 = user.levels?.levelsub?.filter((obj, index) => {
      return index === user.levels?.levelsub?.findIndex((o) => obj.subs?.id === o.subs?.id);
    });
    return (
      <>
        <select
          onChange={handleSubs}
          value={singlesub}
          className="input uppercase"
        >
          <option value="">--Select--</option>
          {unique2?.map(
            (item, i) =>
              item?.subs?.category === "electricity" &&
              item?.subs?.locked === "no" && (
                <option key={i} value={item?.subs?.id}>
                  {item?.subs?.network}
                </option>
              )
          )}
        </select>
      </>
    );
  };

  return (
    <UserLayout pagetitle="Electricity subscriptions">
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
              <div className="w-fit ml-auto bg-red-500 rounded-lg p-1.5 text-white text-xs">
                Zero Charges Apply!!!
              </div>
              <div className="capitalize">Select Electricity Company</div>
              {handleDuplicates()}
            </div>
            <div className="mb-4">
              <div className="capitalize">Perferred Meter</div>
              <select
                onChange={handleSinglepack}
                value={singlepack}
                className="input"
              >
                <option value="">--Select--</option>
                {datas.length > 0 && datas?.map(
                  (item, i) =>
                    item?.packs?.lock === "no" && (
                      <option key={i} value={item.id}>
                        {item?.packs?.title}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="mb-4">
              <div className="capitalize">Meter No. </div>
              <input
                name="iuc"
                value={forms.iuc}
                onChange={handleForms}
                type="number"
                className="input"
              />
            </div>
            {verif && (
              <div className="mb-4">
                <div className="capitalize bg-green-300/50 w-fit px-5 py-2 mb-3 text-green-700 rounded-md border border-green-400 shadow-xl">Verified Account </div>
                <div className="rounded-lg bg-slate-200 border p-3 text-sm text-zinc-600">{verif}</div>
              </div>
            )}
            <div className="mb-4">
              <div className="grid grid-cols-2">
                <div className="capitalize">Amount (&#8358;) </div>
              </div>
              <input
                maxLength={4}
                name="amount"
                value={forms.amount}
                onChange={handleForms}
                type="text"
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
                maxLength={4}
                name="pin"
                value={forms.pin}
                onChange={handleForms}
                type="password"
                className="input"
              />
            </div>
            {verif ? (
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
                    verify Meter
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

export default MeterBills;
