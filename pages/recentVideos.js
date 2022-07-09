import { useContext, useState, useEffect } from "react";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";
import Video from "../components/videos/Video";
import { DataContext } from "../store/GlobalState";

function recentVideos(props) {
   const [data, setData] = useState(props.videos);
   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();
   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };

   useEffect(() => {
      pushLogin();
   }, []);
   // const router = useRouter();
   // if (Object.keys(auth).length === 0) router.push("/login");

   return (
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {data.map(
            ({ _id, title, thumbnail, classe, url, description, subject }) => (
               <Video
                  key={_id}
                  id={_id}
                  title={title}
                  thumbnail={thumbnail}
                  classe={classe}
                  url={url}
                  description={description}
                  subject={subject}
                  auth={auth}
               />
            ),
         )}
      </div>
   );
}
export async function getServerSideProps() {
   const res = await getData("video");

   return {
      props: {
         videos: res.videos,
         result: res.result,
      },
   };
}

export default recentVideos;
