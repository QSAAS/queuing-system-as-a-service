import QueuingNodeId from "../../../../src/Reservation/Domain/ValueObject/QueuingNodeId";
import QueuingNode from "../../../../src/Reservation/Domain/Entity/QueuingNode";

export default class QueuingNodeBuilder {
    private _id: QueuingNodeId;

    constructor() {
        this._id = QueuingNodeId.from("123");
    }

    setId(value: QueuingNodeId) {
        this._id = value;
        return this;
    }

    build() {
        return new QueuingNode(this._id);
    }
}
