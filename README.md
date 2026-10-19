# Tickets React App

A searchable collection of concert ticket stubs built with React.

## Development

Install dependencies and start the development server:

```sh
npm install
npm start
```

Run the tests with `npm test`.

## Production build

The optimized static build is written to `build/` and is configured to run at
`/tickets-react/`. It includes the HTML, JavaScript, CSS, ticket images, icon,
manifest, and service worker; serving the built app does not require Node.js.

```sh
npm run build
test -s build/index.html
find build -maxdepth 2 -type f
```

## Deploy to a Jekyll site

Set `JEKYLL_SITE` to the root of the existing Jekyll site, then copy the
production build into its `tickets-react/` directory:

```sh
: "${JEKYLL_SITE:?Set JEKYLL_SITE to the Jekyll site root}"
mkdir -p "$JEKYLL_SITE/tickets-react"
cp -R build/. "$JEKYLL_SITE/tickets-react/"
```

This copies files without deleting other site content. Build the Jekyll site
using its existing workflow, then verify `/tickets-react/` and the JavaScript
and CSS URLs it references. The Jekyll project is not included in this
repository, so its build and hosting configuration remain unchanged.

The app has no client-side routes, so it needs no SPA rewrite or nested-route
fallback. Its production asset URLs, including ticket images and service-worker
precache entries, use the `/tickets-react/` prefix.
