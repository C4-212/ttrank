-- CreateTable
CREATE TABLE "goods" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "src" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0,
    "point" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goods_pkey" PRIMARY KEY ("idx")
);
