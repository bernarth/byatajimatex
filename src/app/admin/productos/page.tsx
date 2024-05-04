"use client"

import Link from "next/link";
import { PageHeader } from "../_components/PageHeader";
import Producto from "./_components/Producto";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProductoAddDialogContent from "./_components/ProductoAddDialogContent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Producto as ProductoType } from "@prisma/client";

export default function AdminProductosPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Productos</PageHeader>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Agregar Producto
            </Button>
          </DialogTrigger>
          <ProductoAddDialogContent />
        </Dialog>
      </div>
      <ProductosGrid />
    </>
  );
}

function ProductosGrid() {

  const { data: productos } = useQuery({
    queryKey: ["productos"],
    queryFn: async () => {
      const { data } = await axios.post<ProductoType[]>(
        "/api/productos", {
          filter: {
            // filters
          }
        }
      );

      return data;
    }
  });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200">

      </div>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="hidden lg:block">
            Filtros
          </div>

          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {productos && 
            productos.map((producto: ProductoType) => (
              <li key={producto.id}><Producto producto={producto}/></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}