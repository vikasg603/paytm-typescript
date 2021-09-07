
# Paytm Node SDK

[![npm](https://img.shields.io/npm/v/paytm-node-typescript.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/paytm-node-typescript)

Unofficial nodejs library for [Paytm API](https://developer.paytm.com/docs) with typescript support.

Read up here for getting started and understanding the payment flow with Paytm: [https://developer.paytm.com/docs](https://developer.paytm.com/docs)

## Why this library?

1.  Typescript support.
2.  Removed traditional way of adding field inside the object.
3.  Improved code to make it easy to opt for any future changes.
4.  Removed deprecated request and shifted to Axios (https://github.com/request/request/issues/3142).
5.  Standard PaytmError class for handling all the errors.
6.  Any many more reasons

## Installation

```bash
npm i paytm-node-typescript
```

## Documentation

Documentation of Paytm's API and their usage is available at [https://developer.paytm.com/docs](https://developer.paytm.com/docs)

### Basic Usage

Instantiate the paytm instance with `mid`, `key`, `isProduction` & `callbackUrl`. You can obtain the keys from the dashboard app ([https://dashboard.paytm.com/next/apikeys](https://dashboard.paytm.com/next/apikeys))

```js
const instance = new Paytm({
  mid: 'YOUR_MID',
  key: 'YOUR_KEY_SECRET',
  isProduction: true | false,
  callbackUrl: 'YOUR_CALLBACK_URL'
});
```

The resources can be accessed via the instance. All the methods invocations follow the namespaced signature

```js
// API signature
// {paytmInstance}.{resourceName}.{methodName}(resourceId [, params])

// example
instance.payments.initTransaction(bodyObj);
```

Every resource method returns a promise.

```js
instance.payments
  .initTransaction(bodyObj)
  .then(response => {
    // handle success
  })
  .catch(error => {
    // handle error
  });
```

## Error Handling

This library comes with the standard way of handling all the errors originated by Paytm.
The Error object comes with the following keys and value

 1. message:
	 1. "Missing Parameter": If any mandatory key is missing
	 2. "API Error": When the Error comes from the API
 2. statusCode:
	 1. -1: When Missing Parameter
	 2. HTTP Error code in all other cases
3. error:
	1. This is an object which contains the error message that came from the Paytm API
	2. In the case of missing parameter, it will be {message: 'parameter which is missing'} 

---

## Development

```bash
npm install
```

## Testing

```bash
npm test
```

## Release

1. Switch to the `master` branch. Make sure you have the latest changes in the local master
2. Update the `CHANGELOG.md` & bump the version in `package.json`
3. Commit
4. Tag the release & push it to Github
5. Create a release on GitHub using the website with more details about the release
6. Publish to npm with the `npm publish` command

## Licence

MIT Licensed. See [LICENSE.txt](LICENSE.txt) for more details
