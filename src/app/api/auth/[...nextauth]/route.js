import NextAuth from "next-auth/next";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN_API } from "@/apis";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Username",
                    type: "email",
                    placeholder: "mata@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                try {
                    const res = await axios.post(
                        LOGIN_API,
                        {
                            email: credentials.email,
                            password: credentials.password,
                        },
                        {
                            headers: {
                                accept: "*/*",
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    return res.data;
                } catch (error) {
                    throw new Error(error.response.data.message);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...user, ...token };
        },
        async session({ user, session, token }) {
            session.user = token;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
