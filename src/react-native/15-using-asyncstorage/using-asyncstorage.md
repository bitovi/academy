@page learn-react-native/using-asyncstorage Using Async Storage
@parent learn-react-native 15
@outline 3

@description Store data locally on device with Async Storage and run data migrations with new versions of your application.

@body

## Overview

In this section, you will:

- Store data on device.
- Use React Native Async Storage to store items, get items, and more.
- Implement a local cache first (cache-then-network) strategy.
- Migrate data with a new version of the application.

## Objective 1: Cache API responses

Now that the core functionality of our app is working, let’s improve its performance by caching API responses and using them for GET requests.

### Storing data on device

In mobile applications, persisting data locally is crucial for enabling offline usage and improving app responsiveness by reducing the need for network requests.
React Native provides several options for local storage, ranging from simple key-value storage to more complex solutions like SQLite or Realm.
For most use cases, especially when starting out, a simpler and effective solution suffices — such as `@react-native-async-storage/async-storage`.

### Using React Native Async Storage

The `@react-native-async-storage/async-storage` package is a local storage system that is ideal for storing small pieces of data.
It operates asynchronously and stores data in key-value pairs, making it a good choice for lightweight persistence without the need for setting up a database.

Its API includes a lot of functionality, but we’ll focus on using:

- `setItem`
- `getItem`
- `getAllKeys`
- `clear`

### Storing items

Use the `setItem` method to store data using `AsyncStorage`.
Since it only supports storing strings, complex data such as objects or arrays must be serialized using `JSON.stringify` before storage.
This also means that classes and functions can't be serialized for storage.

Here is an example:

@sourceref ./async-setItem.ts
@highlight 1, 5-6, only

This function takes a `restaurant` object, converts it into a string, and saves it under the key `"restaurantData"`.

### Getting items

Retrieving data from `AsyncStorage` is done using the `getItem` method.
The retrieved data, being in string format, often needs to be converted back into JSON format using `JSON.parse`.

Consider this example:

@sourceref ./async-getItem.ts
@highlight 5-6, only

This function fetches the data stored under the `"restaurantData"` key and converts it from a string back into an object.

### Getting all keys

Sometimes, it is necessary to know all the keys under which data is stored.

The `getAllKeys` method provides this capability:

@sourceref ./async-getAllKeys.ts
@highlight 5

Continuing from our examples above, the `keys` array would be: `["restaurantData"]`

### Clearing all storage

Use the `clear` method to remove all data stored in `AsyncStorage`:

@sourceref ./async-clear.ts
@highlight 5

After calling `clear()`, the `getAllKeys` method would return an empty array, and any `getItem` calls would no longer return data.

### Caching strategies

In applications that make network requests, caching responses can improve performance while decreasing network data usage.

There are _many_ different types of caching strategies for network requests:

- **No cache strategy:** Every request is sent to the server without any attempt to cache data. This is suitable when data updates frequently or when exact real-time data is crucial.

- **Local cache first (cache-then-network):** The app first tries to load data from the local cache. If the data is not available or is stale, it fetches data from the network and updates the cache. This is useful for reducing network requests and speeding up data retrieval.

- **Cache only:** The app relies entirely on the cached data and does not perform any network requests. This is ideal for offline modes where no network connection is available.

- **Cache with network update (stale-while-revalidate):** The app initially serves data from the cache for quick access, but simultaneously fetches the latest data from the network to update the cache. This way, users see data quickly and also get updates as they come.

- **Network with cache fallback:** The primary approach is to fetch data from the network, but if the network is unavailable or the request fails, data is loaded from the cache. This is useful for maintaining functionality when offline or in poor network conditions.

- **Conditional cache strategy:** Using conditional requests with cache tags (like ETag) or timestamps, the app can minimize data transfer by asking the server if there are updates since the last fetch. If the data hasn’t changed, the server returns a not-modified status, allowing the app to use cached data.

- **Incremental cache update:** Suitable for data that can be partitioned or incremental updates (like paginated queries). Instead of refreshing the entire cache, only new or updated data chunks are fetched and cached.

- **Intelligent cache invalidation:** A more complex strategy where the app decides when to invalidate cache based on specific rules or expiry times, often used in conjunction with other strategies to optimize data freshness versus retrieval time.

Each of these strategies can be implemented depending on the specific needs of the application, data sensitivity, user experience requirements, and network conditions.
Choosing the right caching strategy is critical for balancing between data freshness, responsiveness, and minimizing network usage.

### Local cache first (cache-then-network)

For our application, we will implement the **“local cache first” (cache-then-network)** strategy.

Here are some pointers on implementing this strategy:

- **Only cache GET requests.** Most APIs make it so HEAD and GET requests are idempotent (they can be repeated over and over to the same effect), so they are safe to cache and reuse.
- **Store API requests by the full URL.** Relative URLs can be a pain to deal with if you’re working with multiple servers.
- **Use a prefix for the storage key.** A prefix before the URL can make it easier to find the same type of cached data, and separate it from other things that might be in storage.
- **Store the response data with metadata in the cache.** Metadata can give you more info about the cached item, e.g. the date and time of when the item was cached could be stored as a string after calling `new Date()`.

### Setup 1

✏️ Install the new dependency:

```bash
npm install @react-native-async-storage/async-storage@1
```

✏️ Terminate the existing dev server and start it again:

```bash
npm run start
```

✏️ Update **jest-setup.ts** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/jest-setup.ts ../../../exercises/react-native/15-async-storage/01-problem/jest-setup.ts only

✏️ Create **src/shared/services/storage/storage.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/storage/storage.ts
@highlight 3

✏️ Create **src/shared/services/storage/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/storage/index.ts

✏️ Update **src/shared/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/shared/services/pmo/api/api.ts ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/pmo/api/api.ts only

### Verify 1

✏️ Create **src/shared/services/storage/storage.mock.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/storage/storage.mock.ts

✏️ Create **src/shared/services/storage/storage.test.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/storage/storage.test.ts
@highlight 27, 49, 61, 75, only

✏️ Update **src/shared/services/pmo/api/api.mock.ts** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/shared/services/pmo/api/api.mock.ts ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/pmo/api/api.mock.ts only

### Exercise 1

For this exercise, let’s implement the storage APIs and use them to cache network responses:

- Implement the four `AsyncStorage` helpers in `storage.ts`.
- When a GET response is received, cache the response (and the current datetime) with the storage helpers.
- When a GET request is made, check the cache first; if it’s been less than a minute since cached, return the cached value, otherwise make the request.

You can verify that this is working correctly by using DevTools to:

- View the requests (or lack thereof) being made.
- Inspect the stored data.

You can terminate the `api` server to check that uncached requests show an error.

**Hint:** Use [`new Date().toJSON()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON) to get the current datetime as a string.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/shared/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/pmo/api/api.ts ../../../exercises/react-native/15-async-storage/01-solution/src/shared/services/pmo/api/api.ts only

✏️ Update **src/shared/services/storage/storage.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/01-problem/src/shared/services/storage/storage.ts ../../../exercises/react-native/15-async-storage/01-solution/src/shared/services/storage/storage.ts only

</details>

## Objective 2: Migrate data between versions

Our overall approach to caching the network responses seems great, although there is an improvement that we could make.

Right now, we’re storing the datetime as a string in Async Storage, which means we have to parse it every time we check the cached response:

@sourceref ../../../exercises/react-native/15-async-storage/01-solution/src/shared/services/pmo/api/api.ts
@highlight 7, 38-39, 66, only

We could improve this by storing the datetime as a number instead, so we don’t have to parse it when fetching from the cache:

@diff ../../../exercises/react-native/15-async-storage/01-solution/src/shared/services/pmo/api/api.ts ../../../exercises/react-native/15-async-storage/02-problem/src/shared/services/pmo/api/api.ts only

If we make this change, it would be great if we could migrate the old cached data (with strings) to the new format (with numbers).
Let’s dig into how we can add data migration to the application.

### Migrating data

Here’s a brief overview of what you can do to build a migration process with the application:

- Make changes to the `apiRequest` helper to use numbers instead of strings.
- Add a component to the `App` JSX to block rendering the child components until the migration has been run.
- While the migration is running, show a loading screen.
- Check a version number with the data to determine whether the migration should run.
- Run the migration to convert the old string values to numbers.
- Store an updated version number with the data so future launches of the app know that the data has been updated.
- Render the child components after the migration has finished.

We’ve already covered the `apiRequest` helper changes we want for using numbers instead of strings, so we’ll start with the component we’ll add to the `App`.

### Blocking rendering child components

When updating an application, it’s essential to ensure the existing data is compatible with the new version.
This often involves data migration, which should complete before the app continues to render its components.
To achieve this, a component can be used in the `App` JSX to block the rendering of child components until the migration is complete.

@sourceref ./migrate-blocking.tsx
@highlight 5-11, 17, only

In this example, the “Loading…” text is shown when `isMigrating` is `true`, blocking the rendering of the rest of the application until the migration is completed.

### Running the migration

Next, we need to run the actual migration!

The migration will inevitably include a call to an `async` function, so include a `useEffect` for this logic:

@diff ./migrate-blocking.tsx ./migrate-migrating.tsx only

### Versioning the data

The code will currently run the migration every time the app launches, but it should only run the migration when it’s necessary.

To accomplish this, we can store a version number and fetch it before running the migration:

@sourceref ./migrate-versioning.tsx
@highlight 17-18, 20, only

Ideally we would have added a version number when we first started storing the data, but that’s ok!
We’ll assume that the data is version `1` if we haven’t stored the version number, and then we’ll call our new data version `2`.

### Setup 2

✏️ Create **src/shared/services/DataMigration/DataMigration.tsx** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/02-problem/src/shared/services/DataMigration/DataMigration.tsx
@highlight 13, 21-23, only

✏️ Create **src/shared/services/DataMigration/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/02-problem/src/shared/services/DataMigration/index.ts

✏️ Update **src/shared/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/01-solution/src/shared/services/pmo/api/api.ts ../../../exercises/react-native/15-async-storage/02-problem/src/shared/services/pmo/api/api.ts only

### Verify 2

✏️ Create **src/shared/services/DataMigration/DataMigration.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/15-async-storage/02-problem/src/shared/services/DataMigration/DataMigration.test.tsx
@highlight 33, 45, 57, 89, only

### Exercise 2

Now let’s implement a data migration!
We’ve already given you the changes to the `apiRequest` helper, so now you’ll need to write the logic for migrating the old data to the new format.

Here are the requirements for this exercise:

- Add the `DataMigration` component to the `App` JSX so that it blocks the `NavigationContainer` component (and its children) from rendering until the migration is complete.
- Update the `DataMigration` component to do the following:
  - Run the migration in a `useEffect`:
    - It will fetch the data version (and assume version `1` if not stored).
    - If the data version is less than `2`, then run the migration and update the stored version number.
  - While the migration is running, show a `Loading` component.
  - When the migration is all done, render the `children`.
- Here’s what we need to do for the actual migration logic:
  - Get all the keys in Async Storage.
  - For all the keys that start with our `keyPrefix`:
    - Fetch the old data.
    - Translate it to the new format.
    - Store the new data.
  - If there are any errors during the migration process, since this is just a network cache, delete everything in Async Storage.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/shared/services/DataMigration/DataMigration.tsx** to be:

@diff ../../../exercises/react-native/15-async-storage/02-problem/src/shared/services/DataMigration/DataMigration.tsx ../../../exercises/react-native/15-async-storage/02-solution/src/shared/services/DataMigration/DataMigration.tsx only

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/15-async-storage/02-problem/src/App.tsx ../../../exercises/react-native/15-async-storage/02-solution/src/App.tsx only

</details>

## Next steps

Next, we will learn [learn-react-native/security-and-auth].
