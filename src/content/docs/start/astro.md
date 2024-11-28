---
title: 'Deploy a Astro Static Site on AWS'
description: 'Learn how to deploy an Astro static site on AWS with ease, leveraging a global CDN, managed TLS, and custom domain support for optimal performance.'
---

You can deploy a [Astro](https://astro.build/) site on AWS in under a minute. Your site is served over a lightning-fast global CDN, comes with fully managed TLS certificates, and supports custom domains out of the box.

1. Use your existing Astro repository.

2. Create a new Application on Thunder, and give Thunder permission to access your new repo.

3. Use the following values during creation:

| **Parameter**             | **Value**         |
|---------------------------|-------------------|
| Install Command           | `npm install`    |
| Build Command             | `npm run astro check && npm run astro build`      |
| Output Directory          | `dist`           |

That’s it! Your app will be live on your CloudFront URL as soon as the build finishes.

<!-- ## Use Client-side Routing

You will need to direct all routing requests to `index.html`s so they can be handled by Astro.

You can do this easily by defining a Redirect Rule for your site. Go to the Redirects section for your app settings and add a rule with the following values:


| **Parameter**             | **Value**         |
|---------------------------|-------------------|
| Source Path               | `/*`              |
| Destination Path          | `/index.html`     | -->
