module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:testing-library/react',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    }
};
