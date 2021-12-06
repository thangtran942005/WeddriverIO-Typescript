module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": { "ecmaVersion": 6, "sourceType": "module"},
    "rules": {
        // "prettier/prettier":["error",{endOfLine:"auto"}],
        "@typescript-eslint/no-var-require":0,
        "semi":["error", "always"],
        camelcase: 'error',
        "no-param-reassign": "error",
        "max-classes-per-file": ["error", 1], // single responsibility principle
        "max-lines": ["error", 500],
        "import/no-unresolved":[2,{"commonjs":true,"amd":false,"caseSesitive":true}]
    }
};