import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

function Login() {
   const initialState = { email: "", password: "" };
   const [userData, setUserData] = useState(initialState);

   const { email, password } = userData;

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();

      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("auth/login", userData);
      if (res.err)
         return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      dispatch({
         type: "AUTH",
         payload: {
            token: res.access_token,
            user: res.user,
         },
      });

      Cookie.set("refreshToken", res.refresh_token, {
         path: "api/auth/accessToken",
         expires: 7,
      });
      localStorage.setItem("firstLogin", true);
   };

   useEffect(() => {
      if (Object.keys(auth).length !== 0) router.push("/");
   }, [auth]);

   return (
      <div className="w-full max-w-lg mx-auto md:my-20 md:p-10 p-5 md:border md:shadow-lg md:rounded-md">
         <Head>
            <title>Sign In</title>
         </Head>
         <form onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
               Sign In
            </h1>
            <div className="flex flex-wrap mb-6">
               <label className="label1" htmlFor="email">
                  Email
               </label>
               <input
                  className="input1"
                  type="text"
                  placeholder="Enter your email id"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
               />
               <label className="label1 pt-3" htmlFor="password">
                  Password
               </label>
               <input
                  className="input1 mb-2"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
               />
            </div>
            <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
               Sign In
            </button>
            <p className="text-white">
               new user ?
               <Link href="/register">
                  <a className="pt-2 text-yellow-400 hover:underline hover:text-yellow-400 cursor-pointer px-1">
                     Register
                  </a>
               </Link>
            </p>
         </form>
      </div>
   );
}

export default Login;
