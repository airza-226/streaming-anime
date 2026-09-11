import { TranscodeOptions } from "../types/video.types";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
export const convertToHLS = ({ inputPath, outputDir }: TranscodeOptions) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const masterPlaylist = path.join(outputDir, "index.m3u8");
    ffmpeg(inputPath)
      .outputOptions([
        "-profile:v baseline",
        "-level 3.0",
        "-start_number 0",
        "-hls_time 10",
        "-hls_list_size 0",
        "-f hls",
      ])
      .output(masterPlaylist)
      .on("end", () => {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        resolve(masterPlaylist);
      })
      .on("error", (err) => {
        reject(err);
      })
      .run();
  });
};
