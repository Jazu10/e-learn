import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";

connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "GET":
         await getUsers(req, res);
         break;
   }
};

const getUsers = async (req, res) => {
   try {
      const users = await Users.find().sort({ classe: -1, subject: -1 });
      res.json({ status: "success", result: users.length, users });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
