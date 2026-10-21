// En premier : Reactotron doit capter tous les logs, puis les textes doivent être prêts
import './src/config/reactotron'
import './src/i18n'

import { AppRegistry } from 'react-native'

import App from './App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
