import crypto from "crypto";

export function generateToken() {
    return crypto.randomBytes(30).toString("hex").substring(0, 40);
}
