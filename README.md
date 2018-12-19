# university


Everything we know about frontend, backend, and design consulting and management.  Go to
https://bitovi.github.io/university/ to learn what we know.


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
the `university/doc` folder.  Use `http-server` or something similar to view.

If you are making changes to styles, adding images, or anything else, you will need to run
a `force` build with:

```
./node_modules/.bin/bit-docs -fd
```

`force` builds will take a long time.

### Adding styles

Change `university/static/styles/styles.less`, then run:

```
./node_modules/.bin/bit-docs -fd
```

This will take a while.


### Adding images

Add images to `university/img`, then run:

```
./node_modules/.bin/bit-docs -fd
```

This will take a while.
