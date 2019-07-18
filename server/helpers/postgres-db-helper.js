/**
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const log4js = require('log4js');
const config = require('config');
// const pg = require('pg');
const logger = log4js.getLogger('helpers - postgres DB helper');
logger.setLevel(config.logLevel);
const {
    Pool
} = require('pg');



let pool = {};
const postgresDBHelper = {};

postgresDBHelper.init = (options) => {
   
    pool = new Pool({
        connectionString: options.connection
    });
    pool.on('error', (err, client) => {
        logger.error('Unexpected error on idle client', err)
        process.exit(-1)
    });
};


postgresDBHelper.getUser = (userId) => {
    return new Promise((Resolve, reject) => {
        logger.debug('in postgresDBHelper.getUser() ');

        pool.connect().then(client => {
            console.log('client connected');
            const queryText = "SELECT * FROM users WHERE userId =$1";
            client.query(queryText, [userId]).then((result) => {
                logger.debug('get user call done');
                client.release();
                Resolve(result.rows);
            }).catch(err => {
                logger.error('error postgres query ' + err);
                client.release();
                reject('error postgres query ' + err);
            });
        });

    });
};

postgresDBHelper.getAllUsers = () => {
    return new Promise((Resolve, reject) => {
        logger.debug('in postgresDBHelper.getAllUsers() ');

        pool.connect().then(client => {
            console.log('client connected');
            const queryText = "SELECT * FROM users";
            client.query(queryText).then((result) => {
                logger.debug('get all users call done');
                client.release();
                Resolve(result.rows);
            }).catch(err => {
                logger.error('error postgres query ' + err);
                client.release();
                reject('error postgres query ' + err);
            });
        });

    });
};

postgresDBHelper.createDB = () => {
    logger.debug('in postgresDBHelper.createDB() ');
    return new Promise((Resolve, reject) => {
        pool.connect().then(client => {
            console.log('client connected');
            client.query(
                "CREATE TABLE IF NOT EXISTS users (userId varchar(256) NOT NULL,role varchar(256) NOT NULL, org varchar(256) NOT NULL, pw varchar(256) NOT NULL, cert varchar(2000) NOT NULL)").then((result) => {
                logger.debug('create db call done');
                Resolve();
            }).catch(err => {
                logger.error('error in constructor ' + err);
                reject('error in constructor ' + err);
            });

        });
    });
};

postgresDBHelper.insertUser = (userId, role, org, pw, certificate) => {
    return new Promise((resolve, reject) => {
        logger.debug('in postgresDBHelper.insertUser() ');
        pool.connect().then(client => {
            console.log('client connected');
            const queryText = "INSERT INTO users(userId,role,org,pw,cert) VALUES($1, $2,$3,$4,$5)";
            client.query(
                queryText, [userId, role, org, pw, certificate]).then(result => {
                logger.debug('insert user call done');
                client.release();
                resolve(result);
            }).catch(err => {
                logger.error('error in insert user ' + err);
                client.release();
                reject('error in insert user ' + err);
            });
        });
    });
};

module.exports = postgresDBHelper;