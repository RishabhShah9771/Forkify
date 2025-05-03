import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        `Recipe not found: (${data.message}) (${response.status})`
      );

    return data;
  } catch (err) {}
};

const setJSON = async function (url, uploadData) {
  try {
    // Add a log to inspect the data being sent
    console.log('Uploading data:', uploadData);

    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        `Recipe not found: (${data.message}) (${response.status})`
      );

    return data;
  } catch (err) {
    console.error('Error in setJSON:', err);
    throw err; // Rethrow the error to propagate it
  }
};

export { getJSON, setJSON };
