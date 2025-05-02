import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";
import { Userprofile } from "@/models/Userprofile";

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const username = await params.username;

        const user = await User.findOne({ username });

        if (!user) {
            return new Response(JSON.stringify({ error: "Username not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const userProfile = await Userprofile.findById(user._id)
        console.log(userProfile)

        return new Response(JSON.stringify({
            name: user.name,
            username: user.username,
            email: user.email,
            id:userProfile?._id || user._id,
            profileImage:userProfile?.profileImage || "/profile.png",
            coverImage:userProfile?.coverImage || "/cover.png",
            about:userProfile?.about || "",
            fuelCost:userProfile?.fuelCost || 1,
            introLink:userProfile?.introLink || "",
            instagram:userProfile?.instagram || "",
            youtube:userProfile?.youtube || "",
            github:userProfile?.github || "",
            website:userProfile?.website || ""

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