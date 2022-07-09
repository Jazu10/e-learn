import connectDB from "../../../utils/connectDB";
import Videos from "../../../models/videoModel";
import validVideo from "../../../utils/validVideo";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "POST":
         await video(req, res);
         break;
   }
};

const video = async (req, res) => {
   try {
      const { title, classe, subject, thumbnail, url, description } = req.body;
      const errMsg = validVideo(
         title,
         classe,
         subject,
         thumbnail,
         url,
         description,
       );

      if (errMsg) return res.status(400).json({ err: errMsg });


      const newVideo = new Videos({
         title,
         classe,
         subject,
         thumbnail,
         url,
         description,
      });

      await newVideo.save();
      res.json({ msg: "New video created!" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
