// import { NextApiRequest } from "next";
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string }}) => {
  
  const productoId = params.id;

  const insumos = await db.insumo.findMany({
    select: {
      materialTextil: true,
      descripcion: true,
      color: true,
      proveedor: true,
      costoUnidadEnCentavos: true,
      cantidad: true,
      costoTotalEnCentavos: true
    },
    where: {
      productoId
    }
  });

  return NextResponse.json(insumos, { status: 200 })
}