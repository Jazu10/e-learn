import connectDB from "../../../utils/connectDB";
import Videos from "../../../models/videoModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "GET":
         await getVideo(req, res);
         break;
      case "DELETE":
         await deleteVideo(req, res);
         break;
   }
};

const getVideo = async (req, res) => {
   try {
      const { id } = req.query;
      const video = await Videos.findById(id);
      if (!video)
         return res.status(400).json({ err: "This video does not exist" });
      res.json({ video });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};

const deleteVideo = async (req, res) => {
   try {
      const { id } = req.query;
      await Videos.findByIdAndDelete({ _id: id });
      res.json({ msg: "Video deleted Successfully" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
