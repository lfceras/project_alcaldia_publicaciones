const server = require("./src/app.js");

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
