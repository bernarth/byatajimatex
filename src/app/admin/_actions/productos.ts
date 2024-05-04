"use server"

import db from "@/db/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const addProductoSchema = z.object({
  codigoModelo: z.string().min(1),
  nombrePrenda: z.string().min(1)
});

export async function addBaseProducto(prevState: unknown, formData: FormData) {
  const result = addProductoSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const producto = await db.producto.create({
    data: {
      nombrePrenda: data.nombrePrenda,
      codigoModelo: data.codigoModelo,
      cantidad: 0,
      imagenPath: "/default.png",
      comision: 0,
      precioVenta: 0,
      precioVentaReal: 0
    }
  });

  redirect(`/admin/productos/${producto.id}`);
}