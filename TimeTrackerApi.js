
class TimeTrackerApi {

	/**
	 * Constructs the API class
	 * @param {string} api_key The API key to be used for this connection
	 * @param {string} base_url The base URL for the API calls
	 */
	constructor(api_key, base_url) {
		this.api_key = api_key;
		this.base_url = base_url;

		// INSERT YOUR CODE HERE

	}


	/**
	 * Making a request to the API by giving method, path and callback functions.
	 * @param {string} method - The name of the HTTP method that is used for this request.
	 * @param {string} path - The path for the URL call. This is appended to the API URL to create a complete URL calling path.
	 * @param {object} parameters - An object with parameters to that is to be sent as part of the request.
	 * @param {function | boolean} success_handler - A callback function that is passed by the user in the form in the form of if the response is successful.
	 */
	makeRequest(method, path, parameters = {}, success_handler = false) {
		console.log('----- makeRequest -----',
			{
				'method': method,
				'path': path,
				'handler': success_handler
			});
		// INSERT YOUR CODE HERE

		// Adding  parameters to it
		for (let key in parameters) {
			formData.append(key, parameters[key]);
		}

		// Creating the form data
		let formData = new FormData();

		var xhr = new XMLHttpRequest();

		xhr.open(method.toUpperCase(), this.base_url + path);
		xhr.setRequestHeader('api-key', this.api_key);
		xhr.onload = () => {
			this.xhrRequestHander(xhr, success_handler);
		}
		xhr.send(formData);

	}

	/**
	 * The callback method used as the event handler for when the XHR request has loaded. It requires the XHR request as
	 * well as an option callback method to be called if it's successful.
	 * @param {XMLHttpRequest} xhr The XHR request object
	 * @param {function|boolean} success_handler is The callback function that is  called if the call was successful. This method
	 *  keeps the position ready to accept a parameter which would be the response object comming from the XHR.
	 */
	xhrRequestHander(xhr, success_handler = false) {

		// INSERT YOUR CODE HERE

		//checking the status inorder to know that response is sucessful or not .
		if (xhr.status === 200) {
			success_handler(JSON.parse(xhr.responseText));

		}
		//else showing the errors.
		else {
			showError(error);
		}

	}
}
