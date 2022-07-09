import React, { useContext, useState } from "react";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { FaPagelines } from "react-icons/fa";
import { BiBookHeart } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import Headroom from "react-headroom";

function Header() {
   const router = useRouter();

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;

   const loggedRouter = () => {
      return (
         <div className="dropdown items-center mt-2 px-2">
            <div className="inline-block relative focus:outline-none">
               <button className="rounded inline-flex items-center focus:outline-none">
                  <img
                     src={auth.user.avatar}
                     className="h-8 w-8 rounded-full bg-white ring-2 ring-yellow-400 image"
                  />
                  <p className="px-2 font-bold text-white hidden md:flex">
                     {auth.user.name}
                  </p>
               </button>
               {Object.keys(auth).length !== 0
                  ? auth.user.root === true && (
                       <ul className="unordered">
                          <Link href="/addSubject">
                             <li className="list md:text-md rounded-t-md whitespace-no-wrap">
                                Subjects
                             </li>
                          </Link>
                          <Link href="/addVideo">
                             <li className="list md:text-md whitespace-no-wrap">
                                Videos
                             </li>
                          </Link>
                          <Link href="/addNotes">
                             <li className="list md:text-md rounded-b-md whitespace-no-wrap">
                                Notes
                             </li>
                          </Link>
                          {/* <Link href="/addQuiz">
                             <li className="list md:text-md rounded-b-md whitespace-no-wrap">
                                Quizes
                             </li>
                          </Link> */}
                          <Link href="/addFeeds">
                             <li className="list md:text-md rounded-b-md whitespace-no-wrap">
                                Feeds
                             </li>
                          </Link>
                          <Link href="/users">
                             <li className="list md:text-md rounded-b-md whitespace-no-wrap">
                                Users
                             </li>
                          </Link>
                       </ul>
                    )
                  : null}
               {Object.keys(auth).length !== 0
                  ? auth.user.role === "admin" &&
                    auth.user.root === undefined && (
                       <ul className="unordered md:text-md">
                          <Link href="/addVideo">
                             <li className="list md:text-md rounded-t-md whitespace-no-wrap">
                                Videos
                             </li>
                          </Link>
                          <Link href="/addNotes">
                             <li className="list md:text-md rounded-b-md whitespace-no-wrap">
                                Notes
                             </li>
                          </Link>
                          {/* <Link href="/addQuiz">
                             <li className="list md:text-md rounded-b-md whitespace-no-wrap">
                                Quizes
                             </li>
                          </Link> */}
                          <Link href="/addFeeds">
                             <li className="list md:text-md rounded-b-md whitespace-no-wrap">
                                Feeds
                             </li>
                          </Link>
                       </ul>
                    )
                  : null}
            </div>
         </div>
      );
   };

   const isActive = (r) => {
      if (r === router.pathname) {
         return "link1";
      } else {
         return "link";
      }
   };

   return (
      <Headroom style={{ zIndex: 50 }}>
         <nav className="sticky top-0 z-50">
            <div className="py-2 md:py-2 flex font-bold border-b-2 border-gray-700 bg-gray-900  items-center">
               <Link href="/">
                  <div className="mx-4 flex md:flex-grow-0 my-1 items-center text-white hover:text-gray-200 text-3xl p-1 cursor-pointer space-x-3">
                     <BiBookHeart size={35} className="text-yellow-400" />
                     <h1 className="hidden md:inline text-white">E-Learn</h1>
                  </div>
               </Link>
               <div className="flex-grow">
                  <p className="text-yellow-400 md:hidden text-2xl text-center">
                     E-Learn
                  </p>
               </div>
               <div className="flex mx-4 text-white text-lg space-x-3 md:text-xl md:space-x-4 items-center">
                  {Object.keys(auth).length === 0 ? (
                     <Link href="/login">
                        <div className="text-yellow-400 cursor-pointer">
                           Login
                        </div>
                     </Link>
                  ) : (
                     loggedRouter()
                  )}
               </div>
            </div>
         </nav>
      </Headroom>
   );
}

export default Header;
