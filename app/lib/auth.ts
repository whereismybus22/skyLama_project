import { User } from "@/db/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { connectToDatabase } from "./mongoose";

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "abc" },
            email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials: any) {
            console.log();
            
            await connectToDatabase();
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await User.findOne({
                email: credentials.email
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        username: existingUser.username,
                        email: existingUser.email
                    }
                }
                return null;
            }

            try {
                const user = await User.create({
                    username: credentials.username,
                    email: credentials.email,
                    password: hashedPassword
                });
            
                return {
                    id: user.id.toString(),
                    username: user.username,
                    email: user.email
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.username = typeof user.name === "string" ? user.name : undefined;
            }
            return token;
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.sub as string;
                session.user.username = token.username as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
        return `${baseUrl}/dashboard`;
        }
    },
    pages:{
        signIn:"/login"
    },
}