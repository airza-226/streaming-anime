import { Worker, Job } from "bullmq";
import path from "path";
import { convertToHLS } from "../services/transcoder.service";
import { Episode } from "../models/episode.model";
import { worker } from "cluster";

const redisOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_HOST || 6379),
};

export const initVideoWorker = () => {
  const worker = new Worker(
    "video-transcoding",
    async (job: Job) => {
      const { episodeId, inputPath, filename } = job.data;
      const outputDir = path.join(__dirname, "../../uploads/hls", episodeId);
      await Episode.findByIdAndUpdate(episodeId, { status: "processing" });
      const hlsPath = await convertToHLS({ inputPath, outputDir });
      await Episode.findByIdAndUpdate(episodeId, {
        status: "ready",
        videoUrl: `/uploads/hls/${episodeId}/index.m3u8`,
      });
      console.log(`Hls transcoding completed for episode:${episodeId}`);
    },
    { connection: redisOptions },
  );
};
worker?.on("failed", async (job, err) => {
  console.error(`Transcoding failed for job ${job?.id}`);
  if (job?.data?.episodeId)
    await Episode.findOneAndUpdate(job.data.episodeId, { status: "failed" });
});
