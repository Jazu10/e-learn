import connectDB from "../../../utils/connectDB";
import Subjects from "../../../models/subjectModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "DELETE":
         await deleteSubjects(req, res);
         break;
   }
};

const deleteSubjects = async (req, res) => {
   try {
      const { id } = req.query;
      await Subjects.findByIdAndDelete({ _id: id });
      res.json({ msg: "Subject deleted Successfully" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
