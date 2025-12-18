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
    "team1_player1_streak" INTEGER NOT NULL,
    "team1_player2_name" TEXT NOT NULL,
    "team1_player2_mmr" INTEGER NOT NULL,
    "team1_player2_mmr_changed" INTEGER,
    "team1_player2_streak" INTEGER NOT NULL,
    "team2_player1_name" TEXT NOT NULL,
    "team2_player1_mmr" INTEGER NOT NULL,
    "team2_player1_mmr_changed" INTEGER,
    "team2_player1_streak" INTEGER NOT NULL,
    "team2_player2_name" TEXT NOT NULL,
    "team2_player2_mmr" INTEGER NOT NULL,
    "team2_player2_mmr_changed" INTEGER,
    "team2_player2_streak" INTEGER NOT NULL,
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
    "mmr" INTEGER NOT NULL DEFAULT 1000,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "point" INTEGER NOT NULL DEFAULT 0,
    "win" INTEGER NOT NULL DEFAULT 0,
    "lose" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");
