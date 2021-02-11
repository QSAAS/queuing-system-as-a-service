// TODO discuss: we should use a library that handles durations e.g. "https://www.npmjs.com/package/duration"
// TODO make Duration an interface
export default class Duration {
    private readonly duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }

    static from(duration: number): Duration {
        return new Duration(duration);
    }

    public toUnixSeconds(): number {
        return this.duration;
    }
}
