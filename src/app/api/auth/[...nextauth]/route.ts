import db from "@/db/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@email.com" },
        password: { label: "Password", type: "password", placeholder: "********" }
      },
      async authorize(credentials, req) {

        const userFound = await db.usuario.findUnique({
          where: {
            email: credentials?.email
          }
        });

        if (!userFound) {
          throw new Error("Usuario no encontrado");
        }

        const matchPassword = await bcrypt.compare(credentials?.password || "", userFound.password);

        if (!matchPassword) {
          throw new Error("Contraseña no valida");
        }

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  }
}

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST
}