import Head from "next/head";
import { FeedItem } from "../components";
import { getData } from "../utils/fetchData";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { useRouter } from "next/router";

function Feed(props) {
   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const [feeds, setFeeds] = useState(props.feeds);
   const router = useRouter();
   // if (Object.keys(auth).length === 0)
   //    router.push("/login");
   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };

   useEffect(() => {
      pushLogin();
   }, []);
   return (
      <>
         {Object.keys(auth).length !== 0 && (
            <div className="mx-auto">
               <Head>
                  <title>{auth.user.classe}</title>
               </Head>
               <div>
                  {feeds.length === 0 ? (
                     <h1 className="text-red-500">No Feeds</h1>
                  ) : (
                     <FeedItem feeds={feeds} auth={auth} />
                  )}
               </div>
            </div>
         )}
      </>
   );
}

export async function getServerSideProps() {
   const res = await getData("feed");

   return {
      props: {
         feeds: res.feeds,
         result: res.result,
      },
   };
}

export default Feed;
