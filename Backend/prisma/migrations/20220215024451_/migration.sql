/*
  Warnings:

  - You are about to drop the column `tableNumberTable` on the `pedido` table. All the data in the column will be lost.
  - The primary key for the `table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numberTable` on the `table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pedido" DROP CONSTRAINT "pedido_tableNumberTable_fkey";

-- DropIndex
DROP INDEX "table_numberTable_key";

-- AlterTable
ALTER TABLE "pedido" DROP COLUMN "tableNumberTable",
ADD COLUMN     "tableId" TEXT;

-- AlterTable
ALTER TABLE "table" DROP CONSTRAINT "table_pkey",
DROP COLUMN "numberTable",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "table_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "table_id_key" ON "table"("id");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
