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
const {
  Gateway,
  DefaultEventHandlerStrategies
} = require('fabric-network');

const walletHelper = require('./wallet');
const util = require('./util');

const logger = log4js.getLogger('helper -fabricNetworkClient ');
logger.setLevel(config.logLevel);

const fabricNetworkClient = {};

fabricNetworkClient.submitTransaction = async (user, channelName, chaincodeName, connectionProfile, functionName, parameters) => {
  logger.debug('inside fabricNetworkClient.submitTransaction()...');
  const gateway = new Gateway();

  try {
    // user enroll and import if identity not found in wallet
    const idExists = await walletHelper.identityExists(user);
    if (!idExists) {
      throw new Error("Invalid Identity, no certificate found in certificate store");
    }

    // gateway and contract connection
    await gateway.connect(connectionProfile, {
      identity: user,
      wallet: walletHelper.getWallet()

    });

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);

    // invoke transaction
    logger.debug('submit transaction : '+functionName);
    const invokeResponse = await contract.submitTransaction(functionName, parameters);
    return invokeResponse;
  } catch (err) {
    throw new Error(err);
  } finally {
    gateway.disconnect();
    logger.debug('gateway disconnected');
  }
};

fabricNetworkClient.evaluateTransaction = async (user, channelName, chaincodeName, connectionProfile, functionName, parameter) => {
  logger.debug('inside fabricNetworkClient.evaluateTransaction()...');
  const gateway = new Gateway();

  try {
    // user enroll and import if identity not found in wallet
    const idExists = await walletHelper.identityExists(user);
    if (!idExists) {
      throw new Error("Invalid Identity, no certificate found in certificate store");
    }

    // gateway and contract connection
    await gateway.connect(connectionProfile, {
      identity: user,
      wallet: walletHelper.getWallet(),
      discovery: { enabled: true, asLocalhost: false }
    });
    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    logger.debug('evaluate transaction : '+functionName);
    const queryResponse = await contract.evaluateTransaction(functionName, parameter);
    return queryResponse.toString();
  } catch (err) {
    throw new Error(err);
  } finally {
    gateway.disconnect();
    logger.debug('gateway disconnected');
  }
};


module.exports = fabricNetworkClient;