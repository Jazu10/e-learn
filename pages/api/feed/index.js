import connectDB from "../../../utils/connectDB";
import Feeds from "../../../models/feedModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "GET":
         await getFeeds(req, res);
         break;
   }
};

const getFeeds = async (req, res) => {
   try {
      const feeds = await Feeds.find().sort({ createdAt: -1, classe: -1 });
      res.json({ status: "success", result: feeds.length, feeds });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
