## 10.1 Static Jekyll Deployment and Build Output

### Objective

Structure and configure the React application so that its production build can be copied directly into a directory named `tickets-react` within an existing Jekyll website and deployed as part of that static site.

The application must operate entirely from the generated static assets in production. It must not require a running Node.js server, React development server, or server-side rendering infrastructure on the hosting environment.

### 10.1.1 Build Output

Configure the production build to generate a self-contained set of deployable files in a clearly defined output directory.

- Use `tickets-react` as the deployment directory name within the Jekyll site.
- Prefer a separate build output directory, such as `dist/`, within the React project, to avoid mixing source files with generated output.
- Ensure the output contains all required HTML, JavaScript, CSS, fonts, images, icons, and other runtime assets.
- Generate production-optimised, minified assets using the existing build system or an appropriate compatible alternative.
- Ensure the build does not require access to source files, development dependencies, or Node.js at runtime.
- Keep generated files separate from the React source code.
- Ensure the output directory can be safely recreated through a clean production build.

### 10.1.2 Base Paths and Asset URLs

Configure the application so that it works when hosted under the `/tickets-react/` URL path rather than the domain root.

- Configure the build system's public base path, asset prefix, or equivalent setting for `/tickets-react/`.
- Ensure generated HTML references JavaScript, CSS, fonts, images, and other assets using correct URLs.
- Avoid hard-coded root-relative asset paths that would incorrectly resolve to locations such as `/assets/` instead of `/tickets-react/assets/`.
- Verify that dynamic imports, lazy-loaded components, and code-split JavaScript chunks load correctly from the deployment directory.
- Verify that imported assets and assets referenced from CSS resolve correctly.
- Ensure the production build does not depend on the development server's URL rewriting or fallback behaviour.

### 10.1.3 React Routing

Determine whether the application uses client-side routing.

If it does:

- Configure the router with an appropriate basename of `/tickets-react` or the equivalent supported by the chosen routing library.
- Ensure internal navigation, links, redirects, and route generation respect the deployment prefix.
- Test direct navigation to nested routes and browser refresh behaviour.
- Account for the fact that GitHub Pages and typical static Jekyll hosting do not automatically rewrite arbitrary URLs to the React application's `index.html`.
- Where necessary, use a routing strategy compatible with static hosting, such as hash-based routing, or implement a documented static-host-compatible fallback strategy.
- Preserve existing routes and navigation behaviour as far as the hosting constraints allow.

Do not introduce hash-based routing automatically if the existing routing architecture can be retained safely with an appropriate static-hosting solution.

### 10.1.4 Integration with Jekyll

Treat the Jekyll website as the host application and the React application as a separately built static sub-application.

- Do not replace, restructure, or otherwise disrupt the existing Jekyll site.
- Keep React-specific source files, dependencies, configuration, and development scripts in the React project.
- Do not place React source files or `node_modules` inside the Jekyll deployment directory.
- Ensure generated React output can be copied into the Jekyll site's `tickets-react/` directory without requiring Jekyll to compile the React source.
- Verify Jekyll's configuration and ignore rules do not exclude the generated React assets.
- Prevent Jekyll from unintentionally processing, rewriting, or altering generated React files.
- Ensure the React entry HTML is served as the application entry point and static assets retain their correct MIME types.
- Preserve the existing Jekyll layouts, navigation, styling, URLs, and build workflow.
- Avoid conflicting with the Jekyll site's existing CSS, JavaScript, global styles, or page-level configuration.

The React application must remain independently buildable and testable.

### 10.1.5 Copy and Deployment Workflow

Provide a documented, repeatable deployment workflow.

The intended process is:

1. Install the React project's dependencies using its existing package manager.
2. Run the production build.
3. Verify that the generated output contains the expected entry HTML and assets.
4. Copy the contents of the build output directory into the Jekyll site's `tickets-react/` directory.
5. Build the Jekyll site using its existing build command.
6. Verify the resulting website serves the React application and its assets correctly under `/tickets-react/`.

Add a suitable npm script or documented command to simplify the production build. If the Jekyll site's location is known, optionally provide a configurable deployment script that copies the generated files into the correct destination.

Do not hard-code an unknown filesystem path or overwrite unrelated files. A deployment script must clearly identify its destination, handle errors, and avoid deleting files outside the intended React deployment directory.

If a configurable destination is used, document how it is supplied. Do not require deployment credentials or external services simply to copy the files locally.

### 10.1.6 Static Hosting Constraints

The application must not assume the availability of:

- A React development server.
- A Node.js production server.
- Server-side rendering or server actions.
- Automatic SPA route rewrites.
- A custom backend, unless one is an existing, explicitly required integration.

Where the application depends on APIs, authentication providers, or external services, preserve the integrations and document their production requirements. Do not assume that building a static application makes server-dependent features work offline or without their required services.

### 10.1.7 Deployment Validation

Test the generated production build under the `/tickets-react/` path, not only at the root of a development server.

Verify that:

- The entry HTML loads successfully.
- All JavaScript and CSS assets load without 404 errors.
- Images, fonts, icons, and other static assets load correctly.
- Dynamic imports and lazy-loaded routes work.
- Internal navigation respects the deployment prefix.
- Browser refresh and direct navigation behave according to the chosen routing strategy.
- No unexpected root-relative URLs or development-server URLs remain.
- The React application does not interfere with other Jekyll pages.
- The copied files survive a complete Jekyll build and deployment.
- The application works in the target static hosting environment.

Document any hosting-specific limitations and the routing strategy selected.

### 10.1.8 Acceptance Criteria

This requirement is satisfied when:

1. The React application builds successfully into static production files.
2. The build output can be copied into the Jekyll site's `tickets-react/` directory.
3. The deployed application works at the `/tickets-react/` URL path.
4. All assets, routes, and supported interactions work correctly under that path.
5. No React or Node.js server is required to serve the built application.
6. The existing Jekyll website continues to build and function correctly.
7. The copy and deployment workflow is documented and reproducible.
8. The deployment process does not overwrite or delete unrelated Jekyll content.
9. The final report includes the actual build and deployment-path verification results.
