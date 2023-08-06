import React, { useState } from "react";
import ModalLayout from "/src/Components/Utils/ModalLayout";
import { Api, PostUrl } from "/src/Components/Utils/Apis";
import { ToastAlert } from "/src/Components/Utils/Utility";
import { useNavigate } from "react-router-dom";
import Loading from "/src/Components/General/Loading";

const DeleteLevelModal = ({ closeView, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleDeleting = async () => {
    try {
      setLoading(true);
      const data = {
        id,
      };
      const res = await PostUrl(Api.subs.delete_level, data);
      setLoading(false);
      if (res.status === 200) {
        ToastAlert(res.msg);
        setTimeout(() => {
          navigate(`/auth/admin/levels`);
        }, 2000);
      }
    } catch (error) {
      return ToastAlert(error);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <ModalLayout closeView={closeView}>
        <div className="p-4">
          <div className="text-center">
            Are you sure you want to delete this Level?!..
          </div>
          <div className="mt-10 w-2/5 mx-auto">
            <button
              onClick={handleDeleting}
              className="bg-red-700 text-white rounded-full py-3 w-full capitalize"
            >
              confirm action
            </button>
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default DeleteLevelModal;
