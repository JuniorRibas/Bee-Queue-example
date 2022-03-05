export default {
  key: "WriteFile",
  options: {
    timeout: 0,
    retries: 1,
  },
  handle(data: any) {
    console.log(data);
  },
};
