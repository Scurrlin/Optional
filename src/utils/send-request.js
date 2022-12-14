import { getToken } from "./users-service";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export default async function sendRequest(url, method = 'GET', payload=null) {
  // Fetch takes an optional options object as it's second arg
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to Authorization header
    // Prefacing with 'Bearer' is recommended for HTTP specificaion
    options.headers.Authorization = `Bearer ${token}`;
  }

  try {
  const res = await fetch(url, options);
    // res.ok will be false if the status code is set to 4xx in the controller aciton
    // console.log('res.okay is =>', res.ok)
    if (res.ok) return res.json();
    console.log(res, ' this is res')
    throw new Error("Bad Request");
  } catch(err){
    console.log(err, ' this is err');
  }
}

