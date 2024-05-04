import db from "@/db/db"
import { NextResponse } from "next/server";

export const POST = async () => {
  const productos = await db.producto.findMany({
    skip: 0,
    take: 10,
    select: {
      id: true,
      codigoModelo: true,
      nombrePrenda: true,
      fechaMuestreo: true,
      fechaModification: true,
      cantidad: true,
      imagenPath: true,
      comision: true, 
      precioVenta: true,
      precioVentaReal: true
    }
  });

  return NextResponse.json(productos, { status: 200 });
}