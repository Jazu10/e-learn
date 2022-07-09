import connectDB from "../../../utils/connectDB";
import Files from "../../../models/fileModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "GET":
         await getFiles(req, res);
         break;
   }
};

const getFiles = async (req, res) => {
   try {
      const files = await Files.find().sort({ classe: -1, subject: -1 });
      res.json({ status: "success", result: files.length, files });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
