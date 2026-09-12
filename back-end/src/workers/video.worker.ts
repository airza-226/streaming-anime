import { Worker, Job } from "bullmq";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import { redisConnection } from "../config/redis";
import { Episode } from "../models/episode.model";

export const initVideoWorker = () => {
  const worker = new Worker(
    "video-transcoding",
    async (job: Job) => {
      const { episodeId, inputPath } = job.data;
      const outputDir = path.join(process.cwd(), "uploads", "hls", episodeId.toString());

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      await Episode.findByIdAndUpdate(episodeId, { status: "processing" });

      const outputPath = path.join(outputDir, "playlist.m3u8");

      return new Promise((resolve, reject) => {
        let totalDurationInSeconds = 0;

        ffmpeg(inputPath)
          .outputOptions([
            "-profile:v main",
            "-vf scale=-2:720",
            "-c:a aac",
            "-ar 48000",
            "-b:a 128k",
            "-c:v h264",
            "-crf 20",
            "-g 48",
            "-keyint_min 48",
            "-sc_threshold 0",
            "-hls_time 10",
            "-hls_playlist_type vod",
            `-hls_segment_filename ${outputDir}/segment_%03d.ts`,
          ])
          .output(outputPath)
          .on("codecData", (data) => {
            if (data.duration) {
              const parts = data.duration.split(":");
              totalDurationInSeconds = Math.round(
                parseFloat(parts[0]) * 3600 +
                parseFloat(parts[1]) * 60 +
                parseFloat(parts[2])
              );
            }
          })
          .on("progress", async (progress) => {
            if (progress.percent) {
              const percent = Math.round(progress.percent);
              await job.updateProgress(percent);
            }
          })
          .on("end", async () => {
            await Episode.findByIdAndUpdate(episodeId, {
              videoUrl: `/uploads/hls/${episodeId}/playlist.m3u8`,
              duration: totalDurationInSeconds,
              status: "ready",
            });
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            resolve(true);
          })

          .on("error", async (err) => {
            await Episode.findByIdAndUpdate(episodeId, { status: "failed" });
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            reject(err);
          })
          .run();
      });
    },
    { connection: redisConnection }
  );

  worker.on("completed", (job) => console.log(`[Worker] Job ${job.id} completed successfully!`));
  worker.on("failed", (job, err) => console.error(`[Worker] Job ${job?.id} failed: ${err.message}`));
};