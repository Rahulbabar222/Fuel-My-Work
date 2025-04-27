import mongoose from "mongoose";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { User } from "@/models/User";
import { Payment } from "@/models/Payment";

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
                await mongoose.connect("mongodb://localhost:27017/FuelmyworkDB");

                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],

                    });
                    await newUser.save();
                    
                }
            }
            return true; 
        },

        async session({ session, token, user }) {
            const dbUSer= await User.findOne({email:session.user.email})
            session.user.name=dbUSer.username
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };