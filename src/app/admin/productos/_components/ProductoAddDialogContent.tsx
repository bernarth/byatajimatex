"use client"

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { addBaseProducto } from "../../_actions/productos";

export default function ProductoAddDialogContent() {

  const [ error, action ] = useFormState(addBaseProducto, {});

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[50%] lg:max-w-[40vw]">
      <DialogHeader>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogDescription>
          Agrega la información inicial de un producto.
        </DialogDescription>
      </DialogHeader>
      <form action={action} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nombrePrenda" className="text-right">Nombre de Prenda</Label>
          <Input id="nombrePrenda" name="nombrePrenda" className="col-span-3" />
          {error?.nombrePrenda && <div className="text-destructive col-span-3 text-sm">{error.nombrePrenda}</div>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="codigoModelo" className="text-right">Codigo Molde</Label>
          <Input id="codigoModelo" name="codigoModelo" className="col-span-3" />
          {error?.codigoModelo && <div className="text-destructive col-span-3 text-sm">{error.codigoModelo}</div>}
        </div>
        <DialogFooter>
          <SubmitButton />
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      { pending ? "Iniciando..." : "Continuar" }
    </Button>
  );
}