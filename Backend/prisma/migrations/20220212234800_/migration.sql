/*
  Warnings:

  - A unique constraint covering the columns `[numberTable]` on the table `table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "table_numberTable_key" ON "table"("numberTable");
