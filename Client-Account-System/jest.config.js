module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'ts-node',
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/$1",
        "^@tests/(.*)$": "<rootDir>/tests/$1",
    }
};
