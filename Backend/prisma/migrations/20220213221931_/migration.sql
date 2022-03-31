/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "menu_id_key" ON "menu"("id");
