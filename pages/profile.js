import React, { useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { getData } from "../utils/fetchData";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import ProgressBar from "@ramonak/react-progress-bar";
import { storage } from "../utils/firebase";

function profile(props) {
   const [subjects, setSubject] = useState(props.subjects);

   const classes = subjects
      .map((item) => item.classe)
      .filter((value, index, self) => self.indexOf(value) === index);

   const router = useRouter();

   const [state, dispatch] = useContext(DataContext);
   const { auth, cart } = state;

   const handleLogout = () => {
      Cookie.remove("refreshToken", { path: "api/auth/accessToken" });
      localStorage.removeItem("firstLogin");
      dispatch({ type: "AUTH", payload: {} });
      dispatch({
         type: "NOTIFY",
         payload: { success: "Successfully logged out!" },
      });
      router.push("/login");
   };

   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };

   useEffect(() => {
      pushLogin();
   }, [auth]);

   const initialState = {
      name: Object.keys(auth).length !== 0 ? auth.user.name : "",
      email: Object.keys(auth).length !== 0 ? auth.user.email : "",
      password: "",
      cf_password: "",
      classe: Object.keys(auth).length !== 0 ? auth.user.classe : "",
      avatar:
         "https://firebasestorage.googleapis.com/v0/b/elearn-ivory.appspot.com/o/images%2Fimg_avatar.png?alt=media&token=770346de-e209-4b59-8c5f-f2629a9f7793https://freepikpsd.com/media/2019/10/avatar-images-png-2-Images-PNG-Transparent.png",
   };
   const [userData, setUserData] = useState(initialState);
   const { name, email, password, cf_password, classe, avatar } = userData;

   const [image, setImage] = useState("");
   const [imageProgress, setImageProgress] = useState(0);

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleChangeImage = (e) => {
      if (e.target.files[0]) {
         setImage(e.target.files[0]);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const errMsg = valid(name, email, password, cf_password);
      if (errMsg)
         return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      else updateUser();
   };

   const updateUser = () => {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      patchData("user/updateProfile", userData, auth.token).then((res) => {
         if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.msg } });
         return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      });
      router.push("/login");
   };

   const handleUploadImage = (e) => {
      const uploadImageTask = storage.ref(`files/${image.name}`).put(image);
      uploadImageTask.on(
         "state_changed",
         (snapshot) => {
            const progress = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setImageProgress(progress);
         },
         (error) => {
            console.log(error);
         },
         () => {
            storage
               .ref("files")
               .child(image.name)
               .getDownloadURL()
               .then((imageurl) => {
                  setUserData({ ...userData, avatar: imageurl });
               });
         },
      );
   };

   function showClasse() {
      return (
         <>
            <label className="label1 pt-3" htmlFor="password">
               Class
            </label>
            <select
               onChange={handleChangeInput}
               value={classe}
               className="input1 mb-2 cursor-pointer"
               placeholder="Enter class"
               name="classe">
               <option value={auth.user.classe}>{auth.user.classe}</option>
               {auth.user.classe !== "class"
                  ? classes.map((item) =>
                       item !== "class" && item !== auth.user.classe ? (
                          <option key={item} value={item}>
                             {item}
                          </option>
                       ) : null,
                    )
                  : null}
            </select>
         </>
      );
   }

   return (
      <>
         {Object.keys(auth).length !== 0 && (
            <div className="w-full max-w-lg mx-auto md:my-20 p-10 md:border justify-center md:shadow-lg md:rounded-md">
               <Head>
                  <title>Profile</title>
               </Head>
               <form onSubmit={handleSubmit}>
                  <img
                     src={auth.user.avatar}
                     className="mx-auto rounded-full bg-gray-400 h-44 w-44 mb-10 hover:opacity-70 hover:cursor:pointer"
                  />
                  <label className="label1 pt-3" htmlFor="password">
                     Email
                  </label>
                  <input
                     className="input1 mb-2"
                     type="email"
                     defaultValue={auth.user.email}
                     disabled={true}
                     name="email"
                  />
                  <label className="label1 pt-3" htmlFor="password">
                     Name
                  </label>
                  <input
                     className="input1 mb-2"
                     type="text"
                     placeholder={auth.user.name}
                     value={name}
                     name="name"
                     onChange={handleChangeInput}
                  />
                  {auth.user.classe !== "class" ? showClasse() : null}
                  <label className="label1 pt-3">File Upload</label>
                  <div className="flex flex-row space-x-2 md:space-x-10">
                     <input
                        className="input1"
                        type="file"
                        placeholder="add image"
                        accept="image/*"
                        name="image"
                        onChange={handleChangeImage}
                     />
                     <button
                        onClick={handleUploadImage}
                        type="button"
                        disabled={!image}
                        className="text-white bg-gray-700 rounded-md p-2">
                        Upload
                     </button>
                  </div>
                  <ProgressBar
                     completed={
                        imageProgress === 0
                           ? imageProgress
                           : !avatar
                           ? imageProgress - 2
                           : imageProgress
                     }
                     bgColor={
                        avatar !==
                        "https://firebasestorage.googleapis.com/v0/b/elearn-ivory.appspot.com/o/images%2Fimg_avatar.png?alt=media&token=770346de-e209-4b59-8c5f-f2629a9f7793https://freepikpsd.com/media/2019/10/avatar-images-png-2-Images-PNG-Transparent.png"
                           ? "#f2b400"
                           : "#00FFFF"
                     }
                     className="w-full my-2 justify-self-center pl-5"
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
                  <label className="label1 pt-3" htmlFor="cfpassword">
                     Confirm Password
                  </label>
                  <input
                     className="input1 mb-2"
                     type="password"
                     placeholder="Enter password again"
                     name="cf_password"
                     value={cf_password}
                     onChange={handleChangeInput}
                  />
                  <button className="bg-yellow-400 w-full p-3 mt-5 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700">
                     Update User
                  </button>
                  <button
                     className="bg-red-500 w-full p-3 text-white font-bold rounded-md hover:bg-red-600 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                     onClick={handleLogout}>
                     Logout
                  </button>
               </form>
            </div>
         )}
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

export default profile;
