import connectDB from "../../../utils/connectDB";
import Quizes from "../../../models/quizModel";
// import validFeed from "../../../utils/validFeed";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "POST":
         await quiz(req, res);
         break;
   }
};

const quiz = async (req, res) => {
   try {
      // const { title, classe, subject, questions, users } = req.body;
      let question = req.body;
      let questions = JSON.stringify(req.body);

      // const quiz = await Quizes.create({
      //    title,
      //    classe,
      //    subject,
      //    questions,
      // });
      console.log(JSON.parse(questions));

      res.json({ msg: "New Quiz added!", quiz });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
