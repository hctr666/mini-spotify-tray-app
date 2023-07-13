module.exports = {
  'src/**/*.{js,ts,tsx}': ['yarn formatcheck', 'yarn lint'],
  'src/**/*.css': ['yarn formatcheck', 'yarn lint:styles'],
  'src/**/*.{ts,tsx}?(x)': () => 'yarn typecheck',
  'src/**/*.{test,spec}.{ts,tsx}?(x)': () => 'yarn test',
}
