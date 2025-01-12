---
title: 'Concepts'
description: 'Explore the fundamental concepts and architecture used in deploying projects with Thunder, including account setup, application creation, and environment management.'
---

On a high-level, the steps you'll need to follow in order to deploy a project for the first time are:

- Create an account at [console.thunder.so](https://console.thunder.so) using Github
- Create an Organization
- Connect your AWS Account to your Organization 
- Connect your GitHub account (personal or organization) to provide access to repositories
- Create a Application


It might be useful to understand the different terms and the architecture we use:


| **Title** | **Definition** | **Role** |
|--------------------------------------|--------------------------------------|--------------------------------------|
| Provider | An AWS account and region where you want to deploy your applications. | Thunder creates an IAM Role in your AWS. |
| Application | It's the top level element of our architecture. It contains the configuration for the different Environments. | Acts as the entry point for defining and configuring stacks and other high-level settings. |
| Environments | Represents different deployment stages such as development, testing, and production. | Enables the management of multiple AWS Accounts. |
| Stacks | Represents a set of AWS resources that can be created, updated, or deleted together. | To install and manage infrastructure in your AWS Accoun |
| Deployment | The process of preparing and deploying your code to AWS. | Involves building the code and updating the relevant AWS resource. |



CDK-SPA is an open-source AWS CDK stack to deploy single page applications (SPA) and static site generators (SSG) on S3 and CloudFront, with Auto-deployment from Github repository.

> [https://github.com/thunder-so/cdk-spa](https://github.com/thunder-so/cdk-spa)

- Fast responses from CloudFront
- Automatic upload of the build files for CSR and static assets to S3 with optimized caching rules
- Automatic build and deploy with CodeBuild and CodePipeline from Github repository.
- Publicly available by a custom domain (or subdomain) via Route53

<img src="/images/SPA.png" alt="Single Page Applications on AWS S3 and CloudFront" class="mx-auto w-auto h-auto">

The benefits of using static site generators:

- HTML is generated on the build server.
- Full crawler readability; Great for SEO
- Extensive caching; Serves all content from CloudFront distribution
- Suitable for marketing landing pages, blog, documentation, static content that does not change often.