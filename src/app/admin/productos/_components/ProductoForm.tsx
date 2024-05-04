"use client"

import { Insumo as InsumoType, Producto as ProductoType } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { updateProducto } from "../../_actions/productos";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CurrencyInput from "react-currency-input-field";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InsumoDialog from "./InsumoDialog";

export default function ProductoForm({ producto }: { producto: ProductoType }) {

  const [ error, action ] = useFormState(updateProducto.bind(null, producto?.id), {});

  const { data: insumos } = useQuery({
    queryKey: ["insumos"],
    queryFn: async () => {
      const { data } = await axios.get<InsumoType[]>(`/api/productos/${producto.id}`);

      return data;
    }
  });

  return (
    <>
      <form action={action} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="space-y-2">
              <Label htmlFor="nombrePrenda">Nombre de Prenda</Label>
              <Input type="text" id="nombrePrenda" name="nombrePrenda" required defaultValue={producto.nombrePrenda || ""} />
              {error.nombrePrenda && <div className="text-destructive">{error.nombrePrenda}</div>}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="codigoModelo">Codigo Molde</Label>
                <Input type="text" id="codigoModelo" name="codigoModelo" required defaultValue={producto.codigoModelo || ""} />
                {error.codigoModelo && <div className="text-destructive">{error.codigoModelo}</div>}
              </div>
              <div className="col-span-1 space-y-2">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input type="number" id="cantidad" name="cantidad" required defaultValue={producto.cantidad || 1} />
                {error.cantidad && <div className="text-destructive">{error.cantidad}</div>}
              </div>
            </div>
            
            <h2 className="text-lg text=gray-700 pt-4">Costos Ventas</h2>
            <div className="space-y-2">
              <Label htmlFor="comision">Comision</Label>
              <CurrencyInput 
                id="comision"
                name="comision"
                prefix="Bs "
                required
                defaultValue={producto.comision / 10 || 0}
                decimalsLimit={1}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {error.comision && <div className="text-destructive">{error.comision}</div>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="precioVenta">Precio De Venta</Label>
              <CurrencyInput 
                id="precioVenta"
                name="precioVenta"
                prefix="Bs "
                required
                defaultValue={producto.precioVenta / 10 || 0}
                decimalsLimit={1}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {error.precioVenta && <div className="text-destructive">{error.precioVenta}</div>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="precioVentaReal">Precio De Venta Real</Label>
              <CurrencyInput 
                id="precioVentaReal"
                name="precioVentaReal"
                prefix="Bs "
                required
                defaultValue={producto.precioVentaReal / 10 || 0}
                decimalsLimit={1}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {error.precioVentaReal && <div className="text-destructive">{error.precioVentaReal}</div>}
            </div>
          </div>
          <div className="col-span-1">
            <div className="space-y-1">
              <Label htmlFor="imagen">Imagen</Label>
              <Input type="file" id="imagen" name="imagen" required={producto == null} />
              {producto !== null && (
                <Image
                  src={producto?.imagenPath || ""}
                  height="400"
                  width="400"
                  alt="Imagen de producto"
                />
              )}
              {error.imagen && <div className="text-destructive">{error.imagen}</div>}
            </div>
            <SubmitButton />
          </div>
        </div>
      </form>

      <h2 className="text-lg text=gray-700 py-4">Insumos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Materia Textil</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Costo Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Tela</TableCell>
            <TableCell>Algodón</TableCell>
            <TableCell>Plomo Plata</TableCell>
            <TableCell>Textilon</TableCell>
            <TableCell>Bs 25</TableCell>
            <TableCell>1,29</TableCell>
            <TableCell>Bs 18,2</TableCell>
          </TableRow>
          {insumos && insumos.map((insumo: InsumoType) => (
            <TableRow key={insumo.id}>
              <TableCell>{insumo.materialTextil}</TableCell>
              <TableCell>{insumo.descripcion}</TableCell>
              <TableCell>{insumo.color}</TableCell>
              <TableCell>{insumo.proveedor}</TableCell>
              <TableCell>{insumo.costoUnidadEnCentavos}</TableCell>
              <TableCell>{insumo.cantidad}</TableCell>
              <TableCell>{insumo.costoTotalEnCentavos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <InsumoDialog />
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button type="submit" disabled={pending} className="flex float-end">
    {pending ? "Saving..." : "Save"}
  </Button>;
}