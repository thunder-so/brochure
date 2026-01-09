---
title: 'Configure your build'
description: 'Learn how to configure the installation and build scripts for your application, including setting up commands for dependencies, compiling resources, specifying output directories, and selecting the appropriate Node.js runtime version.'
---

Configure the install and build scripts for your application.

<img src="/screens/build-config.png" alt="Build configuration" class="mx-auto w-auto h-auto">

- Install command: This command installs all the dependencies listed in the package.json file of the project.

- Build command: This command runs the script that compiles and bundles the application resources.

- Output directory: This specifies where the compiled files will be stored after the build process is complete. The interface notes that common alternatives might be "dist" or "build".

- Runtime: This determines which version of Node.js will be used to run the build process. Options are Node version 16, 18, 20 and 22.