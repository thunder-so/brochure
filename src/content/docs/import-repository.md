---
title: 'Importing a Repository from Github'
description: 'How to import a Github repository and deploy on AWS using Thunder'
---

When you have successfully installed the Thunder.so Github App, you will be redirected back to Thunder. You will now see a list of repositories. Select the repository and branch.

<img src="/screens/import-repositories.png" alt="Import Repositories" class="mx-auto w-auto h-auto">

Thunder will detect the presence of a `package.json` file in your branch.

## Configure your build

Thunder will automatically detect the framework and any necessary build settings. 

However, you can configure the <a href="/docs/build-config">build settings</a>. You can also add <a href="/docs/environment-variables">Environment Variables</a>.

## Select AWS Account and Region

Select your account and the region where you want to deploy your application.

<img src="/screens/select-aws-account.png" alt="Select AWS account and region" class="mx-auto w-auto h-auto">

## Generate User Access Token

Thunder will configure your AWS CodePipeline and Github repository for autodeploys. Authenticate the Github App to generate a long-term server-to-server token from Github.

Thunder will create a AWS Secrets Manager `secret` and store your user token safely. The ARN of the secret resource will be used to configure your build pipeline.

<img src="/screens/authorize-github-app.png" alt="Authorize Github app" class="mx-auto w-auto h-auto">


## Install your application

Press the `Install Application` button to deploy the CDK stack to your AWS account.