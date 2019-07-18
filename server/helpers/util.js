/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const log4js = require('log4js');
const config = require('config');
const crypto = require('crypto');
const _ = require('lodash');
/**
 * Util object
 */
const util = {};


/**
 * Set up logging
 */
const logger = log4js.getLogger('helpers - util');
logger.setLevel(config.logLevel);


/**
 * Send http response helper
 * res: express response object
 * msg: {statusCode (int), success (bool), message (string), etc}
 */
util.sendResponse = (res, msg) => {
  const response = msg;
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = response.statusCode;
  delete response.statusCode;
  res.json(response);
};

 util.getSalt =()=>{
  return crypto.randomBytes(16).toString('hex');
 };

 util.hashPassword = (pw, salt) => {
  const hash = crypto.pbkdf2Sync(pw, salt,
    1000, 64, `sha512`).toString(`hex`);
  return hash;
};

util.createRandomString = (length) => {
  let str = "";
  for (; str.length < length; str += Math.random().toString(36).substr(2));
  return str.substr(0, length);
};

util.checkIfNull = (paramName) => {
  let paramValue;
  if(_.isNil(paramName) || _.isEmpty(paramName)) 
  {
    paramValue = "true";
  }else{
    paramValue = "false";
  }
  return paramValue;
};

module.exports = util;