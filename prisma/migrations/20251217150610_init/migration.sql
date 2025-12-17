-- CreateTable
CREATE TABLE "Admin" (
    "idx" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Match" (
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

    CONSTRAINT "Match_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Player" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "battle_tag" TEXT,
    "player_mmr" INTEGER NOT NULL DEFAULT 1000,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "point" INTEGER NOT NULL DEFAULT 0,
    "win" INTEGER NOT NULL DEFAULT 0,
    "lose" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");
