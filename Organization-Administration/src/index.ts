import createApp from "@app/app";

const PORT = process.env.SERVER_PORT || "N/A";

createApp().then((app) => {
  app.listen(80, () => {
    console.log(`Server started, forwarding host port ${PORT} to port 80`);
  })
})
