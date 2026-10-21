if (__DEV__) {
  // require et pas import : la lib n'est chargée qu'en développement
  const Reactotron = require('reactotron-react-native').default

  Reactotron.configure({ name: 'ProjectTestRn' }).useReactNative({ log: true }).connect()

  // Envoie les erreurs JS à Reactotron avant le crash natif
  const originalGlobalHandler = ErrorUtils.getGlobalHandler()
  ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
    Reactotron.error(`${isFatal ? '💥 FATAL' : '❌ ERROR'}: ${error.message}`, error.stack)
    originalGlobalHandler(error, isFatal)
  })

  // Redirection volontaire de la console vers Reactotron
  /* eslint-disable no-console */
  console.log = (...args: unknown[]) => Reactotron.log(...args)
  console.warn = (...args: unknown[]) => Reactotron.warn(...args)
  console.error = (...args: unknown[]) => Reactotron.error(...args)
  /* eslint-enable no-console */
}
