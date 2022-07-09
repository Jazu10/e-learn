import Link from "next/link";
import { useRouter } from "next/router";
import { BiHomeHeart } from "react-icons/bi";
import { VscFlame } from "react-icons/vsc";
import { CgFileDocument } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

function Footer() {
   const router = useRouter();
   const isActive = (r) => {
      if (r === router.pathname) {
         return "link1";
      } else {
         return "link";
      }
   };

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;

   return (
      <>
         {Object.keys(auth).length !== 0 && (
            <div className="sticky text-white border-t-2 border-gray-700 flex flex-grow bottom-0 w-full justify-around py-4 bg-gray-900 z-50">
               <Link href="/">
                  <div className={isActive("/")}>
                     <BiHomeHeart size={30} />
                  </div>
               </Link>
               <Link href="/recentVideos">
                  <div className={isActive("/recentVideos")}>
                     <HiOutlineVideoCamera size={30} />
                  </div>
               </Link>
               <Link href="/recentNotes">
                  <div className={isActive("/recentNotes")}>
                     <CgFileDocument size={30} />
                  </div>
               </Link>
               <Link href="/feed">
                  <div className={isActive("/feed")}>
                     <VscFlame size={30} />
                  </div>
               </Link>
               <Link href="/profile">
                  <div className={isActive("/profile")}>
                     <FaRegUserCircle size={30} />
                  </div>
               </Link>
            </div>
         )}
      </>
   );
}

export default Footer;
