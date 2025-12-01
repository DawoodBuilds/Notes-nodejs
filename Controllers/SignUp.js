import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  First_name: z.string().min(2).max(20),
  Last_name: z.string().min(2).max(20),
  email: z.email(),
  password: z.string().min(8),
});

export default async function signUp(req, res) {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid data" });
    const { First_name, Last_name, email, password } = req.body;
    const ExistingEmail = await User.findOne({ email });
    if (ExistingEmail)
      return res
        .status(409)
        .json({ error: "Email Already Exists", success: false });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = User({
      First_name,
      Last_name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "User Registered Successfully", success: true });
  } catch (err) {
    return res.status(500).json({ error: `Error Occurred: ${err}` });
  }
}
