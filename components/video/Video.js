import Link from "next/link";
import Image from "next/image";
import { deleteData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";

function Video({
   id,
   title,
   classe,
   auth,
   subject,
   subjects,
   thumbnail,
   description,
}) {
   const [state, dispatch] = useContext(DataContext);
   const router = useRouter();
   const handleDelete = async () => {
      await deleteData(`video/${id}`);
      dispatch({ type: "NOTIFY", payload: { success: "video deleted" } });
      router.push("/");
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
                       <p className="line-clamp-2 text-gray-100 text-xs bg-transparent">
                          {description}
                       </p>
                       <div className="flex mt-3 justify-between space-x-3">
                          <Link href={`/video/${id}`}>
                             <button className=" mt-auto button flex-1 hover:from-yellow-500">
                                View
                             </button>
                          </Link>
                       </div>
                    </div>
                    <div className="flex md:hidden bg-gray-900 w-full  px-4 py-2 mx-auto items-center">
                       <div className="flex bg-gray-800 w-full rounded-lg">
                          <Image
                             className="w-full rounded-l-lg"
                             src={thumbnail}
                             height={"100%"}
                             width={"100%"}
                             objectFit="cover"
                          />
                          <div className="flex flex-col p-2  mx-2 w-2/3 bg-transparent">
                             <p className="text-lg mb-2 bg-transparent text-white">
                                {title}
                             </p>
                             <p className="text-xs flex-grow line-clamp-2 bg-transparent text-justify text-gray-50">
                                {description}
                             </p>
                             <div className="flex items-end bg-transparent text-white hover:text-gray-100">
                                <Link href={`/video/${id}`}>
                                   <button className="text-md font-semibold mt-1 text-right focus:outline-none  text-yellow-400 bg-transparent flex justify-evenly space-x-2">
                                      view ➟
                                   </button>
                                </Link>
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
                       <p className="line-clamp-2 text-gray-100 text-xs bg-transparent">
                          {description}
                       </p>
                       <div className="flex mt-3 justify-between space-x-3">
                          <Link href={`/video/${id}`}>
                             <button className=" mt-auto button flex-1 hover:from-yellow-500">
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
                    <div className="flex md:hidden bg-gray-900 w-full px-4 py-2 mx-auto items-center">
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
                                {title}
                             </p>
                             <p className="text-xs flex-grow line-clamp-2 bg-transparent text-justify text-gray-50">
                                {description}
                             </p>
                             <div className="flex items-end bg-transparent justify-items-center space-x-4 text-white hover:text-gray-100">
                                <Link href={`/video/${id}`}>
                                   <button className="text-md font-semibold mt-1 text-right focus:outline-none  text-yellow-400 bg-transparent flex justify-evenly space-x-2">
                                      view ➟
                                   </button>
                                </Link>
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
