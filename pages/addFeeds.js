import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import validFeed from "../utils/validSubject";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";

function addFeeds(props) {
   const initialState = {
      title: "",
      classe: "",
      matter: "",
   };

   const [feedData, setFeedData] = useState(initialState);
   const [data] = useState(props.subjects);
   const classes = data
      .map((item) => item.classe)
      .filter((value, index, self) => self.indexOf(value) === index);

   const { title, classe, matter } = feedData;

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setFeedData({ ...feedData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const errMsg = validFeed(title, classe, matter);
      if (errMsg)
         return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("auth/feed", feedData);
      if (res.err)
         return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
   };

   if (Object.keys(auth).length !== 0) {
      auth.user.role !== "admin" ? router.push("/") : null;
   }

   return (
      <>
         <div className="w-full max-w-lg mx-auto md:border self-center md:my-10 p-5 md:p-10 md:shadow-lg md:rounded-md">
            <Head>
               <title>Add Feed</title>
            </Head>
            <form onSubmit={handleSubmit}>
               <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
                  Add Feed
               </h1>
               <div className="flex flex-wrap mb-6">
                  <label className="label1 pt-3" htmlFor="class">
                     Class
                  </label>
                  <select
                     onChange={handleChangeInput}
                     value={classe}
                     className="input1 mb-2 cursor-pointer"
                     type="number"
                     placeholder="Enter district"
                     name="classe">
                     <option value="">Select an Option</option>
                     {classes.map((item) => (
                        <option key={item} value={item}>
                           {item}
                        </option>
                     ))}
                  </select>
                  <label className="label1 pt-3" htmlFor="subject">
                     Title
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter the subject"
                     name="title"
                     value={title}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3" htmlFor="subject">
                     Description
                  </label>
                  <textarea
                     className="input1"
                     type="text"
                     placeholder="Enter the body"
                     name="matter"
                     value={matter}
                     onChange={handleChangeInput}
                  />
               </div>
               <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700">
                  Add Feed
               </button>
            </form>
         </div>
         {/* <div className="mt-10">
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {data.map(({ _id, title, thumbnail, classe }) => (
                  <Subject
                     key={_id}
                     id={_id}
                     title={title}
                     thumbnail={thumbnail}
                     classe={classe}
                  />
               ))}
            </div>
         </div> */}
      </>
   );
}
export async function getServerSideProps() {
   const res = await getData("subject");

   return {
      props: {
         subjects: res.subjects,
         result: res.result,
      },
   };
}

export default addFeeds;
