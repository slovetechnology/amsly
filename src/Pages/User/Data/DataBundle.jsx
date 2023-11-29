import React, { useState } from "react";
import ContactToAdmin from "../ContactToAdmin";
import { Link, useNavigate } from "react-router-dom";
import { Api, PostUrl, GetUrl } from "/src/Components/Utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { SwalAlert, ToastAlert } from "/src/Components/Utils/Utility";
import Loading from "/src/Components/General/Loading";
import { dispatchUser } from "/src/app/reducer";
import ConfirmDataPurchase from "./Compos/ConfirmDataPurchase";
import { ErrorAlert } from "/src/Components/Utils/Utility";
import PerformTractionNotice from "./Compos/PerformTractionNotice";
import ErroMessage from "./Compos/ErroMessage";

const DataBundle = () => {
  const { subs, subdata, user } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setSinglesub] = useState(null);
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({tag: false, text: ''})
  const [view, setView] = useState(false);
  const [targets, setTargets] = useState([]);
  const [autos, setAutos] = useState([]);
  const [forms, setForms] = useState({
    service: "",
    network: "",
    mobile: "",
    pin: "",
  });
  const [packdata, setpackdata] = useState("");

  const handleForms = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };
  const handleFormsPackage = async (e) => {
    const val = e.target.value;
    setpackdata(val);
    const res = await GetUrl(`${Api.subs.user_get_automation}/${val}`);
    if (res.status === 200) return setAutos(res.msg);
  };
  const handleSubs = (e) => {
    const id = e.target.value;
    setpackdata("");
    if (id) {
      setSinglesub(id);
      setForms({
        ...forms,
        network: id,
      });
      const filter = user.levels?.levelpack?.filter((item) => item?.packs?.network === parseInt(id));
      setDatas(filter);
    }
  };
  const handleSubsNetwork = (e) => {
    const tag = e.target.value;
    if (tag) {
      setForms({
        ...forms,
        service: tag,
      });
      const filter = user.levels?.levelsub?.filter((item) => item?.sub?.tag === tag);
      setTargets(filter);
      setDatas([]);
      setpackdata("");
    }
  };
  const ConfirmSubmission = (e) => {
    e.preventDefault();
    if (!forms.service) return ErrorAlert("Select a network service carrier");
    if (!forms.network) return ErrorAlert("Select a network");
    if (!packdata) return ErrorAlert("Select a suscription package");
    if (!forms.mobile) return ErrorAlert("Enter a valid phone number");
    if (!forms.pin) return ErrorAlert("Provide your data pin");
    setView(!view);
  };
  const handleSubmission = async () => {
    try {
      const formdata = {
        ...forms,
        package: packdata,
      };
      setLoading(true);
      const res = await PostUrl(Api.bills.data, formdata);
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
      return index === user.levels?.levelsub?.findIndex((o) => obj.subs?.tag === o.subs?.tag);
    });
    return (
      <>
        <select
          name="network"
          onChange={handleSubsNetwork}
          className="input uppercase"
        >
          <option>--Select--</option>
          {unique2?.map(
            (item, i) =>
              item?.subs?.category === "data" &&
              item?.subs?.locked === "no" && (
                <option key={i} value={item?.subs?.tag}>
                  {item?.subs?.tag}
                </option>
              )
          )}
        </select>
      </>
    );
  };
  return (
    <>
      {loading && <Loading />}
      {open && <PerformTractionNotice />}
      {view && (
        <ConfirmDataPurchase
          handleSubmission={handleSubmission}
          closeView={() => setView(!view)}
        />
      )}
      <div className="mt-10">
        <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
          {err.tag && <ErroMessage text={err.text} />}
          <ContactToAdmin />
          <form onSubmit={ConfirmSubmission}>
            <div className="mb-4">
              <div className="capitalize">Choose Network Coverage</div>
              {handleDuplicates()}
            </div>
            <div className="mb-4">
              <div className="capitalize">Choose Service</div>
              <select
                name="network"
                onChange={handleSubs}
                className="input uppercase"
              >
                <option value={null}>--Select--</option>
                {targets.length > 0 && targets?.map(
                  (item, i) =>
                    item?.subs?.category === "data" &&
                    item?.subs?.locked === "no" && (
                      <option key={i} value={item?.subs?.id}>
                        {item?.subs?.network}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="mb-4">
              <div className="capitalize">Choose Package </div>
              <select
                name="package"
                value={packdata}
                onChange={handleFormsPackage}
                className="input uppercase"
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
              <div className="capitalize"> Mobile No. </div>
              <input
                name="mobile"
                value={forms.mobile}
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
            <div className="w-fit ml-auto">
              <button className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white">
                purchase
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DataBundle;
