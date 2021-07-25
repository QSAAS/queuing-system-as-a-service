import createApp from "@app/app";
import { getDependencyContainer } from "@app/Command/Presentation/Api/Routes/Router";
import { DiEntry } from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import EventHandler from "@app/Command/Infrastructure/Service/EventHandler";

const PORT = process.env.SERVER_PORT || "N/A";

console.log("Started");

createApp().then(async (app) => {
  console.log("App created");
  app.listen(80, () => {
    console.log(`Server started, forwarding host port ${PORT} to port 80`);
  });

  const container = await getDependencyContainer();
  const eventHandler = container.resolve<EventHandler>(DiEntry.EventHandler);
  eventHandler.run();
});
