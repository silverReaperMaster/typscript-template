module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'no-loops'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        'no-console': 1,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-loops/no-loops': ['error', { argsIgnorePattern: '^_' }],
    },
    ignorePatterns: ['**/*.js'],
};
