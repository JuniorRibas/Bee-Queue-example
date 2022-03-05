import BeeQueue from "./libs/BeeQueue";
import Bee from "bee-queue";
import Arena from "bull-arena";

import express from "express";

const app = express();

const arena = Arena({
  Bee,
  queues: BeeQueue.Queues.map((job) => ({
    hostId: job.name,
    name: job.name,
    type: "bee",
    redis: {
      host: "localhost",
    },
  })),
});

app.use("/", arena);
app.listen(3333, () => {
  console.log("Server On");
});

BeeQueue.Add("WriteFile", { test: "test" });
BeeQueue.Add("SendHellou", { test: "test" });
