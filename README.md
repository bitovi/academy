# Academy

Everything we know about frontend, backend, UX, and Devops consulting and management. Go to https://bitovi.com/academy/ to learn what we know.

## Developing

The following sections detail how to make various improvements to the site. Make sure you have cloned this repo and run:

```
npm install
```

### Documenting

Run:

```
npm run document
```

This will take a while the first time. The site will be created in the `academy` folder. Use `http-server` or something similar to view.

If you are making regular changes, you can use watch mode instead:

```
npm run document-watch
```

If you are making changes to styles, or adding images or other assets, you will need to run a `force` build while `skipping` installs with:

```
./node_modules/.bin/bit-docs -sfd
```

This should take about 5 seconds.

### Adding styles

Change `academy/static/styles/styles.less`, then run:

```
./node_modules/.bin/bit-docs -fd
```

This will take a while.

### Adding images

Add images to `academy/img`, then run:

```
./node_modules/.bin/bit-docs -fd
```

This will take a while.

## Publishing

Academy can be published by running the following command:

```
npm run publish
```

Doing so requires access to the Bitovi Hubspot API key, which can be found in Bitovi's 1Password `Academy` vault. Add the API key to a new `.env` file in this repos root directory:

`HUBSPOT_API_KEY=key`

If you do not have access to 1Password, please reach out to one of the maintainers of the project.
