import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";


//Updating Account details.
export const POST = async (req) => {
  try {
    await connectDB();

    const body = await req.json(); 
    const { email,password } = body;

    const newUSer = await User.findOne({email:email});
    if (newUSer) {
      return new Response(JSON.stringify({ error: "User Already Exist" }), { status: 404 });
    }

    const newUser = new User({
        email: email,
        username: email.split("@")[0],
        password:password
    });
    await newUser.save();

    return new Response(JSON.stringify({ message: "Signup Successful" }), { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return new Response(JSON.stringify({ error: "Failed to Signup" }), { status: 500 });
  }
};