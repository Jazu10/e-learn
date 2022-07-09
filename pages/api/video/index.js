import connectDB from "../../../utils/connectDB";
import Videos from "../../../models/videoModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "GET":
         await getVideos(req, res);
         break;
   }
};

const getVideos = async (req, res) => {
   try {
      const videos = await Videos.find().sort({createdAt:-1});
      res.json({ status: "success", result: videos.length, videos });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
