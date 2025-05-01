import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";

export const GET = async (req,{params}) => {
    try {
        await connectDB();
        
        const username = await params.username;

        const user = await User.findOne({ username });
        console.log(user)

        if (!user) {
            return new Response(JSON.stringify({ error: "Username not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({
            name:user.name,
            username:user.username,
            email:user.email,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in GET handler:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};