import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { User } from "@/models/User";
import { Payment } from "@/models/Payment";
import { connectDB } from "@/db/mongoose";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "github") { 
                // Connect to DB
                await connectDB();

                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                        name:user.name
                    });
                    await newUser.save();
                    
                }
            }
            return true; 
        },

        async session({ session, token, user }) {
            const dbUSer= await User.findOne({email:session.user.email})
            session.user.id=dbUSer._id;
            session.user.name=dbUSer.name;
            session.user.username=dbUSer.username;
            session.user.profileimage=dbUSer.profileimage;
            session.user.coverimage=dbUSer.coverimage;
            session.user.createdAt=dbUSer.createdAt;
            session.user.updatedAt=dbUSer.updatedAt;
            
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };