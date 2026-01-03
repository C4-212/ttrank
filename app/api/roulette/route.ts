import { NextResponse } from "next/server";
import crypto from "crypto";

const ITEMS = [
    { label: "꽝", weight: 800 },
    { label: "♦️1", weight: 700 },
    { label: "♦️2", weight: 400 },
    { label: "♦️5", weight: 120 },
    { label: "♦️10", weight: 50 },
    { label: "♦️50", weight: 6 },
    { label: "♦️100", weight: 4 },
    { label: "♦️500", weight: 2 }, 
];

function pickWeightedIndexSecure() {
    const total = ITEMS.reduce((s, i) => s + i.weight, 0);
    const rand = crypto.randomInt(0, total);

    let acc = 0;
    for (let i = 0; i < ITEMS.length; i++) {
        acc += ITEMS[i].weight;
        if (rand < acc) return i;
    }

    return 0;
}

export async function POST() {
    const winIndex = pickWeightedIndexSecure();

    return NextResponse.json({
        winIndex,
        label: ITEMS[winIndex].label,
        issuedAt: new Date().toISOString(),
    });
}