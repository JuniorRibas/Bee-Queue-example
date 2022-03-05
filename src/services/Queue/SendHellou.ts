export default {
  key: "SendHellou",
  options: {
    timeout: 10000,
    retries: 1,
  },
  handle(data: any) {
    console.log(data);
  },
};
