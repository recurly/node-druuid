
/*!
 * Module dependencies.
 */

var bigInteger = require('big-integer');

/**
 * The offset from which druuid UUIDs are generated (in milliseconds).
 */

exports.epoch = 0;

/**
 * Generates a time-sortable, 64-bit UUID.
 *
 * Examples:
 *
 *    druuid.gen()
 *    // => <BigInt 11142943683383068069>
 *
 * @param {Date} [date=new Date()] of UUID
 * @param {Number} [epoch=druuid.epoch] offset
 * @return {BigInt} UUID
 * @public
 */

exports.gen = function gen(date, epoch){
  if (!date) date = new Date();
  if (!epoch) epoch = exports.epoch;
  var id = bigInteger(date - epoch).shiftLeft(64 - 41);
  return id.or(Math.round(Math.random() * 1e16) % Math.pow(2, 64 - 41));
};

/**
 * Determines when a given UUID was generated.
 *
 * Examples:
 *
 *     druuid.time(11142943683383068069);
 *     // => Sat Feb 04 2012 00:00:00 GMT-0800 (PST)
 *
 * @param {BigInt|Number|String} uuid
 * @param {Number} [epoch=druuid.epoch] offset
 * @return {Date} when UUID was generated
 * @public
 */

exports.time = function(uuid, epoch){
  if (!epoch) epoch = exports.epoch;
  var ms = bigInteger(uuid).shiftRight(64 - 41).toJSNumber();
  return new Date(ms + epoch);
};
