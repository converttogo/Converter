import { Worker } from "bullmq";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "jobs",
  async (job) => {
    console.log("Nuovo job ricevuto:", job.data);

    if (job.name === "convert") {
      console.log("Job in coda:", job.data.jobType);
      // Qui nello Step 3 metteremo la conversione vera (FFmpeg)
    }
  },
  { connection: redis }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completato ✅`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} fallito ❌:`, err);
});
