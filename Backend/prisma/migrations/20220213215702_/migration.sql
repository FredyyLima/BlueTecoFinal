/*
  Warnings:

  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_tableNumber_fkey";

-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_userId_fkey";

-- DropTable
DROP TABLE "menu";

-- DropTable
DROP TABLE "table";
