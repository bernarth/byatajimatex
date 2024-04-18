-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "codigoModelo" TEXT NOT NULL,
    "nombrePrenda" TEXT NOT NULL,
    "fechaMuestreo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModification" TIMESTAMP(3) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "imagenPath" TEXT NOT NULL,
    "comision" INTEGER NOT NULL,
    "precioVenta" INTEGER NOT NULL,
    "precioVentaReal" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insumo" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "materialTextil" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "proveedor" TEXT NOT NULL,
    "costoUnidadEnCentavos" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "costoTotalEnCentavos" INTEGER NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proceso" (
    "id" TEXT NOT NULL,
    "areaDeTrabajo" TEXT NOT NULL,
    "nombreEncargado" TEXT NOT NULL,
    "salarioPorHora" INTEGER NOT NULL,
    "cantidadTiempo" INTEGER NOT NULL,
    "costoTrabajoUnitario" INTEGER NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otro" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costoTotal" INTEGER NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "Otro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigoModelo_key" ON "Producto"("codigoModelo");

-- AddForeignKey
ALTER TABLE "Insumo" ADD CONSTRAINT "Insumo_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otro" ADD CONSTRAINT "Otro_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
