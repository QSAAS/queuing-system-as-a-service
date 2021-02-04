import { v4 as uuidv4 } from "uuid";

export default class OrganizationAccountId {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string): OrganizationAccountId {
        return new OrganizationAccountId(id);
    }

    static create(): OrganizationAccountId {
        return new OrganizationAccountId(uuidv4());
    }

    getString(): string {
        return this.id;
    }
}
