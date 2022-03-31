-- CreateTable
CREATE TABLE "table" (
    "numberTable" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "table_pkey" PRIMARY KEY ("numberTable")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tableNumber" TEXT,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "table_numberTable_key" ON "table"("numberTable");

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "table"("numberTable") ON DELETE SET NULL ON UPDATE CASCADE;
