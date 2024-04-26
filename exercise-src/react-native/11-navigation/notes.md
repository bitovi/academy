# Navigation

## Bottom tab


Install React Navigation

```bash
npm install react-native-screens react-native-safe-area-context @react-navigation/native @react-navigation/bottom-tabs
```

Install icons for bottom tabs

```bash
npm i --save react-native-vector-icons
```

```bash
npm i --save-dev @types/react-native-vector-icons
```

Fonts need to be added to Android gradle config https://github.com/oblador/react-native-vector-icons?tab=readme-ov-file#android-setup

Edit App to add bottom tab nav

## Stack

```bash
npm i --save @react-navigation/stack react-native-gesture-handler;
```

Add to index

```ts
import 'react-native-gesture-handler';
```

- Add stack and types to App
- screens/CityList
- link to City from State