/*
  Warnings:

  - The primary key for the `menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `menu` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "menu" DROP CONSTRAINT "menu_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("id");
