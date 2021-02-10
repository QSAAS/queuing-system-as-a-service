import dotenv from "dotenv";
import ConfigReadingError from "@app/SharedKernel/Errors/ConfigReadingError";

export default class ConfigReader {
    private static isInitialized: boolean = false;

    public static read(key: string): string {
        if (!ConfigReader.isInitialized) {
            dotenv.config();
        }

        const value = process.env[key];
        if (!value) {
            throw new ConfigReadingError(key);
        }
        return value;
    }
}
