import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";
connectDB();

export default async (req, res) => {
   switch (req.method) {
      case "PATCH":
         await resetPassword(req, res);
         break;
   }
};

const resetPassword = async (req, res) => {
   try {
      const result = await auth(req, res);
      const { name, password, classe, avatar } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
         { _id: result.id },
         { name: name, classe: classe, password: passwordHash, avatar: avatar },
      );
      res.json({ msg: "Updated Successfully" });
   } catch (err) {
      return res.status(500).json({ err: err.message });
   }
};
