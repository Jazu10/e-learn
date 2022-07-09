import connectDB from "../../../utils/connectDB";
import Subjects from "../../../models/subjectModel";
import validSubject from "../../../utils/validSubject";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "POST":
         await subject(req, res);
         break;
   }
};

const subject = async (req, res) => {
   try {
      const { title, classe, thumbnail } = req.body;
      const errMsg = validSubject(title, classe, thumbnail);

      if (errMsg) return res.status(400).json({ err: errMsg });

      const newSubject = new Subjects({
         title,
         classe,
         thumbnail,
      });

      await newSubject.save();
      res.json({ msg: "New subject added!" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
