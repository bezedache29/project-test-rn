# project-test-rn : règles du projet

Projet de test pour valider la création d'une app React Native avec les conventions de
Christophe. Première fonctionnalité prévue : une liste de tâches (todo) sur l'écran
principal, avec création, modification, suppression et passage à « terminée ». Les tâches
sont stockées sur le téléphone (Jotai + MMKV) ; TanStack Query est prêt pour une future API.

**Stack :** React Native 0.88 (CLI, sans Expo) · React 19 · TypeScript · React Navigation
(native stack) · Jotai + MMKV · TanStack Query + axios · React Hook Form + Zod · i18next ·
Jest + Testing Library React Native. Cible : Android.

## Façon de travailler

- **Une étape à la fois.** Découper chaque demande en petites étapes, présenter le plan
  avant de coder, et attendre le feu vert de Christophe pour tout changement important
  (nouvel écran ou page, refonte, changement de schéma de base).
- **Christophe a le dernier mot.** Aucune lib (npm, Composer, plugin, outil, service
  externe) n'est installée sans son accord préalable, même si un skill, un agent ou une
  doc la recommande. Avant d'installer : dire son nom, à quoi elle sert, pourquoi le code
  existant ne suffit pas, et s'il existe une option sans nouvelle lib. Puis attendre sa
  réponse. S'il refuse, faire sans. Même règle pour toute décision importante qui sort
  de ce qui a été validé.
- **Expliquer simplement** ce qui a été fait et pourquoi, sans jargon.
- **Vérifier avant de dire « c'est fini »** : `npm run check-ts`, `npm run lint` et
  `npm test` doivent passer. Si un test échoue, le dire avec le message d'erreur.
- **Ne pas committer** sans qu'on le demande.
- **Tenir le README à jour** : quand une fonctionnalité est ajoutée, terminée ou
  abandonnée, mettre à jour la section « Fonctionnalités » (✅ / 🚧), et le « Démarrage
  rapide » si l'installation change.

## Git

- Branches : `main` (stable), `dev` (travail en cours), `feature/…`, `fix/…`, `chore/…`,
  `refactoring/…`, `docs/…`, `test/…` (description en anglais, kebab-case). Vérifiées au push.
- Commits au format conventionnel, **en anglais** : `feat: add login screen`.
  Types : `feat`, `fix`, `chore`, `refactor`, `docs`, `test`. Vérifiés par commitlint.
- Hooks Husky : nom de branche + types + format au commit, nom de branche au push. Ne jamais les
  contourner (`--no-verify`).
- Jamais de push direct sur `main` : branche `<type>/…`, puis PR vers `dev`.
- Git et `gh` tournent **dans WSL** (Ubuntu) : les hooks utilisent le Node d'Ubuntu (nvm).

## Workflow commit (agents)

Quand Christophe demande de committer, pousser ou faire une PR :

1. **Agent `testeur`** sur les fichiers modifiés : tests ajoutés ou complétés, suite au vert.
   S'il signale un bug, le montrer à Christophe et le corriger avant d'aller plus loin.
2. **Agent `reviewer`** sur le diff. Verdict ❌ bloquant : corriger d'abord (avec l'accord
   de Christophe). ⚠️ : montrer les points et demander s'il veut corriger maintenant.
   Pas de review si le commit est un `fix:` qui corrige justement une review précédente.
3. **Agent `github`, mode proposition** : montrer la branche et le message proposés à
   Christophe, attendre sa validation ou ses modifications.
4. **Agent `github`, mode exécution**, avec la branche et le message validés : commit, push,
   PR vers `dev`. Donner le lien de la PR.

## Commandes

```sh
npm start              # Metro (serveur JS), sous Windows
npm run android        # compile et installe l'app sur le téléphone / l'émulateur
npm run reactotron     # adb reverse du port 9090, une fois le téléphone branché
npm run check-ts       # vérification des types
npm run lint           # ESLint
npm test               # Jest
npm run test:watch     # Jest en continu
npm run format         # Prettier sur les .ts/.tsx
```

## Organisation du code

```
App.tsx              providers (SafeArea, TanStack Query, navigation) puis RootNavigator
index.js             point d'entrée : Reactotron, i18n, puis l'app
src/
  screens/           un fichier par écran (TodoListScreen.tsx, TodoFormScreen.tsx)
  components/        composants métier réutilisables (FormInput…)
  components/ui/     composants d'interface génériques façon shadcn
  navigation/        RootNavigator.tsx + types.ts (types des paramètres de route)
  theme.ts           couleurs (clair + sombre), rayons, espacements, typo
  store/             atomes Jotai (atomWithMMKV.ts + <sujet>Atom.ts)
  apis/backendApi/   client axios + erreurs (dto/, mappers/, hooks/ à venir)
  models/            types métier (un dossier par entité : todo/todo.model.ts)
  schemas/           schémas Zod des formulaires (todoSchema.ts)
  config/            reactotron, queryClient, env
  i18n/              config i18next + locales/fr.json
  utils/             helpers sans UI (todos.ts : actions pures sur la liste)
test-utils/          helpers de tests (query.tsx, jotai.tsx : makeStore, makeTodo)
__mocks__/           mocks de modules natifs (react-native-mmkv)
__tests__/           tests Jest, en miroir de src/
```

## Conventions de code

- TypeScript strict, `any` interdit.
- Prettier : guillemets simples, **pas de point-virgule**, virgules finales (es5),
  100 caractères par ligne.
- Code et noms en anglais ; **commentaires toujours en français** ; **tout texte visible par
  l'utilisateur en français**.
- Commentaires seulement pour expliquer un « pourquoi » non évident.

## Mobile (React Native CLI, sans Expo)

- Cible Android. Build sous Windows : `npm start` (Metro) puis `npm run android`.
- Imports internes avec l'alias `@/` (= `src/`). Pas d'import relatif qui remonte (`../`).
- Débogage : Reactotron (`src/config/reactotron.ts`, dev seulement). `npm run reactotron`
  une fois le téléphone branché. Les `console.log` partent dans Reactotron, pas dans Metro.
- Zod 4 a besoin de `@babel/plugin-transform-export-namespace-from` (v7, comme Babel) dans
  `babel.config.js`. Sans lui, Metro plante (« Export namespace should be first transformed »).
- Tests : Jest + Testing Library React Native, dans `__tests__/` en miroir de `src/`.
  `render`, `renderHook` **et `fireEvent`** sont async : toujours `await`.
- TypeScript strict, composants en fonctions, un composant exporté par défaut par fichier.
- Styles avec `StyleSheet.create` en bas du fichier.
- Code et noms en anglais ; **commentaires toujours en français** ; **tout texte visible par
  l'utilisateur en français**.

## Interface (UI)

- Thème clair + sombre, qui suit le réglage du téléphone. Couleur d'accent : vert `#16A34A`
  (`#22C55E` en sombre, pour la lisibilité).
- Couleurs du moment : `useColors()`. Styles qui dépendent des couleurs : une fonction
  `createStyles(colors)` en bas du fichier (avec `StyleSheet.create`), utilisée via
  `useThemedStyles(createStyles)` dans le composant.
- Style shadcn/ui reproduit à la main (pas de NativeWind ni de librairie UI) : bordures
  fines, coins arrondis modérés, peu d'ombres, une seule couleur d'accent.
- **Aucune couleur ni taille codée en dur dans les écrans** : tout vient de `src/theme.ts`.
- Avant de créer un bouton, un champ ou une carte dans un écran, utiliser (ou compléter)
  le composant de `src/components/ui/`.
- Écran avec des champs de texte : `KeyboardAwareScrollView` au lieu de `ScrollView`.
- Pas de barre de défilement visible : `showsVerticalScrollIndicator={false}` (et
  horizontal) sur chaque `ScrollView` / `FlatList`.
- Icônes : uniquement `lucide-react-native` (pas d'emoji ni de symbole texte).
- Textes : verbes d'action clairs (« Enregistrer », « Supprimer »), phrases courtes,
  messages d'erreur qui disent quoi faire.

## État (Jotai + MMKV)

- État partagé entre écrans : atomes Jotai dans `src/store/` (un fichier `<sujet>Atom.ts`).
- `atom()` pour l'état temporaire (UI, données de passage) ; `atomWithMMKV()` pour ce qui
  doit survivre à la fermeture de l'app (préférences, onboarding, brouillons, tâches).
- Jamais d'AsyncStorage. Jamais de `useState` ni de Context pour un état partagé entre écrans.
- Données venant d'une API : TanStack Query, pas copiées dans un atome.
- MMKV n'est pas chiffré : jamais de jeton ni de secret dedans (Keystore via
  `react-native-keychain`, avec accord).

## Navigation

- Un écran = un fichier dans `src/screens/`, déclaré dans `RootNavigator.tsx` et typé
  dans `src/navigation/types.ts`.

## API (TanStack Query + axios)

- Flux obligatoire : **API → DTO → Mapper → Model → Hook → Écran**. Aucun DTO dans un écran
  ou un composant.
- Une API = un dossier `src/apis/<nomApi>/` (`client.ts`, `dto/`, `mappers/`, `hooks/`).
  Notre backend : `backendApi`, avec axios-case-converter (camelCase automatique). API
  externe : client axios sans conversion.
- `import { create } from 'axios'`, jamais `fetch` direct ni `axios.get` hors d'un client.
- Mappers nommés `<source>DTOto<Model>`. Modèles dans `src/models/<entity>/<entity>.model.ts`.
- Hooks dans `hooks/<entity>/use<Entity>.ts` : fonction d'appel + `useQuery`/`useMutation`.
  Clés de cache centralisées (`recipeKeys`). Après une mutation : invalider ou mettre à jour le cache.
- Chaque écran gère chargement, erreur (message en français + « Réessayer ») et données.
- Pas de données serveur copiées dans un `useState`, un atome ou un contexte.
- Jeton : Keystore (mobile), jamais MMKV ni AsyncStorage.
- URL de l'API : `src/config/env.ts`. En dev, `adb reverse tcp:8090 tcp:8090`.

## Formulaires (React Hook Form + Zod)

- Chaque formulaire a un schéma Zod. Le type des valeurs vient du schéma
  (`z.infer`), on ne le réécrit pas à la main.
- Messages d'erreur en français, qui disent quoi faire (« 8 caractères minimum »).
- Champs via le composant partagé `FormInput` (`src/components/FormInput.tsx`), jamais un
  champ nu avec son erreur recodée à la main.
- Les erreurs 422 renvoyées par l'API sont affichées sous les champs (`setError`).
- Bouton d'envoi désactivé pendant l'envoi (`formState.isSubmitting`).
- `@hookform/resolvers` est en **v5** : la v6 (octobre 2026) était mal publiée (conflit de
  dépendances). Passer en v6 seulement quand elle s'installe sans `--legacy-peer-deps`.

## Traduction (i18next)

- **Aucun texte visible écrit en dur** dans un composant : tout passe par
  `const { t } = useTranslation()` puis `t('cle')`. Textes dans `src/i18n/locales/fr.json`.
- Clés en anglais, camelCase, groupées par écran ou fonctionnalité (`todoList.emptyTitle`).
  Textes partagés (boutons…) dans `common`.
- Pluriels avec `_one` / `_other` et `t('todoList.count', { count })`. Variables avec
  `{{name}}`. Jamais de concaténation de morceaux de phrase.
- Clés typées : une clé inconnue est une erreur TypeScript. Ajouter la clé dans `fr.json`
  avant de l'utiliser.
- Dates et nombres : `Intl.DateTimeFormat(i18n.language)`, `Intl.NumberFormat(i18n.language)`.
- Ajouter une langue = un nouveau `locales/<lang>.json` avec les mêmes clés + `supportedLngs`
  (et proposer `react-native-localize`, avec accord).

## Tests

- Titres des tests (`describe`, `it`) **en anglais** ; commentaires explicatifs **en français**.
- Tester le comportement (ce que l'utilisateur voit et fait, ce que la fonction renvoie),
  jamais les styles, l'implémentation interne ou les types.
- Toute nouvelle fonctionnalité, tout bug corrigé, a son test. L'agent `testeur` les écrit.
- **Les tests sont lancés uniquement par l'agent `testeur`** (étape 1 du workflow commit) :
  ni par un hook, ni en dehors de lui. Sur Windows, jamais depuis Ubuntu/WSL (disque `E:` trop
  lent : les tests dépassent le délai de Jest).
- Ordre de priorité quand le temps manque : logique pure (utils, mappers) → appels API →
  hooks → composants.
- Écran qui utilise un atome : `makeJotaiWrapper(makeStore([...]))` en `wrapper` du `render`
  (un store neuf par test). MMKV est remplacé par `__mocks__/react-native-mmkv.ts`.
- Les vrais textes français sont chargés dans `jest.setup.js` (`@/i18n`) : les tests
  cherchent « Enregistrer », pas la clé.
- Une lib native qui fait planter Jest (« Cannot use import statement outside a module ») :
  l'ajouter à `transformIgnorePatterns` dans `jest.config.js`.

## Performance React

- Suivre le skill `vercel-react-best-practices`, en ne gardant que les règles qui
  s'appliquent (pas de Next.js ici) : voir
  `~/.claude/skills/nouveau-projet/references/react-performance.md`.
- SWR → TanStack Query ; `next/dynamic` → `React.lazy`. Règles `server-` ignorées.
- Pas de `useMemo` / `memo` « au cas où » : seulement quand c'est justifié.
- **React Native uniquement :** suivre aussi `vercel-react-native-skills`, avec le tri de la
  même fiche (pas d'Expo : `Image` au lieu d'expo-image, `FlatList` avant FlashList,
  polices dans les assets Android). Toute règle qui ajoute une dépendance : avec accord.

## Suppression de fichiers

Jamais de suppression définitive : passer par la corbeille (voir les règles globales de
Christophe), la Corbeille Windows (PowerShell). Demander avant de supprimer `node_modules`,
`android/build`, `android/app/build`.
