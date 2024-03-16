# Applications

An Application is the scafolding for your project codebase. Thunder relies on the AWS Cloud Development Kit (CDK) for its underlying features. 

The AWS Cloud Development Kit (CDK) is an open-source software development framework for defining cloud infrastructure.

CDK applications are ultimately transformed into CloudFormation templates. Leverages the power of CloudFormation for provisioning and updating AWS resources, while providing a higher-level abstraction for developers.

A summary of key concepts related to AWS CDK:

| **Title**                           | **Definition**                                                                                                                                                          | **Role**                                                                    |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Constructs                           | The fundamental building blocks in CDK for representing AWS resources or groups of resources.                                                                           | Constructs can represent anything from an individual S3 bucket to complex multi-resource patterns.                                        |
| App                                  | The top-level construct that represents the entire CDK application.                                                                                                      | Acts as the entry point for defining and configuring stacks and other high-level settings.                                               |
| Environments                         | Represents different deployment stages such as development, testing, and production.                                                                                      | Enables the management of multiple configurations and environments within a CDK application.                                            |
| Stacks                               | Logical deployment units within a CDK application.                                                                                                                       | Represent a set of AWS resources that can be created, updated, or deleted together.                                                     |
| Staging and Deployment               | The process of preparing and deploying CDK applications to AWS.                                                                                                          | Involves synthesizing the code into an AWS CloudFormation template and deploying it to create or update resources.                       |
