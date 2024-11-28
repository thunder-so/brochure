---
title: 'Concepts'
description: 'Explore the fundamental concepts and architecture used in deploying projects with Thunder, including account setup, application creation, and environment management.'
---

On a high-level, the steps you'll need to follow in order to deploy a project for the first time are:

- Create an account at [console.thunder.so](https://console.thunder.so)
- Create an Organization
- Connect your AWS Account to your Organization 
- Connect your GitHub account (personal or organization)
- Create a Application


It might be useful to understand the different terms and the architecture we use:


| **Title** | **Definition** | **Role** |
|--------------------------------------|--------------------------------------|--------------------------------------|
| Provider | An AWS account and region where you want to deploy your applications. | Thunder creates an IAM Role in your AWS. |
| Application | It's the top level element of our architecture. It contains the configuration for the different Environments. | Acts as the entry point for defining and configuring stacks and other high-level settings. |
| Environments | Represents different deployment stages such as development, testing, and production. | Enables the management of multiple AWS Accounts. |
| Stacks | Represents a set of AWS resources that can be created, updated, or deleted together. | To install and manage infrastructure in your AWS Accoun |
| Deployment | The process of preparing and deploying your code to AWS. | Involves building the code and updating the relevant AWS resource. |
