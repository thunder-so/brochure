# Deploy a Create React App SPA on AWS

You can deploy a [Create React App](https://github.com/facebook/create-react-app) site on AWS in under a minute. Your site is served over a lightning-fast global CDN, comes with fully managed TLS certificates, and supports custom domains out of the box.

1. Use your existing React repository.

2. Create a new Application on Thunder, and give Thunder permission to access your new repo.

3. Use the following values during creation:

| **Parameter**             | **Value**         |
|---------------------------|-------------------|
| Install Command           | `npm install`    |
| Build Command             | `npm run build`      |
| Output Directory          | `build`           |

That’s it! Your app will be live on your CloudFront URL as soon as the build finishes.


## Use Client-side Routing

If you use Reach Router or [React Router](https://github.com/ReactTraining/react-router) for [client-side routing](https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing), you will need to direct all routing requests to `index.html`s so they can be handled by your routing library.

You can do this easily by defining a Redirect Rule for your site. Go to the Redirects section for your app settings and add a rule with the following values:


| **Parameter**             | **Value**         |
|---------------------------|-------------------|
| Source Path               | `/*`              |
| Destination Path          | `/index.html`     |
