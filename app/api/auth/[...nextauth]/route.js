import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Users from "@/app/libs/models/Schema";
import { connectionStr } from "app/libs/mongodb"; 

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      const { email, name } = user;

      try {
        await mongoose.connect(connectionStr); // Make sure mongoose is imported
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
          // User already exists, return a response indicating the user exists
          return true; // Continue with login
        } else {
          // User doesn't exist, save the new user
          const newUser = new Users({ email, name });
          await newUser.save();
          return true; // Continue with login
        }
      } catch (error) {
        console.error('Error saving user:', error);
        return false; // Return false on error
      }
    },
  },
});

export { handler as GET, handler as POST };
