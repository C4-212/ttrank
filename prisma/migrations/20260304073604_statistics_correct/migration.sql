/*
  Warnings:

  - You are about to drop the column `PvsP_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `PvsP_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `PvsT_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `PvsT_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `PvsZ_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `PvsZ_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `TvsP_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `TvsP_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `TvsT_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `TvsT_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `TvsZ_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `TvsZ_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `ZvsP_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `ZvsP_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `ZvsT_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `ZvsT_W` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `ZvsZ_L` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `ZvsZ_W` on the `statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "statistics" DROP COLUMN "PvsP_L",
DROP COLUMN "PvsP_W",
DROP COLUMN "PvsT_L",
DROP COLUMN "PvsT_W",
DROP COLUMN "PvsZ_L",
DROP COLUMN "PvsZ_W",
DROP COLUMN "TvsP_L",
DROP COLUMN "TvsP_W",
DROP COLUMN "TvsT_L",
DROP COLUMN "TvsT_W",
DROP COLUMN "TvsZ_L",
DROP COLUMN "TvsZ_W",
DROP COLUMN "ZvsP_L",
DROP COLUMN "ZvsP_W",
DROP COLUMN "ZvsT_L",
DROP COLUMN "ZvsT_W",
DROP COLUMN "ZvsZ_L",
DROP COLUMN "ZvsZ_W",
ADD COLUMN     "Controller_PvsP_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_PvsP_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_PvsT_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_PvsT_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_PvsZ_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_PvsZ_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_TvsP_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_TvsP_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_TvsT_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_TvsT_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_TvsZ_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_TvsZ_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_ZvsP_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_ZvsP_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_ZvsT_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_ZvsT_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_ZvsZ_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Controller_ZvsZ_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_PvsP_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_PvsP_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_PvsT_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_PvsT_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_PvsZ_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_PvsZ_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_TvsP_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_TvsP_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_TvsT_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_TvsT_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_TvsZ_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_TvsZ_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_ZvsP_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_ZvsP_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_ZvsT_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_ZvsT_W" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_ZvsZ_L" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "Maker_ZvsZ_W" INTEGER NOT NULL DEFAULT 0;
