---
title: 'Concepts'
description: 'Explore the fundamental concepts and architecture used in deploying projects with Thunder.'
---

## Infrastructure

Thunder installs a CDK stack on your AWS account when you import a new repository. 

CDK-SPA is an open-source AWS CDK stack to deploy single page applications (SPA) and static site generators (SSG) on S3 and CloudFront.

> [https://github.com/thunder-so/cdk-spa](https://github.com/thunder-so/cdk-spa)

## Hosting

The stack installed for your application code will contain a hosting bucket on S3 and a globally distributed CloudFront CDN.

<img src="/images/SPA.png" alt="Single Page Applications on AWS S3 and CloudFront" class="mx-auto w-auto h-auto">

- Hosting on Amazon S3.
- Globally distributed CDN and fast responses from CloudFront.
- Optimized caching rules for client-side rendering (CSR).
- Publicly available by a custom domain (or subdomain) via Route53.

## Deployment

When you push new versions your code to your repository, the CodePipeline triggers the build which publishes to S3 and invalidates the CDN cache.

<img src="/images/GitOps.png" alt="GitOps with CodeBuild and CodePipeline with CloudFront and S3" class="mx-auto w-auto h-auto">

- Automatic build and deploy with AWS CodeBuild and AWS CodePipeline from Github repository.
- HTML, CSS and JS are generated on the build server.
- Full crawler readability; Great for SEO.