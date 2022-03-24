import { toast } from "react-toastify";

export default {
  succes: (valueNotif) =>
    toast.success(valueNotif, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }),
  error: (valueNotif) =>
    toast.error(valueNotif, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }),
};
