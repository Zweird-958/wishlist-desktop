A wishlist app, you can add items to your wishlist with link, price, image, currency and name. You can set to bought or not.

The api used is [wishlist-api](https://github.com/Zweird-958/wishlist_api)

<img width="1298" alt="image" src="https://github.com/Zweird-958/wishlist-desktop/assets/83603824/e6549e74-a9a4-410d-8069-743ce8385045">

## Installation

Download the project and create .env.local file in the root directory of the project with the following content (replace the url with the url of the api):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Read the docs of [tauri](https://tauri.app/v1/guides/getting-started/prerequisites/) to install the dependencies for your OS

Then run the following command in the root directory of the project:

```
npm install
npm run tauri build
```

## TO DO

- [ ] Profile Page
- [ ] Translations
- [x] Handle Errors Pop Up
