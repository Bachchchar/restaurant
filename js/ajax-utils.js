(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};

// Returns an HTTP request object
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}

// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, errorHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, responseHandler, errorHandler, isJsonResponse); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
};

// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler,
                        errorHandler,
                        isJsonResponse) {
    if (request.readyState == 4) {
        if (request.status != 200) {
            if (errorHandler) {
                errorHandler();
            }
            global.alert("There was a problem with the request. Please check your connection or try again later.");
        } else {
            // Handle success
            if (isJsonResponse === undefined) {
                isJsonResponse = true;
            }

            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            } else {
                responseHandler(request.responseText);
            }
        }
    }
}

// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;

})(window);
