import { DataContext } from "../store/GlobalState";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";
import Head from "next/head";
import { UserItem } from "../components";

function test(props) {
   const [users, setUsers] = useState(props.users);

   const handleNext = () => {
      setQuestions([...questions, data]);
   };

   const handleSubmit = () => {
      setQuiz({ ...quiz, user, questions });
   };

   const user = users
      .filter((item) => item.role === "user")
      .map((item) => item._id);

   const data = { name: "foo", value: "bar" };
   const [questions, setQuestions] = useState([]);

   const [quiz, setQuiz] = useState({});
   console.log(quiz);
   return (
      <div>
         <button
            className="bg-red-500 w-full p-3 text-white font-bold rounded-md hover:bg-red-600 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-red-700"
            onClick={handleNext}>
            Next
         </button>
         <button
            className="bg-red-500 w-full p-3 text-white font-bold rounded-md hover:bg-red-600 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-red-700"
            onClick={handleSubmit}>
            Submit
         </button>
      </div>
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

export default test;
