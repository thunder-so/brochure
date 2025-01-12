---
title: 'Redirects and Rewrites'
description: ''
---

The terms "redirect" and "rewrite" refer to different ways of handling HTTP requests, and they serve distinct purposes in web development:

## Redirect

A redirect is an HTTP response that instructs the client's browser to make a new request to a different URL. This involves a round-trip to the server.

HTTP Status Codes: Commonly uses status codes like 301 (Moved Permanently) or 302 (Found/Temporary Redirect).

Client-Side Action: The browser updates the URL in the address bar to the new location specified in the Location header of the response.

Use Cases:
- Moving content to a new URL to avoid a broken link when the address of a page changes.
- To avoid a broken link when a user makes a predictable typo in an address.

SEO Impact: 
A 301 redirect passes most of the SEO value from the old URL to the new one, while a 302 redirect does not.

Using static paths:

| **Source**                 | **Destination**          |
|----------------------------|--------------------------|
| /home                      | /                        |


Using wildcards:

| **Source**                 | **Destination**          |
|----------------------------|--------------------------|
| /guide/*                   | /blog/*                  |
| /cms/*                     | /*                       |

Using placeholders:

| **Source**                 | **Destination**          |
|----------------------------|--------------------------|
| /docs/:any                 | /:any                    |
| /blog/posts/:postid        | /blog/:postid            |
| /updates/:year/:month      | /changelog/:year/:month  |

## Rewrite

A rewrite (also called a 200 Redirect) modifies the URL path internally on the server without changing the URL in the client's browser. The client is unaware of the rewrite.

No HTTP Status Code: Since the rewrite is internal, it doesn't involve sending a new HTTP status code to the client. 

Server-Side Action: The server processes the request as if it was made to the rewritten URL.

Use Cases:
- Serving a single-page application (SPA) by rewriting all paths to index.html.
- Handling legacy URLs without changing the visible URL structure.

SEO Impact: Since the URL in the browser doesn't change, rewrites don't directly impact SEO.