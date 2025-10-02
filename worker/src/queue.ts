import { Worker } from "bullmq";
import Redis from "ioredis";

// Connessione a Redis (Upstash o locale)
const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null, // richiesto da BullMQ
});

// Definizione del worker
const worker = new Worker(
  "jobs", // nome della coda
  async (job) => {
    console.log("Nuovo job ricevuto:", job.data);

    if (job.name === "convert") {
      console.log("Job di conversione in coda:", job.data.jobType);
      // 👉 Qui nello Step 3 aggiungeremo la conversione vera (FFmpeg, LibreOffice, ecc.)
    }
  },
  { connection: redis }
);

// Eventi utili
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completato ✅`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id
