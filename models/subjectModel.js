import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
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
      thumbnail: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

let Dataset =
   mongoose.models.subject || mongoose.model("subject", subjectSchema);
export default Dataset;
