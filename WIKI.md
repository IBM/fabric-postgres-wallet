# Short Title

Postgre SQL Database as a Fabric Wallet



# Long Title

Demonstrate the methodology to use Postgre SQL Database as a Fabric Wallet using Fabric Node SDK


# Author


* [Shikha Maheshwari](https://www.linkedin.com/in/shikha-maheshwari) 
* [Dipeeka Patil]() 


# URLs

### Github repo

> "Get the code": 
* https://github.com/IBM/fabric-postgres-wallet

### Other URLs

* Demo URL

NA

# Summary

The Hyperledger Fabric SDK for Node.js provides a powerful API to interact with a Hyperledger Fabric blockchain. It provides default file-system wallet for storing fabric certificate and also provides a way to store certificates in Couch DB but not in Postgres. Explore this pattern further to understand how to use Postgres DB as Fabric wallet.

# Technologies

* [Blockchain](https://en.wikipedia.org/wiki/Blockchain): A blockchain is a digitized, decentralized, public ledger of all transactions in a network.

* [Postgre SQL](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system.

* [NodeJS](https://nodejs.org/en/): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.


# Description

Hyperledger Fabric is one of the blockchain projects within Hyperledger. It is private and permissioned. Security on the Hyperledger Fabric is enforced with digital signatures. All requests made to the fabric must be signed by users with appropriate enrolment certificates. Once user is enrolled, Node js application persist certificate in wallet for future usages. A wallet contains a set of user identities. An application run by a user selects one of these identities when it connects to a channel. 

There are four different types of wallet: File system, In-memory, Hardware Security Module (HSM) and CouchDB. Fabric SDK for Node.js provides default file-system wallet for storing fabric certificate. File system wallet stores user certificate in folders. Fabric Node SDK also provides a way to configure wallet in Couch DB. 

But what if an user wants to use Postgres DB instead of Couch DB? There is no direct provision to store enrolment certificates to Postgres database. Postgres database support SQL and NoSQL data storing and has strong community support. This pattern demonstrates a methodology to use Postgre SQL DB as wallet using Fabric SDK for Node.js.

In this code pattern we use IBM Blockchain Platform to setup the fabric network, Postgre SQL DB configured either as a IBM Cloud service or containerized using Kubernetes. At the end explore API swagger provided as a node app.


# Flow

![Architecture](https://github.com/IBM/fabric-postgres-wallet/blob/master/images/architecture.png)


* Hyperledger Fabric network is setup using IBM Blockchain Platform.
* Configure and deploy Postgre SQL database in container.
* Deploy the client application using Fabric SDK for Node.js through which user can communicate with blockchain network.
* User will register/enroll to the blockchain network as a first step. The generated certificates will be stored in Postgre SQL DB. These certificates will be used to do further transactions with blockchain network.


# Instructions

> Find the detailed steps for this pattern in the [readme file](https://github.com/IBM/fabric-postgres-wallet/blob/master/README.md) 

The steps will show you how to:

1. Get the code
2. Create IBM Cloud Services
3. Setup Hyperledger Fabric Network using IBM Blockchain Platform
4. Setup PostgreSQL DB
5. Update connection profile and PostgreSQL credentials
6. Run the application
7. API description

# Components and services

* [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/): Hyperledger Fabric is a platform for distributed ledger solutions underpinned by a modular architecture delivering high degrees of confidentiality, resiliency, flexibility and scalability.

* [Postgre SQL DB](https://www.postgresql.org/)

* [IBM Cloud Kubernetes Service](https://cloud.ibm.com/containers-kubernetes/catalog/cluster): IBM Kubernetes Service enables the orchestration of intelligent scheduling, self-healing, and horizontal scaling.

* [IBM Blockchain Platform](https://cloud.ibm.com/catalog/services/blockchain-platform): IBM Blockchain Platform is an enterprise-ready blockchain application development platform powered by Hyperledger Fabric.

# Runtimes

* [SDK for Node.js](https://console.bluemix.net/catalog/starters/sdk-for-nodejs):Develop, deploy, and scale server-side JavaScript® apps with ease. The IBM SDK for Node.js™ provides enhanced performance, security, and serviceability.

# Related IBM Developer content

* [Setup Hyperledger Fabric network on IBM Blockchain Platform](https://developer.ibm.com/tutorials/quick-start-guide-for-ibm-blockchain-platform/)
* [Read about PostgreSQL DB](http://www.postgresqltutorial.com/)
* [Understand about wallets of Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.4/developapps/wallet.html)

# Related links



# Announcement

Hyperledger Fabric uses appropriate enrolment certificates while interacting with the blockchain network. Once user is enrolled, Node js application persist certificate in wallet for future usages. Fabric SDK for Node.js provides default file system wallet for storing fabric certificate. File system wallet stores user certificate in folders. At times there is a need to store certificates in external database to use the database back-up and restore mechanisms.

Fabric SDK for Node.js provides a way to store certificates in Couch DB. There is not direct provision to store enrolment certificates to Postgres database. Our [code pattern]( https://github.com/IBM/fabric-postgres-wallet) demonstrates a methodology to use Postgre SQL Database as a Fabric Certificate Wallet using Fabric SDK for Node.js. This code pattern uses IBM Blockchain Platform, Fabric SDK for Node.js and provides an option to configure Postgre DB either as a IBM Cloud service or containerized using Kubernetes.

