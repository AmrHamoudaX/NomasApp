const info = (...params) => {
  console.log(...params);
};

const loggerError = (...params) => {
  console.error(...params);
};

export { info, loggerError };
