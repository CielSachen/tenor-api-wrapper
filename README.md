# Tenor API Wrapper

![Node Current](https://img.shields.io/badge/Node.js-%3E%3D20-44883E?style=flat-square&logo=node.js)
![TypeScript Current](https://img.shields.io/badge/TypeScript-~5.4-3178C6?style=flat-square&logo=typescript)
![Package Manager](https://img.shields.io/badge/Package_Manager-pnpm-orange?style=flat-square&logo=pnpm)
[![Code Style](https://img.shields.io/badge/Code_Style-Prettier-FF69B4?style=flat-square&logo=prettier)](https://github.com/prettier/prettier)

The Tenor API Wrapper is a Node.js package that provides a simple way to interact with the [Tenor API (v2)](https://developers.google.com/tenor/guides/quickstart). It wraps the various endpoints of the Tenor API and creates functions for each, allowing for quick and easy access without the need to manually handle the fetching and parsing of data.

_Typings and JSDoc descriptions were taken from the [Tenor API Documentation](https://developers.google.com/tenor/guides/quickstart) and the [Google Cloud APIs Errors Documentation](https://cloud.google.com/apis/design/errors)._

---

## Installation

### Requirements

To install this package, you first need a few things:

- [Node.js v20 or newer](https://nodejs.org/en/download)
- An `.npmrc` file containing these configs:

  ```properties
  @cielsachen:registry=https://npm.pkg.github.com/
  # Replace ${GITHUB_PERSONAL_ACCESS_TOKEN} with the actual token.
  //npm.pkg.github.com/:_authToken=${GITHUB_PERSONAL_ACCESS_TOKEN}
  ```

### From GitHub Packages

You can use npm or pnpm to install this package as a dependency.

Open your terminal and run one of the following commands:

```bash
npm install @cielsachen/tenor-api-wrapper
```

```bash
pnpm add @cielsachen/tenor-api-wrapper
```

## Usage

### API Key

You can set the API key that the wrapper will use by passing the [Google Cloud Tenor API key](https://developers.google.com/tenor/guides/quickstart#setup) to the class' constructor.

```typescript
import { Tenor } from "@cielsachen/tenor-api-wrapper";

const tenor = new Tenor(process.env.TENOR_KEY);
```

### Example

```typescript
(async () => {
  try {
    const response = await tenor.fetchGIFsByQuery("meow");

    console.log(response.results);
  } catch (error) {
    console.error(error);
  }
})();

// or

tenor
  .fetchGIFsByQuery("meow")
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => console.error(error));
```

---

## API Reference

_The Tenor API Wrapper does not currently support the **[Register Share](https://developers.google.com/tenor/guides/endpoints#register-share)** endpoint of the Tenor API._

### fetchGIFsByQuery

Fetch a JSON object that contains a list of the most relevant GIFs for a given set of search terms, categories, emojis, or any combination of these.

```typescript
// Example usage
tenor
  .fetchGIFsByQuery("excited", { client_key 'my_test_app', limit: '8' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => console.error(error));
```

### fetchFeaturedGIFs

Fetch a JSON object that contains a list of the current global featured GIFs.

```typescript
// Example usage
tenor
  .fetchFeaturedGIFs({ client_key 'my_test_app' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => console.error(error));
```

### fetchGIFCategories

Fetch a JSON object that contains a list of GIF categories associated with the provided type.

```typescript
// Example usage
tenor
  .fetchGIFCategories({ client_key 'my_test_app' })
  .then((response) => {
    console.log(response.tags);
  })
  .catch((error) => console.error(error));
```

### fetchSearchSuggestionsByQuery

Fetch a JSON object that contains a list of alternative search terms for a given search term.

```typescript
// Example usage
tenor
  .fetchSearchSuggestionsByQuery('smile', { client_key 'my_test_app', limit: '5' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => console.error(error));
```

### fetchAutocompleteByQuery

Fetch a JSON object that contains a list of completed search terms for a given partial search term.

```typescript
// Example usage
tenor
  .fetchAutocompleteByQuery('exc', { client_key 'my_test_app' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => console.error(error));
```

### fetchTrendingSearchTerms

Fetch a JSON object that contains a list of the current trending search terms

```typescript
// Example usage
tenor
  .fetchTrendingSearchTerms({ client_key 'my_test_app' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => console.error(error));
```

### fetchPostsById

Fetch the GIFs, stickers, or a combination of the two for the specified IDs.

```typescript
// Example usage
tenor
  .fetchTrendingSearchTerms('11586094175715197775', { client_key 'my_test_app' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => console.error(error));
```

---

## Found an issue?

Please submit it using the [bug tracker](https://github.com/CielSachen/tenor-api-wrapper/issues).
