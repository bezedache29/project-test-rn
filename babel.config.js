module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Zod 4 utilise `export * as …`, que Metro ne sait pas lire sans ce plugin
    '@babel/plugin-transform-export-namespace-from',
    ['module-resolver', { root: ['./'], alias: { '@': './src' } }],
  ],
}
