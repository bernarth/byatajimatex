import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  const { id } = req.query;

  return NextResponse.json({ id }, { status: 200 })
}