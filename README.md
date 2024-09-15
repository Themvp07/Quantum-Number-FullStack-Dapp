# Quantum-Number-FullStack-Dapp
DApplication fullstack for queries of quantum random numbers

## Frontend: Quantum Random Number Generator

### Description
The frontend allows to interact with a smart contract that requests random numbers from a QRNG service. Users can start and stop a counter that also monitors responses from the blockchain. Based in https://docs.api3.org/guides/qrng/qrng-remix/#to-request-a-single-random-number

### Features
1. **Start Counter:**
By pressing the "Start Counter" button, a counter starts incrementing every second.

2. **Request Random Number:**
By clicking "Request Random Number", a transaction is sent to the blockchain to request a random number from the Airnode. While waiting for the response, the request status changes to "Request Started", and when the number is received, the status changes to "Request Completed".

3. **Request Status:**
The request status is updated based on progress: "No Request", "Request Started", and "Request Completed".

## Smart Contract: QrngExample

### Description
This contract interacts with the Airnode to request quantum random numbers. It provides functionality to request a single random number or an array of numbers, which are managed and stored in the contract.

### Dependencies
- Solidity ^0.8.9
- [Airnode Protocol](https://github.com/api3dao/airnode)
- [OpenZeppelin Ownable](https://openzeppelin.com/contracts/)

### Functions
1. **setRequestParameters(address _airnode, bytes32 _endpointIdUint256, bytes32 _endpointIdUint256Array, address _sponsorWallet)**
Sets the parameters needed to make requests for random numbers.

2. **makeRequestUint256()**
Requests a random number from the Airnode.

3. **fulfillUint256(bytes32 requestId, bytes calldata data)**
Function called by the Airnode to deliver the requested random number.

4. **withdraw()**
Allows withdrawal of funds from the sponsor's wallet to the owner of the contract.
