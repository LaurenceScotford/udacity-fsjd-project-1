import { access, readdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const imagePath = __dirname + '/images/';
const thumbnailPath = __dirname + '/thumbnails/';

class imageFile {
  private name: string;
  private type: string;
  private path: string;
  private width: number;
  private height: number;

  constructor(name: string, type: string, width: number, height: number) {
    this.name = name;
    this.type = type;
    this.width = width;
    this.height = height;
    this.path = '';
  }
}

/**
 * Creates a new thumbnail of an image with the requested parameters and returns its path or returns the path of an existing thumbnail/raw image
 * 
 * @param imageFile A path to the raw image
 * @param name The name of the image
 * @param type The type to convert the image to - can be 'jpg', 'png', 'webp' or an empty string if no conversion is required
 * @param width The width of the thumbnail in pixels (or 0 for an auto width)
 * @param height The height of the thumbnail in pixels (or 0 for an auto height)
 * NOTE: An auto width or height will be set to either the original image size if both are auto, or will be set to retain the original aspect ratio
 * @returns The path to the created or existing thumbnail or the raw image if no conversion or resizing was specified
 */
async function createImage(imageFile: string, name: string, type: string, width: number, height: number) : Promise<string> {
  
  let outPath : string = imageFile; 

  // If the requested image is not being modified in any way, simply return the original image
  if (!(type.length === 0 && width === 0 && height === 0)) {
    
    // Set the required output file type
    type = type.length === 0 ?  path.parse(imageFile).ext.substring(1) : type;
    
    // Get the filepath for the modified file
    outPath = thumbPath(name, type, width, height);
    console.log(outPath);

    // Create size options
    interface OptionsObject {
      [key: string]: number | string
    }

    const options : OptionsObject = {};
    
    if (width > 0 ) {
      options.width = width;
    }

    if (height > 0 ) {
        options.height = height;
    }

    if (height > 0 && width > 0) {
      options.fit = 'fill';
    }

    try {
      await sharp(imageFile)
      .resize(options)
      .toFile(outPath);
    } catch(err) {
      console.log(err);
    }
  }

  return outPath;
}

/**
 * Searches for a file matching imageName with any extension
 * 
 * @param imageName The name of an image to find
 * @returns The filename of a matching file or an empty string if no match is found
 */
async function findImage(imageName : string) : Promise<string> {
  let filename = '';
  try {
    const files = await readdir(imagePath);
    files.forEach(file => {
      const pathObj = path.parse(file);
      if ( pathObj.name.toLowerCase() === imageName.toLowerCase() ) {
        filename = imagePath + file;
      }
    });
  } catch(err) {
    console.error(err);
  }
  return filename;
}

/**
 * Constructs a file path for a thumnnail based on the parameters
 * 
 * @param imageName The name of the base image
 * @param type The file type
 * @param width The required width
 * @param height The required height
 * @returns A path for the thumnbnail
 */
function thumbPath(imageName : string, type : string, width :number , height : number) : string {
    return thumbnailPath + imageName + '_' + width + 'x' + height + '.' + type;
}

export {findImage, createImage};