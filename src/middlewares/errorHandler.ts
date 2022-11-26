const errorHandler = {
  formatError: (err: { message: string }) => {
    if (err.message.startsWith("this model has already been registered")) {
      return new Error(err.message);
    }
  },
};

export default errorHandler;
