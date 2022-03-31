-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "tableNumber" TEXT;

-- AlterTable
ALTER TABLE "table" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "table"("number") ON DELETE SET NULL ON UPDATE CASCADE;
