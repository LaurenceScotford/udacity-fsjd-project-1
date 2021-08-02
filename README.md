# udacity-fsjd-project-1

This is my submission for the first project for the Udacity Full Stack Javascript Developer Nanodegree.

## About

This is a web API to serve images at a requested size and format. It runs on node.js and express.

### Using the API

To use the API, append the URL with a query in the form of:

```
BASE_URL/image?name=NAME_OF_IMAGE&width=NUM&height=NUM&format=IMAGE_FORMAT
```

Where:

- **name** is the filename of the image without the extension (required)
- **width** is the desired width of the image in pixels (optional)
- **height** is the desired height of the image in pixels (optional)
- **format** is the desired file format - jpg | png | webp | avif | tiff (optional)

Name and format are case insensitive.

Any other parameters in the query will be ignored, so you can safely append, for example, date- and time-stamps without disrupting the operation of the API.

### Setting image dimenstions

If both a width and height are included then the output image is set to exactly these dimensions, without retaining the aspect ratio of the original image.

If only a width or height is included, then the excluded value is set automatically to retain the original aspect ratio of the image.

If neither width or height is included, then the image is served at its original dimensions.

Note that setting either width or height to a value of 0 is the same as excluding it and that fractional pixel values are not supported. Any fractional part of the value will be truncated.

### Setting image format

if a valid format is included then the output image will be of the format specified. Valid output formats are: JPEG, PNG, WebP, AVIF and TIFF. Note that if you request a raw image, by specifying only a name, then the format will be the native format of the source image.

### Errors

If the query is properly formed and the image is matched then an image of the requested size and format will be served.

If the name is excluded, or invalid arguments are passed to width or height (less than zero or non-numeric) or to format (anything other than jpg, png, webp, vif or tiff) then the API will return a 401 HTTP status.

If an image matching the name is not found then the API will return a 404 HTTP status. Images available in the base solution are:

- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

### Examples

1. Reqest an image at its native size and default format:

```
BASE_URL/image?name=encenadaport
```

2. Request an image sized to 400x200 and rendered as a png file:

```
BASE_URL/image?name=fjord&width=400&height=200&format=png
```

3. Request an image with a width of 800 and the height set to retain the aspect ratio:

```
BASE_URL/image?name=fjord&width=800
```

or:

```
BASE_URL/image?name=fjord&width=800&height=0
```

### API home page

Requesting the server root will show a home page for the API containing instructions for use and a helper to generate endpoint URLs.

## Set up and scripts

To set up the project:

```
npm install
```

Further images can be added to the project by simply placing them in the /src/images folder.

To run the tests

```
npm run test
```

To start the server in development mode

```
npm run start
```

To build the project:

```
npm run build
```

The built files are written to **/dist**

## Development environment

- Server: built with [node.js](https://nodejs.org/en/) and [express](https://expressjs.com/)
- Script language: [typescript](https://github.com/Microsoft/TypeScript) using [ts-node](https://github.com/TypeStrong/ts-node)
- HTML templates: [ejs](https://ejs.co/)
- Code standards and format: [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
- Testing tools: [jasmine](https://jasmine.github.io/) and [supertest](https://www.npmjs.com/package/supertest)
- Other tools: [copyfiles](https://www.npmjs.com/package/copyfiles), [husky](https://www.npmjs.com/package/husky), [nodemon](https://www.npmjs.com/package/nodemon), [rimraf](https://www.npmjs.com/package/rimraf)

### Image library maintenance

Raw images are stored in the **/src/images** directory and copied to the **/images** directory in the build. You can add or delete images here as needed (note that deleting images will break existing endpoints requesting that image even though deleting an image will not affect any existing thumbnails created from that image). The image search is case insensitive and excludes extensions, so each image must have a unique name, e.g. you could not have both "myimage.jpg" and "myImage.png" as both would be a match for "... ?name=myimage ...".

The API supports the following image formats (note that some image formats will be converted to a different output format unless the raw image is requested):
| Input format | Default output format |
| ------------ | --------------------- |
| avif | avif |
| gif | webp |
| jpg | jpeg |
| jpeg | jpeg |
| png | png |
| svg | webp |
| tiff | tiff |
| webp | webp |

Thumbnails are stored in the **/thumbnails** directory. The API will check for the existence of this directory before starting the server and will create it if it doesn't exist. If a requested thumbnail doesn't exist, it will be created for the first request and the existing thumbnail will be served for subsequent requests. It is therefore safe to periodically prune or flush the thumbnails directory if that is required.

## Third party libraries and resources

This project uses the [sharp](https://sharp.pixelplumbing.com/) image manipulation library.
This project uses images supplied by [Udacity](https://www.udacity.com/).

## Current Status

This is currently a work in progress.
