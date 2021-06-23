import React, { Component } from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
// import "./App.css";
import CandidatesList from "./Components/CandidatesList";
import VoteForm from "./Components/VoteForm";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class App extends Component {
  state = { candidates: [], web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      console.log("Accounts App: "+accounts);
      
      // Get the contract instance.
      const networkId = await window.ethereum.networkVersion;
      console.log("Chain ID: ",networkId);
      
      const deployedNetwork = ElectionContract.networks[networkId];
      console.log("Deployed Contract Network: ",deployedNetwork,deployedNetwork.address);

      // creating contract object to interact with smart contract like a JS object
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log("Accounts: ",accounts);
    let candidatesCount = await contract.methods.candidatesCount().call();
    console.log("Candidates Count: ",candidatesCount);
    let candidatesList=[];
    for(let i=1;i<=2;i++){
      candidatesList.push(await contract.methods.candidates(i).call());
    }
    console.log("Candidates List: ",candidatesList);

    // Update state with the result.
    this.setState({ candidates:candidatesList });
  };
  
  castVote = async (obj)=>{
    const { accounts, contract } = this.state;

    console.log("casting vote initiated");
    let candidateId = Number(obj.target.value);
    console.log("id: ",candidateId);
    if(candidateId>0){
      contract.methods.vote(candidateId).send({ from: accounts[0] }).then(function(result) {
        // Wait for votes to update
        console.log(result);

      }).catch(function(err) {
        console.error(err);
      });

      console.log("casting vote completed.");
    }
  };
  
  render() {
    const {candidates,web3,accounts} = this.state
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <Jumbotron fluid>
        <Container>
          <h1>Voter Node Account: {accounts}</h1>
          <CandidatesList list={candidates} />
          <VoteForm list={candidates} onVote={this.castVote}/>
        </Container>
      </Jumbotron>
      // <Container fluid="md">
      //   <h1>Voter Node Account: {accounts}</h1>
      //   <CandidatesList list={candidates} />
      //   <VoteForm list={candidates} onVote={this.castVote}/>
      // </Container>
    );
  }
}

export default App;
