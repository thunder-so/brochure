---
title: 'Applications'
description: 'Learn about the foundational elements and structure of applications using Thunder and AWS CDK.'
---

# Import an existing application

Create a new application on Thunder by importing your existing frontend application repository from Github.

Your existing project can be any web project that outputs static HTML content (such as a website that contains HTML, CSS, and JavaScript). When you use any of Thunder's supported frameworks, we'll automatically detect and set the optimal build and deployment configurations for your framework.

1. Connect your Github account or organization

On the New Application page, you will be prompted to `Install Github App` which installs the Thunder Github App on your personal or organization account and requests access to your repository code.

2. Import your repository

When you have successfully installed the Github App, you will be redirected back to the New Application page.

You will now see a list of repositories. Select the repository and branch.

3. Configure your build

Thunder will automatically detect the framework and any necessary build settings. However, you can customise the build and output settings. You can also add Environment Variables. These can be changed later.

4. Select AWS Account and Region

Select your AWS account

5. Generate User Access Token

Thunder will configure your AWS CodePipeline and Github repository for autodeploys. Authenticate the Github App to generate a long-term server-to-server token from Github.

Thunder will create a AWS Secrets Manager `secret` and store your user token safely. The ARN of the secret resource will be used to configure your pipeline.

6. Install your application

Press the Install button to deploy the CDK stack to your AWS account.



An Application is the scafolding for your project codebase. Thunder relies on the AWS Cloud Development Kit (CDK) for its underlying features. 

The AWS Cloud Development Kit (CDK) is an open-source software development framework for defining cloud infrastructure.

CDK applications are ultimately transformed into CloudFormation templates. Leverages the power of CloudFormation for provisioning and updating AWS resources, while providing a higher-level abstraction for developers.