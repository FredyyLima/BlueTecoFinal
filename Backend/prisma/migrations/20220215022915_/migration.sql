/*
  Warnings:

  - You are about to drop the column `tableNumber` on the `menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_tableNumber_fkey";

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "tableNumber";

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "tableNumberTable" TEXT,
    "menuId" INTEGER,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pedido_id_key" ON "pedido"("id");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_tableNumberTable_fkey" FOREIGN KEY ("tableNumberTable") REFERENCES "table"("numberTable") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
