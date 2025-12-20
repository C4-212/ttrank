-- CreateTable
CREATE TABLE "honosclub" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "honosclub_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "honosclub_name_key" ON "honosclub"("name");
