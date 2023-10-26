# Application Architecture

An Application is a container for your codebase. When you create an Application in Thunder, you'll select a Github repository that contains your code. Thunder will create a Service with the same name as your repository, which will serve as the basis for deploying your code to different environments.

## Environments

An Environment is a logical grouping of Services that share the same internal network. Each Application in Thunder has at least one Environment, called "preview", which is created automatically when you create the Application. You can create additional Environments as needed to support your development, testing, and production workflows.

## Services

A Service is a container for your code that can be deployed to one or more Environments. When you create an Application in Thunder, Thunder will create a Service with the same name as your Github repository. Thunder associates each Service with an Application and an Environment so that it can manage the deployment process. When you deploy a Service to an Environment, Thunder will create a new instance of the Service with the desired runtime configuration.