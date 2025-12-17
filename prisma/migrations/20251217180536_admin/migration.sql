/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "admin" (
    "idx" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "match" (
    "idx" SERIAL NOT NULL,
    "team1_player1_name" TEXT NOT NULL,
    "team1_player1_mmr" INTEGER NOT NULL,
    "team1_player1_mmr_changed" INTEGER,
    "team1_player2_name" TEXT NOT NULL,
    "team1_player2_mmr" INTEGER NOT NULL,
    "team1_player2_mmr_changed" INTEGER,
    "team2_player1_name" TEXT NOT NULL,
    "team2_player1_mmr" INTEGER NOT NULL,
    "team2_player1_mmr_changed" INTEGER,
    "team2_player2_name" TEXT NOT NULL,
    "team2_player2_mmr" INTEGER NOT NULL,
    "team2_player2_mmr_changed" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'play',

    CONSTRAINT "match_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "player" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "battle_tag" TEXT,
    "player_mmr" INTEGER NOT NULL DEFAULT 1000,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "point" INTEGER NOT NULL DEFAULT 0,
    "win" INTEGER NOT NULL DEFAULT 0,
    "lose" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "player_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");
