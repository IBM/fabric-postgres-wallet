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
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const FabricClient = require('fabric-client');

/**
 * Util object
 */
const userEnrollmentutil = {};


/**
 * Set up logging
 */
const logger = log4js.getLogger('user-enrollment - user-enrollment-util');
logger.setLevel(config.logLevel);

/**
 * Initialize userEnrollmentutil with path of connection profile
 */
let connectionProfilePath =path.join(__dirname,'/../config/connection-profile.json');

/**
 * Enroll given user with given org Fabric CA
 */
userEnrollmentutil.userEnroll = (orgName, enrollId, enrollSecret) => {
  logger.debug(`Enrolling user ${enrollId}`);
  return new Promise(((resolve, reject) => {
    // add network config file to fabric ca service and get orgs and CAs fields
    logger.debug("load connection profile");
    FabricCAServices.addConfigFile(connectionProfilePath); //`${__dirname}/../config/connection-profile.json`
    logger.debug("connection profile loaded");
    const orgs = FabricCAServices.getConfigSetting('organizations');
    const cas = FabricCAServices.getConfigSetting('certificateAuthorities');

    if (!orgs[orgName]) {
      logger.debug(`Invalid org name: ${orgName}`);
      throw new Error(`Invalid org name: ${orgName}`);
    }

    // get certificate authority for orgName
    const fabricCAKey = orgs[orgName].certificateAuthorities[0];
    const fabricCAEndpoint = cas[fabricCAKey].url;
    const fabricCAName = cas[fabricCAKey].caName;

    // enroll user with certificate authority for orgName
    const tlsOptions = {
      trustedRoots: [],
      verify: false,
    };
    const caService = new FabricCAServices(fabricCAEndpoint, tlsOptions, fabricCAName);
    const req = {
      enrollmentID: enrollId,
      enrollmentSecret: enrollSecret,
    };
    logger.debug("Enrollment Request...");
    logger.debug(req);
    caService.enroll(req).then(
      (enrollment) => {
        enrollment.key = enrollment.key.toBytes();
        logger.debug("enrolling ");
        return resolve(enrollment);
      },
      (err) => {
        logger.debug(err);
        logger.debug("err " + err);
        return reject(err);
      },
    );
  }));
};


userEnrollmentutil.importUserToWallet=(user,org,enrollInfo)=>{
  return new Promise((resolve,reject)=>{
			let enrollJson = {
				"user": user,
				"org": org,
				"certificate": enrollInfo.certificate,
				"key": enrollInfo.key
			}
			if (isPersistantStore) {
				console.log("Storing User Certificate in Persistant Store...");
				walletHelper.init(IBMCloudEnv.getDictionary('db-credentials'));
				walletHelper.importIdentity(user, org, enrollInfo.certificate, enrollInfo.key);
			} else {
				console.log("Storing User Certificate on File System...");
				fs.writeFile('enrollInfo.json', enrollJson, function (err) {
					if (err) throw err;
					console.log('Saved!');
				});
			}
			return resolve(enrollInfo);
		
  });
}
/**
 * Enroll given user with given org Fabric CA
 */
userEnrollmentutil.userRegister = (orgName, enrollId, enrollSecret, affiliation, role) => {
  logger.debug(`Registering user ${enrollId}`);
  return new Promise(((resolve, reject) => {
    // add network config file to fabric ca service and get orgs and CAs fields
    logger.debug("load connection profile");
    console.log('connection profile path ',connectionProfilePath);
    FabricCAServices.addConfigFile(connectionProfilePath);
    logger.debug("connection profile loaded");
    const orgs = FabricCAServices.getConfigSetting('organizations');
    const cas = FabricCAServices.getConfigSetting('certificateAuthorities');

    if (!orgs[orgName]) {
      logger.debug(`Invalid org name: ${orgName}`);
      throw new Error(`Invalid org name: ${orgName}`);
    }
    // get certificate authority for orgName
    const fabricCAKey = orgs[orgName].certificateAuthorities[0];
    const fabricCAEndpoint = cas[fabricCAKey].url;
    const fabricCAName = cas[fabricCAKey].caName;
    const registrarId = cas[fabricCAKey].registrar[0].enrollId;
    const registrarSecret = cas[fabricCAKey].registrar[0].enrollSecret;
    var fabricClient = new FabricClient();
    fabricClient.loadFromConfig(connectionProfilePath);
    FabricClient.newDefaultKeyValueStore({
      path: "."
    }).then((state_store) => {
      // assign the store to the fabric client
      fabricClient.setStateStore(state_store);
      var crypto_suite = FabricClient.newCryptoSuite();
      // use the same location for the state store (where the users' certificate are kept)
      // and the crypto store (where the users' keys are kept)
      var crypto_store = FabricClient.newCryptoKeyStore({
        path: "."
      });
      crypto_suite.setCryptoKeyStore(crypto_store);
      fabricClient.setCryptoSuite(crypto_suite);
      var tlsOptions = {
        trustedRoots: [],
        verify: false
      };
      return fabricClient.setUserContext({
        username: registrarId,
        password: registrarSecret
      });
      
    }).then((registrarUser) => {
      // enroll user with certificate authority for orgName
      const tlsOptions = {
        trustedRoots: [],
        verify: false,
      };
      const caService = new FabricCAServices(fabricCAEndpoint, tlsOptions, fabricCAName);
      const req = {
        enrollmentID: enrollId,
        affiliation: affiliation,
        role: role,
        enrollmentSecret: enrollSecret
      };
      caService.register(req, registrarUser).then(
        (enrollment) => {
          logger.debug("enrolling ");
          return resolve(enrollment);
        }).catch((err) => {
        console.log(err);
        logger.debug("err " + err);
        return reject(err);
      });
    })
  }));
};

module.exports = userEnrollmentutil;