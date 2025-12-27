-- AlterTable
ALTER TABLE "match" ADD COLUMN     "point" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "point" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'receive',
    "point" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "point_pkey" PRIMARY KEY ("idx")
);
