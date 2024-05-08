import { formatCurrency } from "@/lib/formatters";
import { Producto as ProductoType } from "@prisma/client";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Producto({ producto }: { producto: ProductoType }) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={producto.imagenPath}
          alt="Product Image"
          height="400"
          width="400"
          priority={true}
          className="h-full w-full object-cover object-center" />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text=gray-700">{producto.nombrePrenda}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Precio Venta: {formatCurrency(producto.precioVentaReal)}
          </p>
        </div>
        <button className="-m-2 ml-4 p-2 text-gray-700 hover:text-gray-500">
          <Link href={`/admin/productos/${producto.id}`}>
            <SquarePen className="h-4 w-4" /> Edit
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Producto;