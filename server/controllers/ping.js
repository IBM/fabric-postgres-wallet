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


const fabricNetworkClient = require('../helpers/fabric-network-client');
const connectionProfile = require('../config/connection-profile.json');
const channelConfig = require('../config/channel-config.json');

const logger = log4js.getLogger('controllers - ping');

logger.setLevel(config.logLevel);

/**
 * Controller object
 */
const ping = {};

ping.pingCC = async (req, res) => {
  logger.debug('inside pingCC()...');
  let jsonRes;
  try {
    const userId =res.locals.user.userId;
    const queryResponse = await fabricNetworkClient.evaluateTransaction(userId, channelConfig.channelName, channelConfig.chaincodeName, connectionProfile, 'queryAllCars', "");
    jsonRes = {
      statusCode: 200,
      success: true,
      result: queryResponse.toString(),
    };
  } catch (err) {
    jsonRes = {
      statusCode: 500,
      success: false,
      message: `FAILED: ${err}`,
    };
  }
  util.sendResponse(res, jsonRes);
};

module.exports = ping;