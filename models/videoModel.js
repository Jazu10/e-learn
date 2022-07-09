import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true,
      },
      classe: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
      thumbnail: {
         type: String,
         required: true,
      },
      subject: {
         type: String,
         required: true,
      },
      description: {
         type: String,
      },
   },
   {
      timestamps: true,
   },
);

let Dataset = mongoose.models.video || mongoose.model("video", videoSchema);
export default Dataset;
