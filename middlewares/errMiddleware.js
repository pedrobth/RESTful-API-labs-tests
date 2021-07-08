module.exports = (error, _req, res, _next) => {
  const { err } = error;
  console.log(`ERROR at error middleware: ${err}`);
  return res.status(500).json('internal server error');
};