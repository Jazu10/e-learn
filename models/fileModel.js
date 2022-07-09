import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
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
      file: {
         type: String,
         required: true,
      },
      subject: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

let Dataset = mongoose.models.file || mongoose.model("file", fileSchema);
export default Dataset;
