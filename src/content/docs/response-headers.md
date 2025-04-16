---
title: 'HTTP Response Headers'
description: ''
---



## Default settings

Thunder provides factory defaults for your single page application:

| Security Header              | Default Values                          |
|------------------------------|-----------------------------------------|
| `x-frame-options`            | `DENY`                                  |
| `referrer-policy`            | `strict-origin-when-cross-origin`       |
| `x-content-type-options`     | `nosniff`                               |
| `strict-transport-security`  | `max-age=31536000; includeSubDomains`   |
| `Content-Security-Policy`    | `default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; `<br/>`style-src 'self' 'unsafe-inline'; font-src 'self' data:`               |
| `X-XSS-Protection`           | `1; mode=block`                         |

| CORS Header                                 | Default Values                        |
|---------------------------------------------|---------------------------------------|
| `Access-Control-Allow-Origin`               | `*`                                   |
| `Access-Control-Allow-Credentials`          | `false`                               |
| `Access-Control-Allow-Methods`              | `GET, HEAD, OPTIONS`                  |
| `Access-Control-Allow-Headers`              | `*`                                   |
| `Access-Control-Max-Age`                    | `600`                                 |


## Header Syntax

The header path must be a relative path without the domain. It will be matched with all custom domains attached to your site.

You can use wildcards to match arbitrary request paths.

| Path               | Effect                                   |
|--------------------|------------------------------------------|
| `/*`               | Only the root directory paths.           |
| `/**`              | All request paths, including the root path and all sub-paths         |
| `/blog/*`          | Matches `/blog/`, `/blog/latest-post/`, and all other paths under `/blog/` |
| `/**/*`	         | Matches `/blog/`, `/assets/`, and all other paths with at least two slashes. |

## Custom Response Headers

You can override the defaults and add custom headers with path patterns. Examples:

| Path               | Name                         | Example Value                         |
|--------------------|------------------------------|---------------------------------------|
| `/*`               | Cache-Control                | `public, max-age=864000`              |
| `/api/*`           | Cache-Control                | `max-age=0, no-cache, no-store, must-revalidate` |
| `/blog/*`          | Cache-Control                | `public, max-age=31536000`            |
| `/**`              | Access-Control-Allow-Origin  | `https://www.foo.com`                 |
| `/**`              | Referrer-Policy              | `same-origin`                         |
| `/**`              | Content-Type                 | `text/html; charset=UTF-8`            |
