# ✅ **project-test-rn**

> _Application mobile Android de test : une liste de tâches simple, pour valider la création d'un projet React Native._

![React Native](https://img.shields.io/badge/React_Native-0.88-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-007ACC?style=for-the-badge&logo=typescript)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

---

### 📖 **Description**

Ce projet sert à tester de bout en bout la création d'une application React Native (CLI, sans
Expo) avec toutes les conventions habituelles : thème, composants d'interface, qualité du code,
tests et workflow Git.

L'application affichera, sur son écran principal, une liste de tâches (todo). On pourra créer,
modifier et supprimer une tâche, et indiquer qu'elle est terminée. Les tâches seront enregistrées
sur le téléphone : elles restent après la fermeture de l'application.

**État actuel :** la liste de tâches est terminée et testée (tests automatiques et émulateur Android).

---

### ✨ **Fonctionnalités**

- ✅ Thème clair et sombre qui suit le réglage du téléphone, couleur d'accent verte
- ✅ Liste des tâches sur l'écran principal, avec le nombre de tâches restantes
- ✅ Créer une tâche (titre obligatoire, 100 caractères maximum)
- ✅ Modifier une tâche (appui sur son titre)
- ✅ Supprimer une tâche, après confirmation
- ✅ Marquer une tâche comme terminée (case à cocher) : elle passe en bas de la liste, barrée
- ✅ Enregistrement des tâches sur le téléphone (elles restent après fermeture)

---

### 🛠️ **Stack technique**

- **Mobile :** React Native 0.88 (CLI, sans Expo), React 19.3, TypeScript 6
- **Navigation :** React Navigation 7 (native stack)
- **État et stockage :** Jotai 3 + react-native-mmkv 4
- **API (prête pour plus tard) :** TanStack Query 5, axios 1, axios-case-converter
- **Formulaires :** React Hook Form 7 + Zod 4 (@hookform/resolvers 5)
- **Traduction :** i18next 26 + react-i18next 17 (français)
- **Icônes :** lucide-react-native
- **Débogage :** Reactotron (développement seulement)
- **Tests :** Jest 29 + Testing Library React Native 14
- **Qualité :** ESLint (config React Native), Prettier 3, Husky, lint-staged, commitlint,
  validate-branch-name, CodeRabbit, GitHub Actions

---

### 📋 **Prérequis**

- Windows avec Node 22.11 ou plus (testé avec Node 24), JDK 17 et le SDK Android
- Un téléphone Android branché en USB (débogage activé) ou un émulateur
- WSL (Ubuntu) avec Git et Node, pour les hooks Husky
- Optionnel : l'application de bureau [Reactotron](https://github.com/infinitered/reactotron/releases)

---

### 🚀 **Démarrage rapide**

1. **Cloner le dépôt** (dans WSL) :

   ```bash
   cd /mnt/e/DEV/PERSO
   git clone git@github.com:bezedache29/project-test-rn.git
   cd project-test-rn
   ```

2. **Installer les dépendances** (dans PowerShell, dans `E:\DEV\PERSO\project-test-rn`) :

   ```powershell
   npm install
   ```

3. **Lancer Metro** (le serveur qui envoie le code JavaScript au téléphone), dans un premier terminal PowerShell :

   ```powershell
   npm start
   ```

4. **Compiler et installer l'app** sur le téléphone ou l'émulateur, dans un second terminal PowerShell :

   ```powershell
   npm run android
   ```

5. **Optionnel, Reactotron :** ouvrir l'application de bureau Reactotron, puis :

   ```powershell
   npm run reactotron
   ```

---

### 🧪 **Tests**

```bash
npm test
```

Jest + Testing Library React Native. Les tests sont dans `__tests__/`, en miroir de `src/`.

---

### 📁 **Structure du projet**

```
App.tsx              point de départ : thème, navigation, TanStack Query
index.js             entrée de l'app : Reactotron, traduction, puis App
src/
  screens/           un fichier par écran (liste des tâches, formulaire)
  components/        composants réutilisables (TodoItem, FormInput)
  components/ui/     boutons, cartes, champs de texte, case à cocher…
  models/            forme des données (une tâche)
  schemas/           règles de validation des formulaires (Zod)
  utils/             actions sur les tâches (ajouter, cocher, trier…)
  navigation/        liste des écrans et leurs types
  theme.ts           couleurs (clair + sombre), tailles, espacements
  store/             état partagé et stockage sur le téléphone (Jotai + MMKV)
  apis/backendApi/   client HTTP pour une future API
  config/            Reactotron, TanStack Query, URL de l'API
  i18n/              traduction (textes dans locales/fr.json)
test-utils/          aides pour les tests
__mocks__/           faux modules natifs pour les tests (MMKV)
__tests__/           tests
```

---

### 🔀 **Workflow Git**

- Branches : `main` (stable), `dev` (intégration), `feature/…`, `fix/…`, `chore/…`,
  `refactoring/…`, `docs/…`, `test/…`.
- Commits [Conventional Commits](https://www.conventionalcommits.org) en anglais
  (`feat: add login screen`), vérifiés par commitlint.
- Hooks Husky : nom de branche, types et format au commit ; nom de branche et tests au push.
- Chaque PR vise `dev` ; `main` ne reçoit que des releases depuis `dev`.
