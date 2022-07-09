import Link from "next/link";
import Image from "next/image";
import { deleteData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";

function Subject({ id, title, classe, thumbnail }) {
   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();

   const handleSubject = () => {
      dispatch({
         type: "SUBJECT",
         payload: {
            title,
            classe,
            thumbnail,
         },
      });
   };
   const handleDelete = async () => {
      await deleteData(`subject/${id}`);
      dispatch({ type: "NOTIFY", payload: { success: "Subject deleted" } });
      router.push("/");
   };

   return (
      <>
         {Object.keys(auth).length !== 0
            ? auth.user.root == true && (
                 <>
                    <div className="relative flex-col m-5 hidden md:flex  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
                       <p className="absolute top-2 right-2 text-xs text-white italic bg-transparent">
                          {classe}
                       </p>
                       <Image
                          src={thumbnail}
                          height={250}
                          width={200}
                          objectFit="cover"
                          className="image"
                       />
                       <h4 className="my-3 font-bold text-white bg-transparent">
                          {title}
                       </h4>
                       <div className="flex justify-between space-x-3">
                          <Link href="/videos">
                             <button
                                className=" mt-auto button flex-1 hover:from-yellow-600"
                                onClick={handleSubject}>
                                View
                             </button>
                          </Link>
                          <button
                             onClick={handleDelete}
                             className=" mt-auto button1 flex-1 hover:from-red-600">
                             Delete
                          </button>
                       </div>
                    </div>
                    <div className="flex md:hidden bg-gray-900 w-full px-5 py-2 mx-auto items-center">
                       <div className="flex bg-gray-800 w-full rounded-lg">
                          <Image
                             className="w-full rounded-l-lg"
                             src={thumbnail}
                             height={"100%"}
                             width={"100%"}
                             objectFit="cover"
                          />
                          <div className="flex flex-col p-2 mx-2 w-2/3 bg-transparent">
                             <p className="text-lg mb-2 bg-transparent text-white">
                                {classe} - {title}
                             </p>
                             <div className="flex items-end bg-transparent text-white hover:text-gray-100">
                                <button
                                   onClick={handleDelete}
                                   className="text-md font-semibold mt-1 text-right focus:outline-none  text-yellow-400 bg-transparent flex justify-evenly space-x-2">
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

export default Subject;
