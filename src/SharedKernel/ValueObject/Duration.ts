// Didn't give modeling a duration much thought, this is probably why we should use a library that does these design
// decisions for us
export default class Duration {
    private readonly duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }
}
