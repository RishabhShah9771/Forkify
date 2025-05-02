import { TIMEOUT_SEC } from './config.js'; // Import timeout duration from the config file

// Function to create a timeout promise that rejects after a specified number of seconds
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`)); // Reject with an error message after timeout
    }, s * 1000); // Convert seconds to milliseconds
  });
};

// Function to fetch JSON data from a given URL with a timeout mechanism
const getJSON = async function (url) {
  try {
    // Use Promise.race to fetch data or timeout, whichever happens first
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json(); // Parse the response as JSON

    // If the response is not OK, throw an error with details
    if (!response.ok)
      throw new Error(
        `Recipe not found: (${data.message}) (${response.status})`
      );

    return data; // Return the parsed JSON data
  } catch (err) {
    // Catch and handle any errors (currently does nothing with the error)
  }
};

export { getJSON }; // Export the getJSON function for use in other modules
