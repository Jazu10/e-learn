import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import Image from "next/image";
import { DataContext } from "../../store/GlobalState";
import ReactPlayer from "react-player";

function video(props) {
   const [video] = useState(props.video);
   const [state, dispatch] = useContext(DataContext);

   return (
      <div className="md:m-5 md:mt-16">
         <Head>
            <title>{video.title}</title>
         </Head>
         <main className="max-w-screen-2xl mx-auto mt-5">
            <div className="flex flex-wrap">
               <div className="px-5 mb-7 w-full md:w-7/12">
                  <div className="w-full mb-4">
                     <ReactPlayer
                        url={video.url}
                        controls
                        className="h-full"
                        width="100%"
                     />
                  </div>
               </div>
               <div className="px-5 mb-10 w-full md:w-5/12 md:min-h-screen">
                  <p className="text-xl text-white">{video.classe}</p>
                  <h1 className="my-2 text-3xl text-yellow-400 mb-7">
                     {video.title}
                  </h1>
                  <p className="text-white text-base mb-5 text-justify">
                     {video.description}
                  </p>
               </div>
            </div>
         </main>
      </div>
   );
}

export async function getServerSideProps({ params: { id } }) {
   const res = await getData(`video/${id}`);
   const result = await getData("video");
   return {
      props: {
         video: res.video,
      },
   };
}

export default video;
