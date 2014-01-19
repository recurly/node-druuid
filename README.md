# node-druuid

Date-relative (and relatively universally unique) UUID generation.

## Install

``` sh
$ npm install druuid
```

## Overview

Druuid generates 64-bit, time-sortable IDs inspired by [Snowflake][1]
and [Instagram][2].

[1]: https://github.com/twitter/snowflake
[2]: http://www.tumblr.com/ZElL-wA6vd-t


A druuid comprises:

- A 41-bit timestamp (which has millisecond precision for over 69 years
  after a defined epoch); and

- 23 random bits.


For example, a druuid generated at midnight on February 4, 2012, may
look something like 11142943683383068069. In binary:

| Timestamp                                 | Randomness              |
|-------------------------------------------|-------------------------|
| 10011010101000111011000000111110000000000 | 01110110000010110100101 |

This ID can be displayed compactly in base 36: 2cnpvvfkm56ed.


### Pros

- 64-bit IDs can be stored in BIGINT database columns, which are
  generally more efficient to index (and index uniquely) than VARCHAR.

- The timestamp component allows for efficient date-based queries and
  easy cursor-based pagination.


### Cons

- 23 bits of randomness contains much less entropy than traditional,
  128-bit UUIDs, so precautions must be taken to avoid collisions
  between druuids generated in the same millisecond (<i>e.g.</i>, a
  database constraint). The probability, within a millisecond, can be
  calculated with [the Birthday problem][3] (where <i>n</i> is the
  number of IDs generated per millisecond and 23 represents the number
  of random bits):

  <img src='https://cloudup.com/files/id7BGBwAxUt/download' alt='p(n)≈1-e^(-(n^2)/(2*2^23))' height='72' width='323'/>

  IDs generated in different milliseconds cannot collide, but at a rate
  of 10 IDs per millisecond (10,000 IDs per second), the probability a
  collision will occur within any given millisecond approaches
  0.000596%, which is about once every few minutes if that rate is
  constant.

[3]: http://en.wikipedia.org/wiki/Birthday_problem

## Examples

``` js
var druuid = require('druuid');
// druuid.epoch = Date.UTC(1970, 0); // change the default (Unix) epoch

var uuid = druuid.gen();
// => <BigInt 11142943683383068069>
druuid.time(uuid);
// => Sat Feb 04 2012 00:00:00 GMT-0800 (PST)
```

## License

MIT
