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

const CableBills = () => {
  const { user } = useSelector((state) => state.data);
  const [subs, setSubs] = useState([]);
  const [subdata, setSubdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singlesub, setSinglesub] = useState("");
  const [err, setErr] = useState({ tag: false, text: '' })
  const [singlepack, setSinglepack] = useState("");
  const dispatch = useDispatch()
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [verif, setVerif] = useState("");
  const [view, setView] = useState(false);
  const [autos, setAutos] = useState([]);
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
      pack: singlepack,
      iuc: forms.iuc,
      pin: forms.pin,
    };
    setLoading(true);
    const res = await PostUrl(Api.bills.verify_iuc, formdata);
    setLoading(false)
    if (res.status === 200) {
      setVerif(res.msg)
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
        dispatch(dispatchUser(res.verif));
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
              item?.subs?.category === "cable" &&
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
    <UserLayout pagetitle="cable subscriptions">
      {loading && <Loading />}
      {open && <PerformTractionNotice />}
      {view && (
        <ConfirmAirtimePurchase
          title="Confirm Your Cable Subscription Request"
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
              <div className="capitalize">Choose Decoder</div>
              {handleDuplicates()}
            </div>
            <div className="mb-4">
              <div className="capitalize">Choose Package</div>
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
                        {item?.packs?.title} = &#8358;{item.pricing}
                      </option>
                    )
                )}
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
            {verif && (
              <div className="mb-4">
                <div className="capitalize bg-green-300/50 w-fit px-5 py-2 mb-3 text-green-700 rounded-md border border-green-400 shadow-xl">Verified Account </div>
                <div className="rounded-lg bg-slate-200 border p-3 text-sm text-zinc-600">{verif}</div>
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
            {verif ? (
              <>
                <div className="w-fit ml-auto">
                  <button
                    type="button"
                    onClick={() => { setView(!view); }}
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
