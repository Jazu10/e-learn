import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
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
      matter: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

let Dataset = mongoose.models.feed || mongoose.model("feed", feedSchema);
export default Dataset;
