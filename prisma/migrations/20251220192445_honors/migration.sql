/*
  Warnings:

  - You are about to drop the `honosclub` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "honosclub";

-- CreateTable
CREATE TABLE "honors" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "honors_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "honors_name_key" ON "honors"("name");
