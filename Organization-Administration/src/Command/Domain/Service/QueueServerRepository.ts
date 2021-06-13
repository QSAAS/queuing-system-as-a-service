import QueueServer from "@app/Command/Domain/Entity/QueueServer";

export default interface QueueServerRepository {
  save(server: QueueServer): Promise<void>;

  delete(server: QueueServer): Promise<void>;
}
