# Description

The project aims to re-size the shape of the images found on the server list below according to the user's desired width and height and saves the resulted image as a cache to be used in further requests.
The project uses express framework as the back-end language and uses Sharp Package to re-shape the size of the image.

## Scripts
- Install: 
  * `npm install` (dependencies)
  * `npm install --save-dev` (devDependencies)

- Lint: `npm run lint`
- Lint fix: `npm run lint:fix`
- Prettify: `npm run prettier`
- Test: `npm run test`
- Build: `npm run build`
- Start app: `npm run start`

## Usage
In order to access the server use port 3000.
In order to process an image use the endpoint (/api/image/) providing parameters satisfying the following condition.

### Parameters
- imagename:
    - encenadaport
    - fjord
    - icelandwaterfall
    - palmtunnel
    - santamonica
- width: positive integer number greater than zero
- height: positive integer number greater than zero

_Example:_
http://localhost:3000/api/image?imagename=encenadaport&width=500&height=500

### Note
You can get the image with its full size by not providing values for both width and height (only the name of a valid image).

Both values of width and height must be provided in order to re-size the image (both parameters are needed).
