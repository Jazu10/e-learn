import connectDB from "../../../utils/connectDB";
import Files from "../../../models/fileModel";
import validFile from "../../../utils/validFile";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "POST":
         await file(req, res);
         break;
   }
};

const file = async (req, res) => {
   try {
      const { title, classe, file, subject } = req.body;
      const errMsg = validFile(title, classe, file, subject);

      if (errMsg) return res.status(400).json({ err: errMsg });

      const newFile = new Files({
         title,
         classe,
         file,
         subject,
      });

      await newFile.save();
      res.json({ msg: "New note added!" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
