---
title: 'Single Page Application (SPA) Stack'
description: 'Learn how to deploy Single Page Applications (SPA) and Static Site Generators (SSG) using Thunder, leveraging AWS CDK, S3, and CloudFront for optimized performance and scalability.'
---

Thunder is built on top of open-source AWS CDK stack to deploy single page applications (SPA) and static site generators (SSG) on S3 and CloudFront.

> [https://github.com/thunder-so/cdk-spa](https://github.com/thunder-so/cdk-spa)

- Fast responses from CloudFront
- Automatic upload of the build files for CSR and static assets to S3 with optimized caching rules
- Automatic build and deploy with CodeBuild and CodePipeline from Github repository.
- Publicly available by a custom domain (or subdomain) via Route53

<img src="/SPA.png" alt="Single Page Applications on AWS S3 and CloudFront" class="mx-auto w-auto h-auto">

The benefits of using static site generators:

- HTML is generated on the build server.
- Full crawler readability; Great for SEO
- Extensive caching; Serves all content from CloudFront distribution
- Suitable for marketing landing pages, blog, documentation, static content that does not change often.