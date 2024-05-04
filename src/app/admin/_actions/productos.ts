"use server"

import db from "@/db/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";
import { convertToNumber } from "@/lib/utils";

const addProductoSchema = z.object({
  codigoModelo: z.string().min(1),
  nombrePrenda: z.string().min(1)
});

const imagenSchema = z.instanceof(File, { message: "Required" }).refine(file => file.size === 0 || file.type.startsWith("image/"));

const editProductoSchema = z.object({
  codigoModelo: z.string().min(1),
  nombrePrenda: z.string().min(1),
  cantidad: z.coerce.number().int().min(0),
  imagen: imagenSchema.optional(),
  comision: z.coerce.number().int().min(0),
  precioVenta: z.coerce.number().int().min(0),
  precioVentaReal: z.coerce.number().int().min(0)
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

export async function updateProducto(id: string, prevState: unknown, formData: FormData) {
  formData.set("comision", convertToNumber(formData.get("comision")?.toString() || "0"));
  formData.set("precioVenta", convertToNumber(formData.get("precioVenta")?.toString() || "0"));
  formData.set("precioVentaReal", convertToNumber(formData.get("precioVentaReal")?.toString() || "0"));
  const result = editProductoSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const producto = await db.producto.findUnique({ where: { id }});

  if (producto === null) {
    return notFound();
  }

  console.log(data);

  let imagenPath = producto.imagenPath;
  
  if (data.imagen !== null && data.imagen !== undefined && data.imagen.size > 0) {
    if (producto.imagenPath !== "/default.png") {
      await fs.unlink(`public${producto.imagenPath}`);
    }

    imagenPath = `/products/${crypto.randomUUID()}-${data.imagen.name}`
    await fs.writeFile(`public${imagenPath}`, Buffer.from(await data.imagen.arrayBuffer()));
  }

  await db.producto.update({
    where: { id },
    data: {
      codigoModelo: data.codigoModelo,
      nombrePrenda: data.nombrePrenda,
      cantidad: data.cantidad,
      imagenPath,
      comision: data.comision,
      precioVenta: data.precioVenta,
      precioVentaReal: data.precioVentaReal
    }
  });

  redirect("/admin/productos");
}
