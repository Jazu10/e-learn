import connectDB from "../../../utils/connectDB";
import Feeds from "../../../models/feedModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "DELETE":
         await deleteFeeds(req, res);
         break;
   }
};

const deleteFeeds = async (req, res) => {
   try {
      const { id } = req.query;
      await Feeds.findByIdAndDelete({ _id: id });
      res.json({ msg: "Feed deleted Successfully" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
