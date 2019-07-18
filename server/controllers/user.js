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
    Gateway
} = require('fabric-network');


const util = require('../helpers/util');
const userEnrollmentUtil = require('../user-enrollment/user-enrollment-util');
const walletHelper = require('../helpers/wallet');
const postgresDbHelper = require('../helpers/postgres-db-helper');
const gateway = new Gateway();
const logger = log4js.getLogger('controllers - userEnrollment');
logger.setLevel(config.logLevel);

/**
 * Controller object
 */
const user = {};

user.createUser = async (req, res) => {
    logger.info('inside createUser()...');
    logger.debug('request body to create user -');
    logger.debug(req.body);
    let jsonRes;
    try {
        // user enroll and import 

        const registerUser = await userEnrollmentUtil.userRegister(req.body.org, req.body.user, req.body.pw, req.body.affiliation, req.body.role, req.body.attrs);
        const enrollInfo = await userEnrollmentUtil.userEnroll(req.body.org, req.body.user, req.body.pw);
        await walletHelper.importIdentity(req.body.user, req.body.attrs[0].userRole, req.body.org, enrollInfo.certificate, enrollInfo.key, req.body.pw);

        jsonRes = {
            statusCode: 200,
            success: true,
            result: 'user created successfully'
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



user.getUsers = async (req, res) => {
    logger.info('inside getUsers()...');
    let jsonRes;
    try {
        const result= await postgresDbHelper.getAllUsers();      
        jsonRes = {
            statusCode: 200,
            success: true,
            result: result
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

module.exports = user;