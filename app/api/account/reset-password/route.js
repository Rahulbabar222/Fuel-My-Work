import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";


//Reseting Password
export const PUT = async (req) => {
    try {
        await connectDB();

        const body = await req.json();
        const { password, email } = body;
        console.log("Incoming password:", password);

        const accountDetails = await User.findOne({ email: email });
        if (!accountDetails) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        accountDetails.password = password;
    
        await accountDetails.save();

    
        return new Response(JSON.stringify({ message: "Password Rest Successful" }), { status: 200 });
    } catch (error) {
        console.error("Reset error:", error);
        return new Response(JSON.stringify({ error: "Failed to Rest Password" }), { status: 500 });
    }
};