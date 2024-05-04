import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function InsumoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex float-end">
          Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Insumo</DialogTitle>
          <DialogDescription>
            Agrega un insumo al Producto correspondiente
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}