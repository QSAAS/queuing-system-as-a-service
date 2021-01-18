import QueuingNodeId from "../ValueObject/QueuingNodeId";
import QueuingNode from "../Entity/QueuingNode";

export default interface QueuingNodeRepository {
    getById(id: QueuingNodeId): QueuingNode;
}