export default class ClientNotFoundError extends Error {
    constructor(m: string) {
        super(`Could not find client ${m}.`);
    }
}
