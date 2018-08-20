# enhanceFetch

A set of composable tools for building http client functions around fetch.

## Usage
```javascript
import {
  addJsonHeaders,
  combineResponseError
  compose,
  logResponse,
  throttle,
} from 'enhanceFetch'

const myFetch = compose(
  throttle,
  addJsonHeaders,
  logResponse,
  combineResponseError
)(fetch)
```

## compose
```javascript
compose(f, g)(fetch)(url, init)
```
is equivalent to:
```javascript
f(g(fetch))(url, init)
```

## combineResponseError
Always returns a `{response, error: { fetchResponse, typeError }}` object
whether the fetch Promise resolves or rejects. All keys are only present if
they have a value: | Case | Returned object |
| --- | --- |
| `fetch` resolves, `response.ok` | { response } |
| `fetch` resolves, `!response.ok` | { error: { fetchResponse } } |
| `fetch` rejects | { error: { typeError } } |

## combinedResponseToJson
Will, if possible, convert `response` to JSON or add `error.json` if there's an
`error.fetchResponse`.
```javascript
const myFetch = compose(combinedResponseToJson, combineResponseError)(fetch)
```
> Note the composition order.
> We want `fetch(...args).then(/* combine */).then(/* json */)`. So
> `combinedResponseToJson` must come first to wrap the other functions.

## Other enhancers
See `src/enhancers` for more enhancers.
