import connectDB from "../../../utils/connectDB";
import Files from "../../../models/fileModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "DELETE":
         await deleteFiles(req, res);
         break;
   }
};

const deleteFiles = async (req, res) => {
   try {
      const { id } = req.query;
      await Files.findByIdAndDelete({ _id: id });
      res.json({ msg: "Notes deleted Successfully" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
