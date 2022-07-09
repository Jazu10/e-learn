import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
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
      subject: {
         type: String,
         required: true,
      },
      questions: [
         {
            question: {
               type: String,
               required: true,
            },
            correct: {
               type: String,
               required: true,
            },
            option: [
               {
                  value: {
                     type: String,
                     required: true,
                  },
               },
            ],
         },
      ],
      users: [
         {
            id: {
               type: String,
            },
            name: { type: String },
            attempted: {
               type: Boolean,
            },
            score: {
               type: Number,
            },
         },
      ],
   },
   {
      timestamps: true,
   },
);

let Dataset = mongoose.models.quiz || mongoose.model("quiz", quizSchema);
export default Dataset;
