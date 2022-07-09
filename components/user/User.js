import Link from "next/link";
import Image from "next/image";
import { deleteData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";

function User({ id, name, classe, email, avatar, role }) {
   const [state, dispatch] = useContext(DataContext);
   const router = useRouter();
   const handleDelete = async () => {
      await deleteData(`user/${id}`);
      dispatch({ type: "NOTIFY", payload: { success: "User deleted" } });
      router.push("/");
   };
   return (
      <>
         {classe !== "class" ? (
            <tbody className="bg-white divide-y  divide-gray-200">
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                           <img
                              className="h-10 w-10 rounded-full"
                              src={avatar}
                              alt=""
                           />
                        </div>
                        <div className="ml-4">
                           <div className="text-sm font-medium text-white">
                              {name}
                           </div>
                           <div className="text-sm text-yellow-400">
                              {email}
                           </div>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {role}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                     {classe}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <a
                        onClick={handleDelete}
                        className="text-red-500 cursor-pointer hover:text-red-600">
                        Delete
                     </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-yellow-400 cursor-pointer hover:text-yellow-500">
                     <Link href={`/user/${id}`}>Edit</Link>
                  </td>
               </tr>
            </tbody>
         ) : null}
      </>
   );
}

export default User;
