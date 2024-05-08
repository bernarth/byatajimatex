import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { addInsumo } from "../../_actions/insumos";
import CurrencyInput from "react-currency-input-field";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Insumo as InsumoType } from "@prisma/client";

export default function Insumos({ productId }: { productId: string }) {

  const [ error, action ] = useFormState(addInsumo.bind(null, productId), {});
  const { pending } = useFormStatus();

  const { data: insumos, refetch } = useQuery({
    queryKey: ["insumos"],
    queryFn: async () => {
      const { data } = await axios.get<InsumoType[]>(`/api/productos/${productId}`);

      return data;
    }
  });

  return (
    <>
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
          {insumos && insumos.map((insumo: InsumoType) => (
            <TableRow key={insumo.id}>
              <TableCell>{insumo.materialTextil}</TableCell>
              <TableCell>{insumo.descripcion}</TableCell>
              <TableCell>{insumo.color}</TableCell>
              <TableCell>{insumo.proveedor}</TableCell>
              <TableCell>{formatCurrency(insumo.costoUnidadEnCentavos)}</TableCell>
              <TableCell>{insumo.cantidad}</TableCell>
              <TableCell>{formatCurrency(insumo.costoTotalEnCentavos)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex float-end mt-4">
            Agregar Insumo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Insumo</DialogTitle>
            <DialogDescription>
              Agrega un insumo al Producto correspondiente
            </DialogDescription>
          </DialogHeader>

          <form action={action} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="materialTextil" className="text-right">Material Textil</Label>
              <Input id="materialTextil" name="materialTextil" className="col-span-3" />
              {error?.materialTextil && <div className="text-destruction col-span-3 text-sm">{error.materialTextil}</div>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">Descripcion</Label>
              <Input id="descripcion" name="descripcion" className="col-span-3" />
              {error?.descripcion && <div className="text-destruction col-span-3 text-sm">{error.descripcion}</div>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">Color</Label>
              <Input id="color" name="color" className="col-span-3" />
              {error?.color && <div className="text-destruction col-span-3 text-sm">{error.color}</div>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="proveedor" className="text-right">Proveedor</Label>
              <Input id="proveedor" name="proveedor" className="col-span-3" />
              {error?.proveedor && <div className="text-destruction col-span-3 text-sm">{error.proveedor}</div>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="costoUnidadEnCentavos" className="text-right">Costo Unidad</Label>
              <CurrencyInput 
                id="costoUnidadEnCentavos"
                name="costoUnidadEnCentavos"
                prefix="Bs "
                required
                defaultValue={0}
                decimalsLimit={1}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
              />
              {error?.costoUnidadEnCentavos && <div className="text-destructive">{error.costoUnidadEnCentavos}</div>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cantidad" className="text-right">Cantidad</Label>
              <Input type="number" id="cantidad" name="cantidad" className="col-span-3" required defaultValue={1} />
              {error?.cantidad && <div className="text-destruction col-span-3 text-sm">{error.cantidad}</div>}
            </div>
            <DialogFooter>
              {/* <DialogClose>
                
              </DialogClose> */}
              <Button type="submit" disabled={pending} onClick={() => {
                  if (!pending) {
                    refetch();
                  }
                }}> 
                  { pending ? "Agregando..." : "Agregar" }
                </Button>
              <DialogClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
