#blend.js
Micro library for performing shallow/deep copying of objects with support for array merging + dedup

# Extend for Node, CommonJS, Browserify, AMD and Browser

`blend` is **NOT** a direct port of jQuery's extend() method. This lib follows the same approach that jQuery.extend does
except it will handle the deep copying of arrays differently. jQuery will overwrite the index of an array during a deep copy
where as blend will merge the contents of the arrays, and dedup if defined.

## NPM Installation

This package is available on [npm](https://www.npmjs.com/package/blend.js) as: `blend.js`

```
npm install blend.js
```

## Bower Installation

```
bower install blend.js

// include the file inside your app
<script type="text/javascript" src="/bower_components/blend/lib/blend.min.js"></script>
```

## Usage

*Merge the contents of two or more objects into the target object.*

**Syntax:** blend **(** [`deep`], [`dedup`], `target`, `object1`, [`objectN`] **)**

### Arguments

* `deep` *Boolean*
If true, the merge becomes recursive (optional)
* `dedup` *Boolean*
If true, arrays will be dedupped during deep copy  (optional)

* `target`  *Object*
The object receiving the new properties
* `objectN` *Object* (Optional)
One or more additional objects to merge with the first

**Example:**

Shallow copy:
``` js
var blend = require('blend'), // window.blend for browsers (`blend` is global)
    target = {
      test: 'me'
    },
    object1 = {
      hello: {
        name: 'world',
        ids: [1,2,3,4]
      }
    },
    object2 = {
      hello: {
        first: 'kieran',
        ids: [4,5,6,7]
      }
    };

blend(target, object1, object2);

// output
{
  test: 'me',
  hello: {
    first: 'kieran',
    ids: [4,5,6,7]
  }
}
```
Deep copy:
```js
blend(true, target, object1, object2);

// output
{
  test: 'me',
  hello: {
    first: 'kieran',
    name: 'world',
    ids: [1,2,3,4,4,5,6,7]
  }
}
```
Deep copy + dedup:
```js
blend(true, true, target, object1, object2);

// output
{
  test: 'me',
  hello: {
    first: 'kieran',
    name: 'world',
    ids: [1,2,3,4,5,6,7]
  }
}
```

## Acknowledgements
Credit to jQuery for the foundation of this utility function.
