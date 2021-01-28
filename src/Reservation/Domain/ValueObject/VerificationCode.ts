export default class VerificationCode {
    private code: string;

    constructor(code: string) {
        this.code = code;
    }

    getString(): string {
        return this.code;
    }
}
