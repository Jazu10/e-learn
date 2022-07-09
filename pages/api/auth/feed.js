import connectDB from "../../../utils/connectDB";
import Feeds from "../../../models/feedModel";
import validFeed from "../../../utils/validFeed";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "POST":
         await feed(req, res);
         break;
   }
};

const feed = async (req, res) => {
   try {
      const { title, classe, matter } = req.body;
      const errMsg = validFeed(title, classe, matter);

      if (errMsg) return res.status(400).json({ err: errMsg });

      const newfeed = new Feeds({
         title,
         classe,
         matter,
      });

      await newfeed.save();
      res.json({ msg: "New feed added!" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
