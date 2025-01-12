---
title: 'Deploy Gatsby on AWS'
description: 'Learn how to deploy a Gatsby site on AWS quickly and efficiently, leveraging a global CDN, managed TLS, and custom domain support for enhanced performance and scalability.'
---

You can deploy a [Gatsby](https://www.gatsbyjs.com/) site on AWS in under a minute. Your site is served over a lightning-fast global CDN, comes with fully managed TLS certificates, and supports custom domains out of the box.

1. Use your existing Gatsby repository.

2. Create a new Application on Thunder, and give Thunder permission to access your new repo.

3. Use the following values during creation:

| **Parameter**             | **Value**         |
|---------------------------|-------------------|
| Install Command           | `npm install`     |
| Build Command             | `npm run build`   |
| Output Directory          | `public`          |

That’s it! Your app will be live on your CloudFront URL as soon as the build finishes.
