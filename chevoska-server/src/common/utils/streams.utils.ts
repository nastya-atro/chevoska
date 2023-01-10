import * as crypto from "crypto";

/**
 * Generation enter link
 * @param algorithm
 * @param data
 */
export function generateLink(algorithm: string, data: string) {
  return `${data}/${crypto.randomBytes(5).toString("hex")}`;
}
