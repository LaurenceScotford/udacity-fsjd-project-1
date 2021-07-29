import { access, readdir } from 'fs/promises';
import path from 'path';
import sharp, { FormatEnum } from 'sharp';
import { thumbnailPath, imagePath, validTypes } from './apiconstants';

interface OptionsObject {
  [key: string]: number | string
}

/**
 * Check for a thumbnail of an image with the requested parameters (creating one if it doesn't exist) and returns its path or path of the raw image if no transformation is required
 * 
 * @param imageFile A path to the raw image
 * @param name The name of the image
 * @param type The type to convert the image to - can be 'jpeg', 'png', 'webp' or an empty string if no conversion is required
 * @param width The width of the thumbnail in pixels (or 0 for an auto width)
 * @param height The height of the thumbnail in pixels (or 0 for an auto height)
 * NOTE: An auto width or height will be set to either the original image size if both are auto, or will be set to retain the original aspect ratio
 * @returns The path to the created or existing thumbnail or the raw image if no conversion or resizing was specified
 */
async function serveImage(imageFile: string, name: string, type: string, width: number, height: number) : Promise<string> {
  let outPath : string = imageFile; 

  // If the requested image is not being modified in any way, simply return the original image
  if (!(type.length === 0 && width === 0 && height === 0)) {
    
    // Set the required output file type
    type = type.length === 0 ?  path.parse(imageFile).ext.substring(1) : type;
    type = validTypes[type];
    
    // Get the filepath for the modified file
    outPath = thumbPath(name, type, width, height);
    
    // Check if the requested thumbnail already exists
    const fileExists = await thumbnailExists(outPath);
    
    // If it doesn't, create a new thumbnail
    if (!fileExists) {
      // Create size options
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

      await createImage(imageFile, options, type, outPath);
    }
  }

  return outPath;
}

/**
 * Checks if the thumbnail exists and returns true (exists) or false (does not exist)
 * 
 * @param filePath A path to the thumbnail
 * @returns true if the file exists or false if it doesn't
 */
async function thumbnailExists(filePath: string) : Promise<boolean> {
  let fileTest: boolean;
  try {
    await access(filePath);
    fileTest = true;
  } catch {
    fileTest = false;
  }
  return fileTest;
}

/**
 * Creates an image using the specified options, based on a base image and saves it to the desired location
 * 
 * @param imageFile A path to the base image
 * @param sizeOptions The size options for the image to be created
 * @param format The format for the created image (jpg, png or webp)
 * @param outPath The path to save the created image to
 */
async function createImage(imageFile: string, sizeOptions: OptionsObject, format: string, outPath: string) : Promise<void> {
  try {
    await sharp(imageFile)
    .resize(sizeOptions)
    .toFormat(format as keyof FormatEnum)
    .toFile(outPath);
  } catch(err) {
    console.log(err);
  }
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

export { findImage, serveImage, createImage, thumbnailExists, thumbPath };