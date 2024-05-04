import db from "@/db/db";
import { PageHeader } from "../../_components/PageHeader";
import ProductoForm from "../_components/ProductoForm";
import { redirect } from "next/navigation";

export default async function EditProductoPage({ params: { id } } : { params: { id: string }}) {

  const producto = await db.producto.findUnique({
    where: { id }
  });

  if (producto === null) {
    redirect("/admin/productos")
  }

  return (
    <>
      <PageHeader>Editar Producto</PageHeader>
      {producto && <ProductoForm producto={producto} />}
    </>
  );
}