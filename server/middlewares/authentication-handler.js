/**
 * Copyright 2019 IBM Corp. All Rights Reserved.
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
const JWT = require('jsonwebtoken');
const util = require('../helpers/util');

/**
 * Set up logging
 */
const logger = log4js.getLogger('authentication handler');
logger.setLevel(config.logLevel);

/**
 * auth Handler object
 */
const authHandler = {};


/**
 * auth handler function
 */
authHandler.authenticateUser = (req, res, next) => {
    logger.debug('authenticateUser handler...');
    // res.locals.user = {
    //     userId: 'UBP'
    // };
    // next();
    let token = req.headers.authorization;
    if (!token) {
        jsonRes = {
            errors: [{
                code: 401,
                message: 'No token provided.',
                details: {}
            }],
            statusCode: 401
        };
        util.sendResponse(res, jsonRes);
    } else {
        token = token.split(" ")[1];
        JWT.verify(token, config.tokenSecret, function (err, decoded) {
            if (err) {
                jsonRes = {
                    errors: [{
                        code: 401,
                        message: 'user un-authorized',
                        details: {}
                    }],
                    statusCode: 401
                };
                util.sendResponse(res, jsonRes);
            } else {
                console.log('*************************** user authenticated');
                console.log(decoded);
                res.locals.user = decoded;
                next();
            }

    });
    }

};

module.exports = authHandler;