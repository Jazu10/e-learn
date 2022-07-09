import Head from "next/head";
import { SubjectItem, Banner } from "../components";
import { getData } from "../utils/fetchData";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

function Home(props) {
   const router = useRouter();

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;

   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };

   useEffect(() => {
      pushLogin();
   }, []);

   const [subjects, setSubjects] = useState(props.subjects);

   return (
      <>
         <div className="bg-gray-100 h-50">
            <Head className="bg-green-500">
               <title>E-Learn</title>
            </Head>
            <main className="mx-auto">
               <Banner />
               {subjects.length === 0 ? (
                  <h1 className="text-red-500">No subject</h1>
               ) : (
                  <SubjectItem subjects={subjects} auth={auth} />
               )}
            </main>
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

export default Home;
