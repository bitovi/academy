@page learn-react-native/using-asyncstorage Using AsyncStorage
@parent learn-react-native 15
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Learn to store data locally

### Concept TODO

TODO

### Setup 1

✏️ Update **jest-setup.ts** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/jest-setup.ts ../../../exercises/react-native/15-async-storage/01-problem/jest-setup.ts only

✏️ Run:

```bash
npm install @react-native-async-storage/async-storage@1
```

✏️ Create **src/services/storage/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/services/storage/index.ts

✏️ Create **src/services/storage/storage.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/services/storage/storage.ts

✏️ Update **src/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/services/pmo/api/api.ts ../../../exercises/react-native/15-async-storage/01-problem/src/services/pmo/api/api.ts only

### Verify 1

✏️ Create **src/services/storage/storage.mock.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/services/storage/storage.mock.ts

✏️ Create **src/services/storage/storage.test.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/services/storage/storage.test.ts

### Exercise 1

- store response from requests, return stored value if network failure

- View requests in devTools

- View stored data in devTools/Flipper

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/01-problem/src/services/pmo/api/api.ts ../../../exercises/react-native/15-async-storage/01-solution/src/services/pmo/api/api.ts only

✏️ Update **src/services/storage/storage.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/01-problem/src/services/storage/storage.ts ../../../exercises/react-native/15-async-storage/01-solution/src/services/storage/storage.ts only

</details>

## Objective 2: Migrating data between versions

### Concept TODO

TODO

### Setup 2

✏️ Create **src/services/DataMigration/DataMigration.tsx** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/02-problem/src/services/DataMigration/DataMigration.tsx

✏️ Create **src/services/DataMigration/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/02-problem/src/services/DataMigration/index.ts

### Verify 2

✏️ Create **src/services/DataMigration/DataMigration.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/02-problem/src/services/DataMigration/DataMigration.test.tsx

### Exercise 2

- Add useEffect to root component, checks if migration needed on app load

- Using stored data version to determine if migration should run

- Change from storing whole request to just request.data

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/DataMigration/DataMigration.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/02-problem/src/services/DataMigration/DataMigration.tsx ../../../exercises/react-native/15-async-storage/02-solution/src/services/DataMigration/DataMigration.tsx only

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/15-async-storage/02-problem/src/App.tsx ../../../exercises/react-native/15-async-storage/02-solution/src/App.tsx only

</details>

## Next steps

Next, we will learn [learn-react-native/security-and-auth].