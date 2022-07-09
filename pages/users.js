import { DataContext } from "../store/GlobalState";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";
import Head from "next/head";
import { UserItem } from "../components";

function users(props) {
   const [state, dispatch] = useContext(DataContext);
   const { subject, auth } = state;
   const router = useRouter();
   const [users, setUsers] = useState(props.users);
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
                  <title>Update User</title>
               </Head>
               <div>
                  {users.length === 0 ? (
                     <h1 className="text-red-500">No files</h1>
                  ) : (
                     <UserItem users={users} auth={auth} />
                  )}
               </div>
            </div>
         )}
      </>
   );
}

export async function getServerSideProps() {
   const res = await getData("user");
   return {
      props: {
         users: res.users,
      },
   };
}

export default users;
