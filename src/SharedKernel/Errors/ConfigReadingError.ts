export default class ConfigReadingError extends Error {
    constructor(m: string) {
        super(`Failed to read key '${m}'`);
    }
}
