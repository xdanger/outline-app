import fs from "fs";
import path from "path";

export type Chunk = {
  file: string;
  src: string;
  isEntry?: boolean;
};

export type ManifestStructure = Record<string, Chunk>;

export const readManifestFile = (file = "./build/app/manifest.json") => {
  const absoluteFilePath = path.resolve(file);

  let manifest = "{}";

  try {
    manifest = fs.readFileSync(absoluteFilePath, "utf8") as string;
  } catch (err) {
    console.warn(
      `Can not find ${absoluteFilePath}. Try executing "yarn vite:build" before running in production mode.`
    );
  }

  return JSON.parse(manifest) as ManifestStructure;
};

export default readManifestFile;
