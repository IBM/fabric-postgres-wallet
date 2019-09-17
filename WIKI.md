# Short Title

Use a PostgreSQL database as a Hyperledger Fabric wallet using Fabric Node SDK



# Long Title

Setup containerized PostgreSQL database using Kubernetes and configure it as Hyperledger Fabric Wallet


# Author


* [Dipeeka Patil](https://www.linkedin.com/in/dipeekapatil) 
* [Shikha Maheshwari](https://www.linkedin.com/in/shikha-maheshwari) 


# URLs

### Github repo

> "Get the code": 
* https://github.com/IBM/fabric-postgres-wallet

### Other URLs

* Demo URL

NA

# Summary

Hyperledger Fabric uses appropriate enrollment certificates while interacting with the blockchain network. The Hyperledger Fabric SDK for Node.js provides APIs to interact with a Hyperledger Fabric blockchain. The Fabric Node SDK provides a default file system wallet for storing Fabric certificates. The file system wallet stores user certificate in folders. This approach does not provide the required security or flexibility, and it also affects scalability. Explore this pattern further to understand how to use a PostgreSQL database as a Fabric wallet.

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
* Configure and deploy a containerized PostgreSQL database using Kubernetes.
* Deploy the client application using Fabric SDK for Node.js through which user can communicate with blockchain network.
* To communicate with the blockchain network, users need to register and enroll with the network which will generate the enrollment certificates and store them in a PostgreSQL database. These certificates will be used for further communication with the network.


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

* [Postgre SQL DB](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

* [IBM Cloud Kubernetes Service](https://cloud.ibm.com/containers-kubernetes/catalog/cluster): IBM Kubernetes Service enables the orchestration of intelligent scheduling, self-healing, and horizontal scaling.

* [IBM Blockchain Platform](https://cloud.ibm.com/catalog/services/blockchain-platform): IBM Blockchain Platform is an enterprise-ready blockchain application development platform powered by Hyperledger Fabric.

# Runtimes

* [SDK for Node.js](https://console.bluemix.net/catalog/starters/sdk-for-nodejs):Develop, deploy, and scale server-side JavaScript® apps with ease. The IBM SDK for Node.js™ provides enhanced performance, security, and serviceability.

# Related IBM Developer content

* [Setup Hyperledger Fabric network on IBM Blockchain Platform](https://developer.ibm.com/tutorials/quick-start-guide-for-ibm-blockchain-platform/)
* [Read about PostgreSQL DB](http://www.postgresqltutorial.com/)
* [Understand about wallets of Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.4/developapps/wallet.html)

# Related links

* [Fabric Node SDK](https://fabric-sdk-node.github.io/release-1.4/module-fabric-network.html)
* [PostgreSQL](https://www.postgresql.org/)
* [Hyperledger fabric network wallet](https://hyperledger-fabric.readthedocs.io/en/release-1.4/developapps/wallet.html)
* [PostgreSQL Deploy on kubernetes](https://severalnines.com/blog/using-kubernetes-deploy-postgresql)


# Announcement

Hyperledger Fabric uses appropriate enrolment certificates while interacting with the blockchain network. Once user is enrolled, Node js application persist certificate in wallet for future usages. Fabric SDK for Node.js provides default file system wallet for storing fabric certificate. File system wallet stores user certificate in folders. At times there is a need to store certificates in external database to use the database back-up and restore mechanisms.

Fabric SDK for Node.js provides a way to store certificates in Couch DB. There is not direct provision to store enrolment certificates to Postgres database. Our [code pattern]( https://github.com/IBM/fabric-postgres-wallet) demonstrates a methodology to use Postgre SQL Database as a Fabric Certificate Wallet using Fabric SDK for Node.js. This code pattern uses IBM Blockchain Platform, Fabric SDK for Node.js and provides an option to configure Postgre DB either as a IBM Cloud service or containerized using Kubernetes.

