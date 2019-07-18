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
const IBMCloudEnv = require('ibm-cloud-env');
const JWT = require('jsonwebtoken');
const util = require('../helpers/util');
const postgresDBHelper = require('../helpers/postgres-db-helper');

const logger = log4js.getLogger('controllers - accessToken');

logger.setLevel(config.logLevel);

IBMCloudEnv.init();

/**
 * Controller object
 */
const accessToken = {};

accessToken.generateAccessToken = async (req, res) => {
    logger.debug('inside generateAccessToken()...');
    let jsonRes;
    try {
        const userId = req.body.userId;
        const password = req.body.password;
        const result = await postgresDBHelper.getUser(userId);
        if (result && result.length && result[0] && result[0].pw) {
            if (password === result[0].pw) {
                let user = {
                    userId: userId,
                    role: result[0].role,
                    org: result[0].org
                };
                logger.debug('generateAccessToken user authenticated');
                let token = JWT.sign(user, config.tokenSecret, {
                    expiresIn: config.tokenExpriryTime
                });
                jsonRes = {
                    statusCode: 200,
                    success: true,
                    result: token
                };
            } else {
                jsonRes = {
                    errors: [{
                        code: 401,
                        message: 'user credentials are invalid',
                        details: {}
                    }],
                    statusCode: 401
                };
            }
        } else {
            jsonRes = {
                errors: [{
                    code: 401,
                    message: 'user credentials are invalid',
                    details: {}
                }],
                statusCode: 401
            };
        }

    } catch (err) {
        jsonRes = {
            errors: [{
                code: 500,
                message: err,
                details: {}
            }],
            statusCode: 500
        };
    }
    util.sendResponse(res, jsonRes);
};

module.exports = accessToken;