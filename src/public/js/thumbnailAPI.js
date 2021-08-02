// Script to provide functionality for the endpoint URL helper on the home page

// Set up listeners to monitor for changes to the form
function setUpFormListeners(baseURL) {
    document.querySelector('#name').addEventListener('change', () => { checkParamsAndUpdate(baseURL); });
    document.querySelector('#width').addEventListener('input',  () => { checkParamsAndUpdate(baseURL); });
    document.querySelector('#height').addEventListener('input',  () => { checkParamsAndUpdate(baseURL); });
    document.querySelector('#format').addEventListener('change',  () => { checkParamsAndUpdate(baseURL); });
}

// Check validity of parameters and update page
function checkParamsAndUpdate(baseURL) {
    let errorString = '';
    const width = parseInt(document.querySelector('#width').value);
    const height = parseInt(document.querySelector('#height').value);

    if (width == NaN || width < 0) {
        errorString = addError(errorString, 'width');
    } else {
        document.querySelector('#width').classList.remove('invalid');
    }

    if (height == NaN || height < 0) {
        errorString = addError(errorString, 'height');
    } else {
        document.querySelector('#height').classList.remove('invalid');
    }

    if (errorString.length > 0) {
        hide(document.querySelector('#url_container'));
        writeError('<p>' + errorString + '</p>');
    } else {
        hide(document.querySelector('#error_container'));
        writeURL(baseURL);
    }
}

// Adds an error message to an error string for the specified parameter
function addError(errString, errParam) {
    if (errString.length > 0) {
        errString += '<br>';
    }

    document.querySelector('#' + errParam).classList.add('invalid');

    return errString + 'Please enter 0 or a positive whole number for the ' + errParam + '!';
}

// Displays an error message
function writeError(errMsg) {
     let errorContainer = document.querySelector('#error_container');
     errorContainer.innerHTML = errMsg;
     show(errorContainer);
}

// Updates the page with the correct URL for the selected parameters
function writeURL(baseURL) {
    const width = parseInt(document.querySelector('#width').value);
    const height = parseInt(document.querySelector('#height').value);
    const format = document.querySelector('#format').value;
    let urlString = baseURL + '/image?name=' + document.querySelector('#name').value;
    if (!isNaN(width) && width > 0) {
        urlString += '&width=' + width;
    }
    if (!isNaN(height) && height > 0) {
        urlString += '&height=' + height;
    }
    if (format.substring(0,1) != '(') {
        urlString += '&format=' + format;
    }
    document.querySelector('#url').innerHTML = urlString;
    show(document.querySelector('#url_container'));
}

// Hide an element
function hide(element) {
    element.classList.add('hide');
}

// Show an element
function show(element) {
    element.classList.remove('hide');
}