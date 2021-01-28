import Metadata from "../ValueObject/Metadata";
import NumberInQueue from "../ValueObject/NumberInQueue";
import QueuingNodeId from "../ValueObject/QueuingNodeId";

export default class QueuingNode {
    private readonly id: QueuingNodeId;

    constructor(id: QueuingNodeId) {
        this.id = id;
    }

    isPassingSpecs(_: Metadata): boolean {
        return true;
    }

    getNext(): NumberInQueue {
        // TODO: Implement GetNextNumberSpecification
        return new NumberInQueue("123");
    }

    getId(): QueuingNodeId {
        return this.id;
    }
}
