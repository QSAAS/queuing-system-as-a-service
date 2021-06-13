import QueueNode from "@app/Command/Domain/Entity/QueueNode";

export default interface QueueNodeRepository {
  save(queueNode: QueueNode): Promise<void>;
  delete(queueNode: QueueNode): Promise<void>;
}
