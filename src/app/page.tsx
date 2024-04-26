import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <div className="text-center w-2/4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Byatajimatex
        </h2>
        <p className="text-xl mb-8">
          Bienvenido al sistema de cotizacion de Byatajimatex donde encontrarás 
          un tablero de informacion sobre los productos disponibles. Has Click en ingresar si tienes
          credenciales para ingresar al sistema.
        </p>
      </div>
      <div className="flex gap-4">
        <Button>
          <Link href="/admin">
            Ingresar
          </Link>
        </Button>
        <Button variant="outline">Information</Button>
      </div>
    </div>
  );
}
