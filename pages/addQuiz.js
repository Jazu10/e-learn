import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
// import validFeed from "../utils/validSubject";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";



function addQuiz(props) {
   const [i, setI] = useState(1);

   const initialState = {
      title: "",
      classe: "",
      subject: "",
      questions: [],
      users: [],
   };

   const questionState = {
      question: "",
      correct: "",
      option: [],
   };

   const [optionData, setOptionData] = useState([]);

   const [quest, setQuest] = useState([]);

   const [questData, setQuestData] = useState(questionState);

   const [quizData, setQuizData] = useState(initialState);

   const [data] = useState(props.subjects);

   const classes = data
      .map((item) => item.classe)
      .filter((value, index, self) => self.indexOf(value) === index);

   const subjects = data
      .map((item) => item.title)
      .filter((value, index, self) => self.indexOf(value) === index);

   const { title, classe, subject, questions } = quizData;

   const { question, correct } = questData;

   const { option } = optionData;

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setQuizData({ ...quizData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleChangeQuestion = (e) => {
      const { name, value } = e.target;
      setQuestData({ ...questData, [name]: value });
   };

   const handleChangeOptions = (e) => {
      const { name, value } = e.target;
      setOptionData([...optionData, { value }]);
      setQuestData({ ...questData, option: optionData });
   };

   const handleAddQuestion = () => {
      // e.preventDefault();
      setQuizData({ ...quizData, questions: quest });
      const errMsg = validQuestData(questData);
      if (!errMsg) {
         setQuest([...quest, { ...questData }]);
         setOptionData([]);
         setI(i + 1);
         setQuestData(questionState);

         return dispatch({
            type: "NOTIFY",
            payload: { success: "Question added successfully" },
         });
      } else return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
   };

   const validQuizData = (quizData) => {
      if (quizData.classe === "") return "Please select Class";
      if (quizData.subject === "") return "Please select Subject";
      if (quizData.title === "") return "Please enter Title";
      if (quizData.questions.length === 0)
         return "Please enter atleast 2 Question";
   };

   const validQuestData = (questData) => {
      setQuizData({ ...quizData, questions: quest });
      if (questData.question === "") return "Please enter question";
      if (questData.option.length === 0) return "Please enter options";
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const errMsg = validQuizData(quizData);
      if (errMsg)
         return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("auth/quiz", quizData);

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
   };

   const handleView = () => {
      console.log(quizData);
   };

   // if (Object.keys(auth).length !== 0) {
   //    auth.user.role !== "admin" ? router.push("/") : null;
   // }

   return (
      <>
         <div className="w-full max-w-lg mx-auto md:border self-center md:my-10 p-5 md:p-10 md:shadow-lg md:rounded-md">
            <Head>
               <title>Add Quiz</title>
            </Head>
            <form onSubmit={handleSubmit}>
               <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
                  Add Quiz
               </h1>
               <div className="flex flex-wrap mb-6">
                  <label className="label1 pt-3" htmlFor="class">
                     Class
                  </label>
                  <select
                     onChange={handleChangeInput}
                     value={classe}
                     className="input1 mb-2 cursor-pointer"
                     type="number"
                     placeholder="Enter district"
                     name="classe">
                     <option value="">Select an Option</option>
                     {classes.map((item) => (
                        <option key={item} value={item}>
                           {item}
                        </option>
                     ))}
                  </select>
                  <label className="label1 pt-3" htmlFor="class">
                     Subject
                  </label>
                  <select
                     onChange={handleChangeInput}
                     value={subject}
                     className="input1 mb-2 cursor-pointer"
                     type="number"
                     placeholder="Enter district"
                     name="subject">
                     <option value="">Select an Option</option>
                     {subjects.map((item) => (
                        <option key={item} value={item}>
                           {item}
                        </option>
                     ))}
                  </select>
                  <label className="label1 pt-3" htmlFor="subject">
                     Title
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter the Quiz title"
                     name="title"
                     value={title}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3" htmlFor="subject">
                     Question {i}
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter the subject"
                     name="question"
                     value={question}
                     onChange={handleChangeQuestion}
                  />

                  <label className="label1 pt-3" htmlFor="subject">
                     Option 1
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter Option 1"
                     name="option"
                     value={option}
                     onBlur={handleChangeOptions}
                  />
                  <label className="label1 pt-3" htmlFor="subject">
                     Option 2
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter Option 2"
                     name="option"
                     value={option}
                     onBlur={handleChangeOptions}
                  />
                  <label className="label1 pt-3" htmlFor="subject">
                     Option 3
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter Option 3"
                     name="option"
                     value={option}
                     onBlur={handleChangeOptions}
                  />
                  <label className="label1 pt-3" htmlFor="subject">
                     Option 4
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter Option 4"
                     name="option"
                     value={option}
                     onBlurCapture={handleChangeOptions}
                  />
                  <label className="label1 pt-3" htmlFor="subject">
                     Correct Answer
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter the subject"
                     name="correct"
                     value={correct}
                     onChange={handleChangeQuestion}
                  />
               </div>
               <input
                  type="button"
                  className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                  onClick={handleAddQuestion}
                  value="Add Question"
               />
               <input
                  type="button"
                  className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                  onClick={handleView}
                  value="View"
               />
               <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700">
                  Add Quiz
               </button>
            </form>
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

export default addQuiz;
