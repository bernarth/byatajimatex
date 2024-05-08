import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getProductsData() {
  const data = await db.producto.aggregate({
    _sum: { precioVentaReal: true },
    _count: true
  });

  return {
    products: data._count,
    totalPrice: data._sum.precioVentaReal || 0
  }
}

// we can add a field to know the porpular products ranking

export default async function AdminDashboard() {

  const productsData = await getProductsData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Productos"
        subtitle={`${formatNumber(productsData.products)} Productos`}
        body={formatCurrency(productsData.totalPrice)}
      />
    </div>
  )
}

type DashboardCardProps = {
  title: string,
  subtitle: string,
  body: string
}

function DashboardCard({title, subtitle, body}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>  
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}