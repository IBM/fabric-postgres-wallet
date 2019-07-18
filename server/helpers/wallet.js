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
/**
 * Updated Implementation of FileSystem Memory Wallet with InMemory Wallet
 * Same applies to couchdb wallet to be implemented
 */
const log4js = require('log4js');
const config = require('config');
const path = require('path');
const nconf = require("nconf");

const {
  FileSystemWallet,
  X509WalletMixin
} = require('fabric-network');
const {
  PostgresDBWallet
} = require('./postgres-db-wallet');
const {
  InMemoryWallet
} = require('fabric-network');
const logger = log4js.getLogger('helpers - wallet');
logger.setLevel(config.logLevel);


/**
 * Wallet object
 */
const wallet = {};

let persistantWallet;

// memory wallet for caching
const memoryWallet = new InMemoryWallet();

wallet.init = () => {
  persistantWallet = new PostgresDBWallet();
  logger.debug('persistant wallet init done ');
}

/**
 * Return inmemory wallet and hide FileSystemWallet object
 */
wallet.getWallet = () => {
  return memoryWallet;
};

/**
 * check if the identity exists in memory wallet
 * @param {string} id - label of id in wallet
 */
wallet.identityExists = async (id) => {
  let existsInMemory = await memoryWallet.exists(id);
  if (!existsInMemory) {
    logger.debug("Identity doesn't exists in memory, checking in persistant database...");
    let existsInPersistant = await persistantWallet.exists(id);
    if (!existsInPersistant) {
      throw new Error("Invalid Identity, no certificate found in certificate store");
    } else {
      // export from persistant wallet and store in memory wallet
      logger.debug("Identity " + id + " found in persistant store");
      let identity = await exportIdentity(id);
      logger.debug("Identity Exportted ", id, ", importing to memory wallet");
      await memoryWallet.import(id, identity);
      logger.debug("Identity ", id, "imported to memory wallet");
      existsInMemory = true;
    }
  }
  logger.debug(`${id} exists in wallet: ${existsInMemory}`);
  return existsInMemory;
};

/**
 *
 * @param {string} id - label of id importing into wallet
 * @param {string} org - org that id belongs to
 * @param {string} cert - cert from enrolling user
 * @param {string} key - key from enrolling user
 */
wallet.importIdentity = async (id, role, org, cert, key, pw) => {
  // check if the identity exists in persistant wallet
  const exists = await persistantWallet.exists(id);
  if (!exists) {
    try {
      logger.debug(`Importing ${id} into wallet`);
      await persistantWallet.import(id, role, org, pw, X509WalletMixin.createIdentity(org, cert, key));
    } catch (err) {
      logger.debug(`Error importing ${id} into wallet: ${err}`);
      throw new Error(err);
    }
  }
  // export from persistant wallet and store in memory wallet
  let identity = await exportIdentity(id);
  logger.debug("Identity Exportted ", id, ", importing to memory wallet");
  await memoryWallet.import(id, identity);
  logger.debug("Identity ", id, "imported to memory wallet");

};

/**
 *
 * @param {string} id - label of id importing into wallet
 */
exportIdentity = async (id) => {
  try {
    logger.debug(`Export ${id} from persistant wallet`);
    return await persistantWallet.export(id);
  } catch (err) {
    logger.debug(`Error Exorting ${id} into wallet: ${err}`);
    throw new Error(err);
  }
};


module.exports = wallet;