import connectDB from "../../../utils/connectDB";
import Subjects from "../../../models/subjectModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "GET":
         await getSubjects(req, res);
         break;
      case "DELETE":
         await deleteSubjects(req, res);
         break;
   }
};

const getSubjects = async (req, res) => {
   try {
      const subjects = await Subjects.find().sort({ classe: 1 });
      res.json({ status: "success", result: subjects.length, subjects });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};


