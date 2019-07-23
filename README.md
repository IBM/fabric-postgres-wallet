## ** Work in Progress **
# Postgre SQL Database as a Fabric Certificate Wallet 

Security on the Hyperledger Fabric is enforced with digital signatures. All requests made to the fabric must be signed by users with appropriate enrolment certificates. Once user is enrolled, Node js application persist certificate in wallet for future usages.

Fabric Node SDKs provide default file system wallet for storing fabric certificate. File system wallet stores user certificate in folders. This approach does not provide required security and flexibility to maintain certificate like generation of new certificate for enrolled users (if any modification to blockchain network) or unregistering user from blockchain. File system wallet also impact scalability as production projects grow.

Fabric Node SDK provides a way to store certificates in Couch DB but not in Postgres. There is not direct provision to store enrolment certificates to Postgres database. Postgres database support SQL and NoSQL data storing and has strong community support. Postgres database provides more flexibility compared to Couch db. Also, PostgreSQL provides cost effective alternative. This pattern demonstrates how to use Postgre SQL db as Certificate Wallet using Nodejs SDK.

At the end of this code pattern, users will understand - how to use postgre sql db as a fabric certificate wallet using node js SDK.

# Flow

# Pre-requisites

* [IBM Cloud Account](https://cloud.ibm.com)
* [Git Client](https://git-scm.com/downloads) - needed for clone commands.
* [Node js](https://nodejs.org/en/download/) - 8.9 or greator

# Steps

Follow these steps to setup and run this code pattern. The steps are described in detail below.
1. [Get the code](#1-get-the-code)
2. [Create IBM Cloud Services](#2-create-ibm-cloud-services)
3. Set up the Hyperledger Fabric Network
4. Configure Postgre SQL DB
5. Update connection profile and credentials
6. Run the application


## 1. Get the code

- Clone the repo using the below command.
   ```
   git clone https://github.com/IBM/fabric-postgres-wallet.git
   ```

## 2. Create IBM Cloud Services

**Create IBM Kubernetes Service Instance**

**Create IBM Blockchain Platform Service Instance**

## 3. Setup

In this step, we will setup the Hyperledger Fabric network using IBM Blockchain Platform. 


The network should consist of two organizations with single peer each and an orderer service for carrying out all the transactions. For detailed steps, please refer to the [quick start guide](https://developer.ibm.com/tutorials/quick-start-guide-for-ibm-blockchain-platform/) for IBM Blockchain Platform.


## Learn More

* [Quick start guide for IBM Blockchain Platform](https://developer.ibm.com/tutorials/quick-start-guide-for-ibm-blockchain-platform/)


<!-- keep this -->
## License

This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

