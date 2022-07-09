import { DataContext } from "../store/GlobalState";
import { useContext, useState,useEffect } from "react";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";
import Head from "next/head";
import { VideoItem } from "../components";

function videos(props) {
   const [state, dispatch] = useContext(DataContext);
   const { subject, auth } = state;
   const [videos, setvideos] = useState(props.videos);

   const router = useRouter();
   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };
   const pushHome = () => {
      Object.keys(subject).length === 0 && router.replace("/");
   };

   useEffect(() => {
      pushLogin();
      pushHome();
   }, []);

   return (
      <>
         {Object.keys(auth).length !== 0 && (
            <div className="mx-auto">
               <Head>
                  <title>
                     {auth.user.classe}-{subject.title}
                  </title>
               </Head>
               <div>
                  {videos.length === 0 ? (
                     <h1 className="text-red-500">No videos</h1>
                  ) : (
                     <VideoItem
                        videos={videos}
                        auth={auth}
                        subjects={subject}
                     />
                  )}
               </div>
            </div>
         )}
      </>
   );
}

export async function getServerSideProps() {
   const res = await getData("video");
   return {
      props: {
         videos: res.videos,
      },
   };
}

export default videos;
