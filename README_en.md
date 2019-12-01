# react-ui-doc

Create UI doc by React, Gatsby and Mdx.

## Why

So many great tool to help developer to build their own Doc, like Storybook, Gitbook, Docz, why I build again?

Because I want to write Docs and Pages by Mdx. Docz is one of the most popular tool but it too slow to rebuild page. So I take some time to make this tool to build Docs by Mdx.

## Quick start

> Via gatsby-cli

Install gatsby cli first

```shell
npm i gatsby -g
gatsby new yourProjectName https://github.com/SANGET/gatsby-react-ui-doc
cd yourProjectName
yarn start
```

## Slow start

> Create required files step by step

Setup npm project first

```shell
mkdir projectName && cd "$_"
npm init
```

Add dependencise

```sh
yarn add react-ui-doc gatsby
```

Add npm scripts in package.json

```js
  ...
  "scripts": {
    "start": "gatsby develop --host 0.0.0.0 --port 5555",
    "build": "gatsby build",
    "clean": "gatsby clean",
    "serve": "gatsby serve"
  },
```

## Add some required files

Files Strurcture

```treeview
gatsby-config.js
package.json
src/
|-- components/
|   |-- layout.js
|-- images/
|   |-- logo.png
|-- pages/
|   |-- index.mdx
|   |-- docs/
|   |   |-- index.mdx
|-- etc.
```

## Add Gatsby config

Create `gatsby-config.js` file and edit it like this:

```js
module.exports = {
  plugins: [
    ...plugins,
    {
      resolve: "react-ui-doc",
      options: {
        name: 'react-ui-doc', // Project name
        slug: 'react-ui-doc', // Project slug
        github: 'https://github.com/SANGET/react-ui-doc',
        siteUrl: 'https://react-ui-doc.thinkmore.xyz',
        author: 'You',
        menu: [
          'Getting Started',
        ], // Menu ordering
        nav: [
          { title: 'Docs', url: '/docs/' },
        ], // Side pages navigation
        docPath: `${__dirname}/src/pages/docs`, // store doc files
        pagePath: `${__dirname}/src/pages`, // store side pages
        imagePath: `${__dirname}/src/images`, // store side images, required `logo.png`
        analytics: {
          trackingId: `UA-111111111-1`,
          head: false,
        },
        theme: {
          defaultMode: 'light',
          colors: {
            light: {
              body: '#FFF'
            },
            dark: {
              body: '#000'
            }
          }
        } // theme config
      },
    },

    // custom layout config, required
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve(`./src/components/layout`),
      }
    }
  ],
};
```

## Create costom Layout

Create `src/components/layout.js`

```treeview
src/
|-- components/
|   |-- layout.js
```

And provide the dependency to Docs, see [https://github.com/FormidableLabs/react-live](https://github.com/FormidableLabs/react-live) for more detail.

```js
import React from 'react';
import { LiveConfig } from 'react-ui-doc/components';
import styled, * as sc from 'styled-components';
import * as UICore from '@deer-ui/core';
import * as EnhanceUI from '@deer-ui/enhance-ui';
import * as UIUtils from '@deer-ui/core/utils';
import * as BaseFunc from '@mini-code/base-func';

import './style.css';

export default function Layout({ children }) {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/airbnb.css" />
      <LiveConfig
        modules={{
          react: React,
          '@deer-ui/core': UICore,
          '@deer-ui/enhance-ui': EnhanceUI,
          '@deer-ui/core/utils': UIUtils,
          '@mini-code/base-func': BaseFunc,
          'styled-components': Object.assign(styled, sc),
        }}
      />
      {children}
    </>
  );
}
```

## Create page

So that we can create page by .mdx

Create `src/pages/index.mdx`

```treeview
src/
|-- pages/
|   |-- index.mdx
```

```md
---
title: homepage
menu: Index
order: 0
---

# HomePage

Any content here.
```

## Run up

```shell
yarn start
```

And then open `http://localhost:5555`

## Example

More detail see [Alert](/docs/alert/)