import BeeQueue from "bee-queue";
import * as Jobs from "./../services/Queue";

const sharedConfig = {
  redis: {
    host: "localhost",
  },
};

const Queues = Object.values(Jobs).map((jobs) => {
  return {
    job: new BeeQueue(jobs.key, sharedConfig),
    name: jobs.key,
    handle: jobs.handle,
    options: {
      retries: jobs.options.retries,
      timeout: jobs.options.timeout,
    },
  };
});

export default {
  Queues,
  Add(name: string, data: any) {
    const queueExist = this.Queues.find((queue) => queue.name === name);
    console.log("Adicioando a fila! ", data);
    return queueExist?.job
      .createJob(data)
      .timeout(queueExist.options.timeout)
      .retries(queueExist.options.retries)
      .save();
  },
  process() {
    return this.Queues.forEach((queue) => {
      queue.job.process((job: any, done: any) => {
        console.log(`Processing job ${job.id}`);
        queue.handle(job.data);
        return done();
      });
      queue.job.on("failed", (job, err) => {
        console.log(err, queue.name);
      });
    });
  },
};
