# Jigsaw Chef
Select a recipe book from the list, then choose what ingredients you have on hand. The list of recipes will filter and sort by what you can make, and how many ingredients you are missing for each recipe. The full recipes themselves are intentionally not listed on the app, as this is meant to be a reference for a physical copy of the book(s). [live link](https://www.jigsawchef.com)

# Dev Notes
Built with Angular on the [Ionic framework](https://ionicframework.com/) and hosted as a static site using [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). Install Ionic globally, then run `ionic serve` from the project root to run it locally. A few notes below on some of the components/services.

## JSON Book Format
Recipe lists are stored as a separate `.json` file for each book in the format below. When a book is selected in the app, it is fetched and parsed. Current style is to list ingredients in all lower case and singularly (`egg` instead of `eggs`). When an line-item ingredient can be one of different options, they are separated by commas (using oxford) and or, such as `green pepper, orange pepper, or red pepper`.

```
{
  "title": "The Book Title",
  "key": "someUnqiueKey",
  "description": "A brief decscription.",
  "image_path": "some-image.png",
  "url": "https://some.url",
  "recipe_list": [
    {
      "name": "recipe name",
      "page": 0,
      "ingredient_list": [
        "potato",
        "onion",
        "red pepper"
      ],
      "tags": [
        "vegan"
      ]
    }
  ]
}
```

## Google Analytics Service
A wrapper around the GA library to make sending events easier. Allows easier inserting of click event or search event tracking from the `component.ts` file. This app currently only counts how many visits to each book occurs on the live site.

## Redirect Service
Allows refresh of app paths when hosting as a static site with no back end. For example, on a standard single-page app in this setup, going to a path such as `/search` would result in an error since the app was not loaded from root first. With this, going to `/search` loads to the file at `src/redirect/search/index.html`, which has a script to redirect the user to the root app, with a search parameter telling the app where to send the user (`/search` in this example).

## Unit Tests
Full coverage with Karma/Jasmine. Run with `ng test`.

### TODO
- Add tag display/filter in UI.
- Break up Search component into smaller components.
- Add return types to functions.
- Prettier error landing page.
- Do something with book image.
- Add "pantry" for storing book-agnostic ingredients for quick access.
- More books!
