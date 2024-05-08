"use server"

import db from "@/db/db";
import { convertCurrencyToNumber } from "@/lib/utils";
// import { revalidatePath } from "next/cache";
//import { redirect } from "next/navigation";
import { z } from "zod";

const addInsumosSchema = z.object({
  materialTextil: z.string().min(1),
  descripcion: z.string().min(1),
  color: z.string().min(1),
  proveedor: z.string().min(1),
  costoUnidadEnCentavos: z.coerce.number().int().min(0),
  cantidad: z.coerce.number().int().min(0)
});

export async function addInsumo(productoId: string, prevState: unknown, formData: FormData) {
  formData.set("costoUnidadEnCentavos", convertCurrencyToNumber(formData.get("costoUnidadEnCentavos")?.toString() || "0"));
  formData.set("costoTotalEnCentavos", convertCurrencyToNumber(formData.get("costoTotalEnCentavos")?.toString() || "0"));

  const result = addInsumosSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success == false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.insumo.create({
    data: {
      materialTextil: data.materialTextil,
      descripcion: data.descripcion,
      color: data.color,
      proveedor: data.proveedor,
      costoUnidadEnCentavos: data.costoUnidadEnCentavos,
      cantidad: data.cantidad,
      costoTotalEnCentavos: data.costoUnidadEnCentavos * data.cantidad,
      productoId: productoId
    }
  });

  // redirect(`/admin/productos/${productoId}`);
  // revalidatePath(`/admin/productos/${productoId}`);
}