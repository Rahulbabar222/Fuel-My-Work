import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";


//Updating Account details.
export const PUT = async (req) => {
  try {
    await connectDB();

    const body = await req.json(); 
    const { name, username, email, profileimage, coverimage, id } = body;

    const accountDetails = await User.findById(id);
    if (!accountDetails) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    accountDetails.name = name;
    accountDetails.username = username;
    accountDetails.email = email;
    accountDetails.profileimage = profileimage;
    accountDetails.coverimage = coverimage;

    await accountDetails.save();

    return new Response(JSON.stringify({ message: "Account updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return new Response(JSON.stringify({ error: "Failed to update account" }), { status: 500 });
  }
};