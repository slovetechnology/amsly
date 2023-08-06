import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";

const EditSingleLevel = ({ item, handelForms, handleAddup, localState }) => {
  const active = localState.find((data) => data.id === item.id);
  return (
    <div className="mb-3">
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAddup(item)}
            className={`w-4 h-4 flex items-center justify-center ${
              active ? "bg-blue-700 text-white" : "bg-slate-300 text-slate-700"
            }`}
          >
            {" "}
            <BsCheck />{" "}
          </button>
          <div className="text-sm text-zinc-600">{item.title}</div>
        </div>
        <div className="w-fit ml-auto">
          <div className="flex items-center gap-3">
            <div className="">
              <div className="flex items-center gap-2">
                <div className="text-xs text-slate-600">Original: </div>
                <div className="text-sm"> &#8358;{item.price}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-slate-600">current: </div>
                <div className="text-sm"> &#8358;{item.former}</div>
              </div>
            </div>
            <div className="">
              {active ? (
                <input
                  onChange={(e) => handelForms(item.id, e.target.value)}
                  value={active.pricing || ""}
                  type="text"
                  className="border text-sm p-3 rounded-lg"
                />
              ) : (
                <input
                  readOnly
                  type="text"
                  value={``}
                  className="border text-sm p-3 bg-slate-100 rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSingleLevel;
