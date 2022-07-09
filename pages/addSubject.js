import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import validSubject from "../utils/validSubject";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";
import { storage } from "../utils/firebase";
import ProgressBar from "@ramonak/react-progress-bar";
import Subject from "../components/subjects/Subject";

function addVideo(props) {
   const initialState = {
      title: "",
      classe: "",
      thumbnail: "",
   };

   const [subjectData, setSubjectData] = useState(initialState);
   const [data] = useState(props.subjects);

   const { title, classe, thumbnail } = subjectData;

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();

   const [image, setImage] = useState("");
   const [imageProgress, setImageProgress] = useState(0);

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setSubjectData({ ...subjectData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleChangeImage = (e) => {
      if (e.target.files[0]) {
         setImage(e.target.files[0]);
      }
   };

   const handleUploadImage = (e) => {
      const uploadImageTask = storage.ref(`images/${image.name}`).put(image);
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
               .ref("images")
               .child(image.name)
               .getDownloadURL()
               .then((imageurl) => {
                  setSubjectData({ ...subjectData, thumbnail: imageurl });
               });
         },
      );
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const errMsg = validSubject(title, classe, thumbnail);
      if (errMsg)
         return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("auth/subject", subjectData);
      if (res.err)
         return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      router.reload();
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
   };

   if (Object.keys(auth).length !== 0) {
      auth.user.root !== true ? router.push("/") : null;
   }

   return (
      <>
         <div className="w-full max-w-lg mx-auto md:border self-center md:my-10 p-5 md:p-10 md:shadow-lg md:rounded-md">
            <Head>
               <title>Add Subject</title>
            </Head>
            <form onSubmit={handleSubmit}>
               <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
                  Add Subject
               </h1>
               <div className="flex flex-wrap mb-6">
                  <label className="label1 pt-3" htmlFor="class">
                     Class
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter class"
                     name="classe"
                     value={classe}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3" htmlFor="subject">
                     Subject
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter subject"
                     name="title"
                     value={title}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3">thumbnail</label>
                  <div className="flex flex-row space-x-2 md:space-x-10">
                     <input
                        className="input1"
                        type="file"
                        accept="image/*"
                        placeholder="add video"
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
                           : !thumbnail
                           ? imageProgress - 2
                           : imageProgress
                     }
                     bgColor={thumbnail ? "#f2b400" : "#00FFFF"}
                     className="w-full my-2 justify-self-center pl-5"
                  />
               </div>
               <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700">
                  Add Subject
               </button>
            </form>
         </div>
         <div className="mt-10">
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
         </div>
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

export default addVideo;
