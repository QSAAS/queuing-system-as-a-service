export default interface Auth<T> {
    getToken(user: T): string;
    decode(token: string): Object;
}
