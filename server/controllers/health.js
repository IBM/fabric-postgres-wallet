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

const util = require('../helpers/util');
const logger = log4js.getLogger('controllers - health');
logger.setLevel(config.logLevel);     

/**
 * Controller object
 */
const health = {};

health.getHealth = (req, res) => {
  logger.debug('inside getHealth()...');

  const jsonRes = {
    statusCode: 200,
    success: true,
    message: 'Server is up!',
    status: 'UP',
  };

  util.sendResponse(res, jsonRes);
};

module.exports = health;
