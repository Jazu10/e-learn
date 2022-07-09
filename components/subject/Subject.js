import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import Image from "next/image";

function Subject({ _id, title, classe, thumbnail, auth }) {
   const [state, dispatch] = useContext(DataContext);

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

   return (
      <>
         {Object.keys(auth).length !== 0
            ? auth.user.root === true && (
                 <div className="relative flex flex-col m-5  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
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
                             Videos
                          </button>
                       </Link>
                       <Link href="/notes">
                          <button
                             className=" mt-auto button flex-1 hover:from-yellow-600"
                             onClick={handleSubject}>
                             Notes
                          </button>
                       </Link>
                    </div>
                 </div>
              )
            : null}
         {Object.keys(auth).length !== 0
            ? auth.user.role === "admin" &&
              auth.user.root === undefined && (
                 <div className="relative flex flex-col m-5  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
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
                             Videos
                          </button>
                       </Link>
                       <Link href="/notes">
                          <button
                             className=" mt-auto button flex-1 hover:from-yellow-600"
                             onClick={handleSubject}>
                             Notes
                          </button>
                       </Link>
                    </div>
                 </div>
              )
            : null}
         {Object.keys(auth).length !== 0
            ? auth.user.role === "user" &&
              classe === auth.user.classe && (
                 <div className="relative flex flex-col m-5  bg-gray-800 z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
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
                             Videos
                          </button>
                       </Link>
                       <Link href="/notes">
                          <button
                             className=" mt-auto button flex-1 hover:from-yellow-600"
                             onClick={handleSubject}>
                             Notes
                          </button>
                       </Link>
                    </div>
                 </div>
              )
            : null}
      </>
   );
}

export default Subject;
