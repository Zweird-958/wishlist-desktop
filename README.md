A wishlist app, you can add items to your wishlist with link, price, image, currency and name. You can set to bought or not.

The api used is [wishlist-api](https://github.com/Zweird-958/wishlist_api)

## Installation

Download the project and create .env.local file in the root directory of the project with the following content (replace the url with the url of the api):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Then run the following command in the root directory of the project:

```
npm install
npm run tauri build
```

## TO DO

- [ ] Profile Page
- [ ] Translations
- [ ] Handle Errors Pop Up
