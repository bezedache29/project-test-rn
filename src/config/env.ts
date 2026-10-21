// En dev : `adb reverse tcp:8090 tcp:8090` pour que le téléphone voie l'API du PC
// TODO: remplacer l'URL de production quand l'API existera
export const API_URL = __DEV__ ? 'http://localhost:8090/api' : 'https://api.example.com/api'
