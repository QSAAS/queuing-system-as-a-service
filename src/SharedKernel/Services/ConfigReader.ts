import dotenv from "dotenv";
import ConfigReadingError from "@app/SharedKernel/Errors/ConfigReadingError";
import path from "path";

export default class ConfigReader {
    private static isInitialized: boolean = false;

    public static read(key: string): string {
        if (!ConfigReader.isInitialized) {
            ConfigReader.initialize();
        }

        const value = process.env[key];
        if (!value) {
            throw new ConfigReadingError(key);
        }
        return value;
    }

    /**
     * loads environment variables defined in the configuration file based
     * on the work environment
     *
     * ".env" and ".test.env" files must both be in the root directory of the project
     * set the environment variable 'QSAS_ENV' to 'dev' to load from ".env"
     * @private
     */
    private static initialize() {
        const environment = process.env.QSAS_ENV;

        if (environment === "dev") { // only read ".env" if environment is "dev", otherwise use ".test.env"
            dotenv.config({ path: path.resolve(process.cwd(), ".env") });
        } else {
            dotenv.config({ path: path.resolve(process.cwd(), ".test.env") });
        }
        this.isInitialized = true;
    }
}
