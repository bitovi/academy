# Notes for each step

## 02 Generate app

```bash
npx react-native@latest init PlaceMyOrder
```

```bash
npm start
```

In a new terminal 

```bash
npm run android
```

## 03 Test setup

[docs](https://testing-library.com/docs/react-native-testing-library/intro/)

```bash
npm install --save-dev @testing-library/react-native 
```

Because of Typescript, we will need to add types for Jest

```bash
npm i --save-dev @types/jest
```

Copy basic test and simplify App

Add "Place my order" text and test for it

##