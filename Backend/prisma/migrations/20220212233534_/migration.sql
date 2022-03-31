/*
  Warnings:

  - The primary key for the `table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `number` on the `table` table. All the data in the column will be lost.
  - Added the required column `numberTable` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_tableNumber_fkey";

-- AlterTable
ALTER TABLE "table" DROP CONSTRAINT "table_pkey",
DROP COLUMN "number",
ADD COLUMN     "numberTable" TEXT NOT NULL,
ADD CONSTRAINT "table_pkey" PRIMARY KEY ("numberTable");

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "table"("numberTable") ON DELETE SET NULL ON UPDATE CASCADE;
