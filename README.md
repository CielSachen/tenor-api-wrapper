# Tenor API Wrapper

![Node Current](https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub Release](https://img.shields.io/github/v/release/CielSachen/tenor-api-wrapper?style=flat-square)

Tenor API Wrapper is a Node.js package that provides a simple way to interact with the [Tenor API (v2)](https://developers.google.com/tenor/guides/quickstart). It wraps the various endpoints of the Tenor API and creates functions for each, allowing for quick and easy access without the need to manually handle the fetching and parsing of data.

## Installation

```bash
pnpm add @cielsachen/tenor-api-wrapper
```

This package is published on GitHub packages, not npm. Therefore, you will need to configure your package manager to install this package from GitHub packages. Furthermore, an authentication token is required to install it.

An example using `.npmrc`:

```properties
@cielsachen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Example

```typescript
import { Tenor } from "@cielsachen/tenor-api-wrapper";

const tenor = new Tenor(process.env.TENOR_KEY);

try {
  const response = await tenor.fetchGifsByQuery("excited", {
    client_key: "my_test_app",
    limit: "8",
  });

  console.log(response.results);
} catch (err) {
  console.error(err);
}
```

This is an example using the [Search endpoint](https://developers.google.com/tenor/guides/endpoints#search), which is wrapped by the `fetchGifsByQuery()` method; it fetches a maximum of 8 different GIFs related to the search term/query "excited."

## Documentation

_Typings and JSDoc descriptions were taken from Tenor's [API Documentation](https://developers.google.com/tenor/guides/quickstart) and Google Cloud's [APIs Errors Documentation](https://cloud.google.com/apis/design/errors)._

**Coming soon!**
