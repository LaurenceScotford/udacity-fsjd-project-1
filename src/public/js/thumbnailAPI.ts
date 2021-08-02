// Script to provide functionality for the endpoint URL helper on the home page

interface HTMLElementsObject {
  [key: string]: HTMLElement | null;
}

// Set up listeners to monitor for changes to the form - this function is called from the front end view index.ejs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setUpFormListeners(baseURL: string): void {
  const domElements: HTMLElementsObject = {
    name: document.querySelector('#name'),
    width: document.querySelector('#width'),
    height: document.querySelector('#height'),
    format: document.querySelector('#format'),
    urlContainer: document.querySelector('#url_container'),
    errorContainer: document.querySelector('#error_container')
  };

  if (
    domElements.name &&
    domElements.width &&
    domElements.height &&
    domElements.format
  ) {
    domElements.name.addEventListener('change', () => {
      checkParamsAndUpdate(baseURL, domElements);
    });
    domElements.width.addEventListener('input', () => {
      checkParamsAndUpdate(baseURL, domElements);
    });
    domElements.height.addEventListener('input', () => {
      checkParamsAndUpdate(baseURL, domElements);
    });
    domElements.format.addEventListener('change', () => {
      checkParamsAndUpdate(baseURL, domElements);
    });
  }

  writeURL(baseURL, domElements);
}

// Check validity of parameters and update page
function checkParamsAndUpdate(
  baseURL: string,
  domElements: HTMLElementsObject
): void {
  let errorString = '';

  if (
    domElements.width &&
    domElements.height &&
    domElements.urlContainer &&
    domElements.errorContainer
  ) {
    const width = parseInt((domElements.width as HTMLInputElement).value);
    const height = parseInt((domElements.height as HTMLInputElement).value);

    if (isNaN(width) || width < 0) {
      errorString = addError(errorString, 'width');
    } else {
      domElements.width.classList.remove('invalid');
    }

    if (isNaN(height) || height < 0) {
      errorString = addError(errorString, 'height');
    } else {
      domElements.height.classList.remove('invalid');
    }

    if (errorString.length > 0) {
      hide(domElements.urlContainer);
      writeError('<p>' + errorString + '</p>');
    } else {
      hide(domElements.errorContainer);
      writeURL(baseURL, domElements);
    }
  }
}

// Adds an error message to an error string for the specified parameter
function addError(errString: string, errParam: string): string {
  const errorEl = document.querySelector('#' + errParam);

  if (errString.length > 0) {
    errString += '<br>';
  }

  if (errorEl) {
    errorEl.classList.add('invalid');
  }

  return (
    errString +
    'Please enter 0 or a positive whole number for the ' +
    errParam +
    '!'
  );
}

// Displays an error message
function writeError(errMsg: string): void {
  const errorContainer = document.querySelector('#error_container');

  if (errorContainer) {
    errorContainer.innerHTML = errMsg;
    show(errorContainer as HTMLElement);
  }
}

// Updates the page with the correct URL for the selected parameters
function writeURL(baseURL: string, domElements: HTMLElementsObject): void {
  const url = document.querySelector('#url');
  if (
    domElements.width &&
    domElements.height &&
    domElements.format &&
    domElements.name &&
    domElements.urlContainer &&
    url
  ) {
    const width = parseInt((domElements.width as HTMLInputElement).value);
    const height = parseInt((domElements.height as HTMLInputElement).value);
    const format = (domElements.format as HTMLSelectElement).value;
    let urlString =
      baseURL + '/image?name=' + (domElements.name as HTMLSelectElement).value;
    if (!isNaN(width) && width > 0) {
      urlString += '&width=' + width;
    }
    if (!isNaN(height) && height > 0) {
      urlString += '&height=' + height;
    }
    if (format.substring(0, 1) != '(') {
      urlString += '&format=' + format;
    }
    url.innerHTML = urlString;
    show(domElements.urlContainer);
  }
}

// Hide an element
function hide(element: HTMLElement): void {
  element.classList.add('hide');
}

// Show an element
function show(element: HTMLElement): void {
  element.classList.remove('hide');
}
