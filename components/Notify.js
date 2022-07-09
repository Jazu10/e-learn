import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
   const [state, dispatch] = useContext(DataContext);
   const { notify } = state;

   return (
      <>
         {notify.loading && <Loading />}
         {notify.error && (
            <Toast
               msg={{ msg: notify.error, title: "Error" }}
               handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
               text={"text-red-500"}
               button={"bg-red-500"}
            />
         )}
         {notify.success && (
            <Toast
               msg={{ msg: notify.success, title: "Error" }}
               handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
               text={"text-yellow-400"}
               button={"bg-yellow-400"}
            />
         )}
      </>
   );
};

export default Notify;
