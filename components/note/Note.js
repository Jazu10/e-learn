import Link from "next/link";
import Image from "next/image";
import { deleteData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";

function Note({ id, title, classe, auth, subject, subjects, file }) {
   const [state, dispatch] = useContext(DataContext);
   const router = useRouter();
   const handleDelete = async () => {
      await deleteData(`file/${id}`);
      dispatch({ type: "NOTIFY", payload: { success: "Notes deleted" } });
      router.reload();
   };

   return (
      <>
         {Object.keys(auth).length !== 0
            ? auth.user.role === "user" &&
              auth.user.classe === classe &&
              subjects.classe === classe &&
              subjects.title === subject && (
                 <>
                    <div className="relative hidden md:grid  flex-col m-5  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
                       <p className="absolute top-2 right-2 text-xs text-white italic bg-transparent">
                          {classe}
                       </p>
                       <h4 className="my-3 font-bold text-white bg-transparent">
                          {title}
                       </h4>
                       <div className="flex mt-3 justify-between space-x-3">
                          <button className=" mt-auto button flex-1 hover:from-yellow-500">
                             <a href={file} className="bg-transparent" download>
                                Download
                             </a>
                          </button>
                       </div>
                    </div>
                    <div className="flex md:hidden bg-gray-900 w-full px-4 py-2 mx-auto items-center">
                       <div className="flex bg-gray-800 w-full rounded-lg">
                          <div className="flex flex-col p-2 mx-2 bg-transparent">
                             <p className="text-lg mb-2 bg-transparent text-white">
                                {classe} - {subject}
                             </p>
                             <p className="text-lg mb-2 bg-transparent text-white">
                                {title}
                             </p>
                             <div className="flex items-end bg-transparent text-white hover:text-gray-100">
                                <button className="text-md font-semibold mt-1 text-right focus:outline-none  text-yellow-400 bg-transparent flex justify-evenly space-x-2">
                                   <a
                                      href={file}
                                      className="bg-transparent"
                                      download>
                                      Download
                                   </a>
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                 </>
              )
            : null}
         {Object.keys(auth).length !== 0
            ? auth.user.role === "admin" &&
              subjects.classe === classe &&
              subjects.title === subject && (
                 <>
                    <div className="relative hidden md:grid  flex-col m-5  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
                       <p className="absolute top-2 right-2 text-xs text-white italic bg-transparent">
                          {classe}
                       </p>
                       <h4 className="my-3 font-bold text-white bg-transparent">
                          {title}
                       </h4>
                       <div className="flex mt-3 justify-between space-x-3">
                          <button className=" mt-auto button flex-1 hover:from-yellow-500">
                             <a href={file} className="bg-transparent" download>
                                Download
                             </a>
                          </button>

                          <button
                             onClick={handleDelete}
                             className=" mt-auto button1 flex-1 hover:from-red-600">
                             Delete
                          </button>
                       </div>
                    </div>
                    <div className="flex md:hidden bg-gray-900 w-full px-4 py-2 mx-auto items-center">
                       <div className="flex bg-gray-800 w-full rounded-lg">
                          <div className="flex p-2 flex-col mx-2 bg-transparent">
                             <p className="text-lg mb-2 bg-transparent text-white">
                                {classe} - {subject}
                             </p>
                             <p className="text-lg mb-2 bg-transparent text-white">
                                {title}
                             </p>
                             <div className="flex items-end bg-transparent justify-items-center space-x-4 text-white hover:text-gray-100">
                                <button className="text-md font-semibold mt-1 text-right focus:outline-none  text-yellow-400 bg-transparent flex justify-evenly space-x-2">
                                   <a
                                      href={file}
                                      className="bg-transparent"
                                      download>
                                      Downlaod
                                   </a>
                                </button>

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

export default Note;
