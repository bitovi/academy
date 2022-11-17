# Academy

Everything we know about frontend, backend, UX, and Devops consulting and management. Go to https://bitovi.com/academy/ to learn what we know.

## Developing

The following sections detail how to make various improvements to the site. Make sure you have cloned this repo and run:

```
npm install
```

### Watch mode

When actively working on the content, the most useful option is the watch mode. Run:

```
npm run dev
```

This will take a while the first time. The site will be created in the `academy` folder. Use `http-server` or something similar to view.

### Changing styles or images

Change `academy/static/styles/styles.less` or add images to `academy/img`, then run:

```
npm run rebuild-assets
```

This should take about 5 seconds.

### Building

If you want to do a full production build from scratch, run:

```
npm run build
```

This will take a while.

## Deploying

Academy is automatically deployed when anything is merged into `main`.

Academy can be deployed manually by running the following command:

```
npm run deploy
```

Doing so requires access to the Bitovi Hubspot API key and Campaign Id, which can be found in Bitovi's 1Password `Academy` vault. Add them to a new `.env` file in this repos root directory:

```
HUBSPOT_API_KEY=<api key>
HUBSPOT_CAMPAIGN_ID=<campaign id>
```

If you do not have access to 1Password, please reach out to one of the maintainers of the project.
