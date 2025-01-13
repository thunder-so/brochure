---
title: 'Environments'
description: 'Understand how to configure and manage environments in Thunder, including AWS account and region selection, environment variables, and secrets management.'
---

Environments in Thunder contain metadata regarding:
- AWS Provider
- Environment Variables and Secrets

## AWS Account and Region

When you create an environment, you can select your Provider. Thunder supplies the Provider metadata to the CDK template.

An Environment in Thunder is an extension to the `Environments` construct in AWS CDK. 

The AWS CDK allows developers to specify environments for their applications, defining the AWS account and region where resources will be provisioned. By leveraging environment configurations in the AWS CDK, developers can precisely define where their cloud resources will be deployed, ensuring consistency and control over their infrastructure setup.

## Environment Variables and Secrets

Thunder uses AWS AppConfig to manage secrets and environment variables on your account.

AWS AppConfig is a service that enables developers to manage, store, and quickly deploy application configurations across their applications hosted on AWS. It is designed to use AWS Lambda, EC2, containers, and serverless applications.

AppConfig supports controlled deployments to applications of any size and includes built-in validation checks and monitoring. You can use AppConfig to deploy application configuration in a controlled manner to prevent errors that could cause outages.

For storing environment variables (build time and runtime) and secrets, AWS AppConfig allows you to create configuration profiles with the desired variables and secrets. These configuration profiles can be associated with an application and environment in AppConfig.