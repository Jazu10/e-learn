import Link from "next/link";
import { deleteData } from "../../utils/fetchData";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";

function Video({ id, title, classe, auth, matter }) {
   const [state, dispatch] = useContext(DataContext);
   const router = useRouter();
   const handleDelete = async () => {
      await deleteData(`feed/${id}`);
      dispatch({ type: "NOTIFY", payload: { success: "Feed deleted" } });
      router.push("/");
   };

   return (
      <>
         {Object.keys(auth).length !== 0
            ? auth.user.role === "user" &&
              auth.user.classe === classe && (
                 <>
                    <div className="relative overflow-x-hidden hidden md:grid  flex-col m-5  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
                       <p className="absolute top-2 right-2 text-xs text-white italic bg-transparent">
                          {classe}
                       </p>
                       <h4 className="my-3 font-bold text-white bg-transparent">
                          {title}
                       </h4>
                       <p className=" text-gray-100 text-xs bg-transparent ">
                          {matter}
                       </p>
                    </div>
                    <div className="flex md:hidden overflow-x-hidden bg-gray-900 w-full px-4 py-2 mx-auto items-center">
                       <div className="flex bg-gray-800 w-full rounded-lg ">
                          <div className="flex flex-col p-2 mx-2 bg-transparent overflow-x-hidden">
                             <p className="text-lg mb-2 bg-transparent text-white overflow-x-hidden">
                                {classe} - {title}
                             </p>
                             <p className="text-xs flex-grow  bg-transparent text-justify text-gray-50 overflow-x-auto">
                                {matter}
                             </p>
                          </div>
                       </div>
                    </div>
                 </>
              )
            : null}
         {Object.keys(auth).length !== 0
            ? auth.user.role === "admin" && (
                 <>
                    <div className="relative overflow-x-hidden hidden md:grid  flex-col m-5  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
                       <p className="absolute top-2 right-2 text-xs text-white italic bg-transparent">
                          {classe}
                       </p>
                       <h4 className="my-3 font-bold text-white bg-transparent">
                          {title}
                       </h4>
                       <p className=" text-gray-100 text-xs bg-transparent ">
                          {matter}
                       </p>
                       <div className="flex mt-3 bg-gray-800 justify-between space-x-3">
                          <div className="flex-1 bg-gray-800 w-4/5"></div>
                          <div className="flex-1 bg-gray-800 w-3/4"></div>
                          <div className="flex-1 bg-gray-800 w-3/4"></div>
                          <button
                             onClick={handleDelete}
                             className=" mt-auto button1 flex-1 bg-gray-800 hover:from-red-600">
                             Delete
                          </button>
                       </div>
                    </div>
                    <div className="flex md:hidden overflow-x-hidden bg-gray-900 w-full px-4 py-2 mx-auto items-center">
                       <div className="flex bg-gray-800 w-full rounded-lg ">
                          <div className="flex flex-col p-2 mx-2 bg-transparent overflow-x-hidden">
                             <p className="text-lg mb-2 bg-transparent text-white overflow-x-hidden">
                                {classe} - {title}
                             </p>
                             <p className="text-xs flex-grow  bg-transparent text-justify text-gray-50 overflow-x-auto">
                                {matter}
                             </p>
                             <div className="flex items-end bg-transparent justify-items-center space-x-4 text-white hover:text-gray-100">
                                <button
                                   onClick={handleDelete}
                                   className="text-md font-semibold mt-1 text-right focus:outline-none  text-red-500 bg-transparent flex justify-evenly space-x-2">
                                   Delete ✘
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                 </>
              )
            : null}
      </>
   );
}

export default Video;
