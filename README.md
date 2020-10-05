# Academy


Everything we know about front-end, backend, and design consulting and management.  Go to
https://bitovi.github.io/academy/ to learn what we know.


## Developing

The following sections detail how to make various improvements to the site.  Make sure you
have cloned this repo and run:

```
npm i
```

### Documenting

Run:

```
./node_modules/.bin/bit-docs -d
```

This will take a while the first time.  The site will be created in
the `academy/doc` folder.  Use `http-server` or something similar to view.

If you are making changes to styles, adding images, or anything else, you will need to run
a `force` build while `skipping` installs with:

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
