import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";
import Note from "../components/notes/Note";
import { DataContext } from "../store/GlobalState";

function recentNotes(props) {
   const [data, setData] = useState(props.files);
   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();
   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };

   useEffect(() => {
      pushLogin();
   }, []);

   return (
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {data.map(({ _id, title, file, classe, subject }) => (
            <Note
               key={_id}
               id={_id}
               title={title}
               file={file}
               classe={classe}
               subject={subject}
               auth={auth}
            />
         ))}
      </div>
   );
}
export async function getServerSideProps() {
   const res = await getData("file");

   return {
      props: {
         files: res.files,
         result: res.result,
      },
   };
}

export default recentNotes;
