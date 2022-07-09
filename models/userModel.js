import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      classe: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: "user",
      },
      root: {
         type: Boolean,
         required: false,
      },
      avatar: {
         type: String,
         default:
            "https://firebasestorage.googleapis.com/v0/b/elearn-ivory.appspot.com/o/images%2Fimg_avatar.png?alt=media&token=770346de-e209-4b59-8c5f-f2629a9f7793",
      },
   },
   {
      timestamps: true,
   },
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
