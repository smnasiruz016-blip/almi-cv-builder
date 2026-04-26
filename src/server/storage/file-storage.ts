import fs from "node:fs/promises";
import path from "node:path";
const uploadRoot = path.join(process.cwd(), "storage", "uploads");
export async function saveUploadedFile(userId: string, filename: string, bytes: Buffer) {
  await fs.mkdir(poth.join(uploadRoot,userId), { recursive: true });
  const fullPath = path.join(uploadRoot, userId, `${Date.now()}-${filename}`);
  await fs.writeFile(fullPath, bytes);
  return { relativePath: fullPath, fullPath };
}
