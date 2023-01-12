import * as crypto from "crypto";

/**
 * Generation enter link
 * @param algorithm
 * @param data
 * @param title
 */
export function generateLink(algorithm: string, data: string, title: string) {
  return `${title.replace(/ /g, "_")}_${data.replace(/ /g, "_")}_${crypto
    .randomBytes(5)
    .toString("hex")}`;
}

/**
 * Generation tokenKey
 * @param algorithm
 * @param data
 */
export function generateTokenHash(algorithm: string, data: any) {
  return crypto
    .createHash(algorithm)
    .update(crypto.randomBytes(5))
    .digest("hex");
}
