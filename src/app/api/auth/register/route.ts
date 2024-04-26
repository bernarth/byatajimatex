import db from "@/db/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
  try {
    const data = await request.json();
    const userEmailFound = await db.usuario.findUnique({
      where: {
        email: data.email
      }
    });

    if (userEmailFound) {
      return NextResponse.json({
        message: "El email ya existe"
      }, {
        status: 400
      });
    }

    const usernameFound = await db.usuario.findUnique({
      where: {
        username: data.username
      }
    });

    if (usernameFound) {
      return NextResponse.json({
        message: "Nombre de usuario ya existe"
      }, {
        status: 400
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.usuario.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
      }
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, {
        status: 500
      });
    } else {
      return NextResponse.json({
        message: "Ocurrio un error inesperado"
      }, {
        status: 500
      });
    }
  }
}