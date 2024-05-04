import { Nav, NavLink } from "@/components/Nav";
import Providers from "@/components/Providers";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Información</NavLink>
        <NavLink href="/admin/productos">Productos</NavLink>
        <NavLink href="/admin/bordados">Bordados</NavLink>
        <NavLink href="/auth/register">Registrar</NavLink>
        <NavLink href="/api/auth/signout">Salir</NavLink>
      </Nav>
      <div className="container my-6"><Providers>{children}</Providers></div>
    </>
  );
}