# Portal

This is the source code of the OCDCpro Educator Portal website.

It is a bit funny in the way it recombines boilerplate website content with:

 - The handbook built from markdown
 - The overview slides built from markdown via pandoc to reveal.js
 - The materials list built from json and a custom Vue component

## Getting started

Anyhow it is simple to get started developing the website.

First, install the dependencies:

```bash
npm install
```

Then, to start a local development server with hot-reloading:

```bash
npm run site:dev
```

### Rebuild slides

To rebuild the overview slides from markdown, run:

```bash
npm run pres:build
```
