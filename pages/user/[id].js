import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import Image from "next/image";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import { patchData } from "../../utils/fetchData";
import { useRouter } from "next/router";

function user(props) {
   const [user] = useState(props.user);
   const [state, dispatch] = useContext(DataContext);
   const { auth, cart } = state;
   const router = useRouter();

   const [userData, setUserData] = useState(user);

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      patchData("user/updateRole", userData, auth.token).then((res) => {
         if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.msg } });
         return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      });
      router.push("/login");
   };

   return (
      <div className="w-full max-w-lg mx-auto md:my-20 p-10 md:border justify-center md:shadow-lg md:rounded-md">
         <Head>
            <title>User Update</title>
         </Head>
         <form onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
               Update User
            </h1>
            <div className="flex flex-wrap mb-6">
               <label className="label1" htmlFor="email">
                  Name
               </label>
               <input
                  className="input1 cursor-not-allowed"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  disabled={true}
                  value={user.name}
               />
               <label className="label1 pt-3" htmlFor="password">
                  Email
               </label>
               <input
                  className="input1 mb-2 cursor-not-allowed"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  disabled={true}
                  value={user.email}
               />
               <label className="label1 pt-3" htmlFor="cfpassword">
                  Class
               </label>
               <input
                  className="input1 mb-2 cursor-not-allowed"
                  type="text"
                  placeholder="Enter Class"
                  name="class"
                  disabled={true}
                  value={user.classe}
               />
               <label className="label1 pt-3" htmlFor="cfpassword">
                  Role
               </label>
               <select
                  onChange={handleChangeInput}
                  className="input1 mb-2 cursor-pointer"
                  type="text"
                  placeholder="Enter Role"
                  name="role">
                  <option value={user.role}>Select an Option</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
               </select>
            </div>
            <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
               Update User
            </button>
         </form>
      </div>
   );
}

export async function getServerSideProps({ params: { id } }) {
   const res = await getData(`user/${id}`);
   const result = await getData("user");
   return {
      props: {
         user: res.user,
      },
   };
}

export default user;
