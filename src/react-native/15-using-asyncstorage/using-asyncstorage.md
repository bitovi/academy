@page learn-react-native/using-asyncstorage Using AsyncStorage
@parent learn-react-native 15
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Cache API responses

Now that the core functionality of our app is working, let’s improve its performance by caching API responses and using them for GET requests.

### Storing data on device

In mobile applications, persisting data locally is crucial for enabling offline usage and improving app responsiveness by reducing the need for network requests.
React Native provides several options for local storage, ranging from simple key-value storage to more complex solutions like SQLite or Realm.
For most use cases, especially when starting out, a simpler and effective solution suffices — such as `@react-native-async-storage/async-storage`.

#### Using `@react-native-async-storage/async-storage`

This package is a local storage system that is ideal for storing small pieces of data.
It operates asynchronously and stores data in key-value pairs, making it a good choice for lightweight persistence without the need for setting up a database.

Its API includes a lot of functionality, but we’ll focus on using:

- `setItem`
- `getItem`
- `getAllKeys`
- `clear`

#### Storing items

Use the `setItem` method to store data using `AsyncStorage`.
Since it only supports storing strings, complex data such as objects or arrays must be serialized using `JSON.stringify` before storage.

Here is an example:

@sourceref ./setItem.ts
@highlight 6

This function takes a `restaurant` object, converts it into a string, and saves it under the key `"restaurantData"`.

#### Getting items

Retrieving data from `AsyncStorage` is done using the `getItem` method.
The retrieved data, being in string format, often needs to be converted back into JSON format using `JSON.parse`.

Consider this example:

@sourceref ./getItem.ts
@highlight 5

This function fetches the data stored under the `"restaurantData"` key and converts it from a string back into an object.

#### Getting all keys

Sometimes, it is necessary to know all the keys under which data is stored.

The `getAllKeys` method provides this capability:

@sourceref ./getAllKeys.ts
@highlight 5

Continuing from our examples above, the `keys` array would be:

```ts
;["restaurantData"]
```

#### Clearing all storage

Use the `clear` method to remove all data stored in `AsyncStorage`:

@sourceref ./clear.ts
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

- **Conditional cache strategy:** Using conditional requests with cache tags (like ETag) or timestamps, the app can minimize data transfer by asking the server if there are updates since the last fetch. If the data hasn't changed, the server returns a not-modified status, allowing the app to use cached data.

- **Incremental cache update:** Suitable for data that can be partitioned or incremental updates (like paginated queries). Instead of refreshing the entire cache, only new or updated data chunks are fetched and cached.

- **Intelligent cache invalidation:** A more complex strategy where the app decides when to invalidate cache based on specific rules or expiry times, often used in conjunction with other strategies to optimize data freshness versus retrieval time.

Each of these strategies can be implemented depending on the specific needs of the application, data sensitivity, user experience requirements, and network conditions.
Choosing the right caching strategy is critical for balancing between data freshness, responsiveness, and minimizing network usage.

#### Local cache first (cache-then-network)

For our application, we will implement the **“local cache first” (cache-then-network)** strategy.

Here are some pointers on implementing this strategy:

- **Only cache GET requests.** Most APIs make it so HEAD and GET requests are idempotent (they can be repeated over and over to the same effect), so they are safe to cache and reuse.
- **Store API requests by the full URL.** Relative URLs can be a pain to deal with if you’re working with multiple servers.
- **Use a prefix for the storage key.** A prefix before the URL can make it easier to find the same type of cached data, and separate it from other things that might be in storage.
- **Store the response data with metadata in the cache.** Metadata can give you more info about the cached item, e.g. the date and time of when the item was cached could be stored as a string after calling `new Date()`.

### Setup 1

✏️ Run:

```bash
npm install @react-native-async-storage/async-storage@1
```

✏️ Update **jest-setup.ts** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/jest-setup.ts ../../../exercises/react-native/15-async-storage/01-problem/jest-setup.ts only

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

For this exercise, let’s implement the storage APIs and use them to cache network responses:

- Implement the four `AsyncStorage` helpers in `storage.ts`.
- When a GET response is received, cache the response (and the current datetime) with the storage helpers.
- When a GET request is made, check the cache first; if it’s been less than a minute since cached, return the cached value, otherwise make the request.

You can verify that this is working correctly by using DevTools to:

- View the requests (or lack thereof) being made.
- Inspect the stored data.

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

✏️ Update **src/services/pmo/api/api.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/01-solution/src/services/pmo/api/api.ts ../../../exercises/react-native/15-async-storage/02-problem/src/services/pmo/api/api.ts only

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
