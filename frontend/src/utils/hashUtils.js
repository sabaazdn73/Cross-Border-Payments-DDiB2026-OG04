// Standard synchronous SHA-256 implementation in pure JS
function sha256Sync(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j;

  var words = [];
  var asciiLength = ascii[lengthProperty] * 8;
  
  var hash = sha256Sync.h = sha256Sync.h || [];
  var k = sha256Sync.k = sha256Sync.k || [];
  var primeCounter = k[lengthProperty];

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = 1;
      }
      hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
      k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
    }
  }
  
  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    words[i >> 2] |= j << ((3 - i % 4) * 8);
  }
  words[words[lengthProperty]] = ((asciiLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiLength | 0);
  
  var h0 = hash[0], h1 = hash[1], h2 = hash[2], h3 = hash[3], h4 = hash[4], h5 = hash[5], h6 = hash[6], h7 = hash[7];

  for (i = 0; i < words[lengthProperty]; i += 16) {
    var w = words.slice(i, i + 16);
    var oldh0 = h0, oldh1 = h1, oldh2 = h2, oldh3 = h3, oldh4 = h4, oldh5 = h5, oldh6 = h6, oldh7 = h7;

    for (j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = w[j] || 0;
      } else {
        var s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        var s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
      }

      var S1 = rightRotate(h4, 6) ^ rightRotate(h4, 11) ^ rightRotate(h4, 25);
      var ch = (h4 & h5) ^ (~h4 & h6);
      var temp1 = (h7 + S1 + ch + k[j] + w[j]) | 0;
      var S0 = rightRotate(h0, 2) ^ rightRotate(h0, 13) ^ rightRotate(h0, 22);
      var maj = (h0 & h1) ^ (h0 & h2) ^ (h1 & h2);
      var temp2 = (S0 + maj) | 0;

      h7 = h6;
      h6 = h5;
      h5 = h4;
      h4 = (h3 + temp1) | 0;
      h3 = h2;
      h2 = h1;
      h1 = h0;
      h0 = (temp1 + temp2) | 0;
    }

    h0 = (h0 + oldh0) | 0;
    h1 = (h1 + oldh1) | 0;
    h2 = (h2 + oldh2) | 0;
    h3 = (h3 + oldh3) | 0;
    h4 = (h4 + oldh4) | 0;
    h5 = (h5 + oldh5) | 0;
    h6 = (h6 + oldh6) | 0;
    h7 = (h7 + oldh7) | 0;
  }

  return [h0, h1, h2, h3, h4, h5, h6, h7].map(h => {
    const val = (h >>> 0).toString(16);
    return '00000000'.slice(val.length) + val;
  }).join('');
}

// Recursively sort object keys for canonical serialization (identical to backend)
function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === 'object') {
    return Object.keys(value).sort().reduce((acc, key) => {
      acc[key] = sortObject(value[key]);
      return acc;
    }, {});
  }
  return value;
}

export const generateRecordHash = (record) => {
  const canonical = JSON.stringify(sortObject(record));
  return 'sha256:' + sha256Sync(canonical);
};

export const verifyRecordHash = (record, storedHash) => {
  const currentHash = generateRecordHash(record);
  return {
    currentHash,
    storedHash,
    isMatch: currentHash === storedHash,
  };
};
