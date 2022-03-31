/*
  Warnings:

  - Added the required column `quant` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "quant" DOUBLE PRECISION NOT NULL;
