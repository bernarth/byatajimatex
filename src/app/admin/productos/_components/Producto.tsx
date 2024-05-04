import { formatCurrency } from "@/lib/formatters";
import { Producto as ProductoType } from "@prisma/client";
import Image from "next/image";

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
            Precio Venta: {formatCurrency(producto.precioVenta)}
          </p>
        </div>
        <p className="text=sm font-medium text-gray-900">
          Precio Venta Real: {formatCurrency(producto.precioVentaReal)}
        </p>
      </div>
    </div>
  );
}

export default Producto;