# Crypto

Crypto utilities

------

## Table of Contents

  * [md5()](#md5)
  * [openssh2pem()](#openssh2pem)
  * [pemme()](#pemme)
  * [sha1()](#sha1)

------

<a name="md5"></a>
## md5(str) : String

Return the md5 digest of a buffer/utf-8 string.

```javascript
const md5 = require('nyks/crypto/md5');

md5(""); // return "d41d8cd98f00b204e9800998ecf8427e"
```

------

<a name="openssh2pem"></a>
## openssh2pem(str) : String

Return the PEM version of an openssh public key (yeah !).

```javascript
const openssh2pem = require('nyks/crypto/openssh2pem');

let rsa_key = "" + fs.readFileSync(path.join(rsa_key_filepath));
openssh2pem(rsa_key); // return the pem string from the rsa key...
```

------

<a name="pemme"></a>
## pemme(str, armor) : String

Create a PEM encoded armor around a desired string (chunk size 65).

```javascript
const pemme = require('nyks/crypto/pemme');

pemme("Hello", "WRAPPER"); // return `-----BEGIN WRAPPER-----\nHello\n-----END WRAPPER-----`
```

------

<a name="sha1"></a>
## sha1(str) : String

Return the sha1 digest of a buffer/utf-8 string.

```javascript
const sha1 = require('nyks/crypto/sha1');

sha1("Hello"); // return "f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0"
```
