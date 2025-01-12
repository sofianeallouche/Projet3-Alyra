import useEth from "../../contexts/EthContext/useEth";
import React, { useState, useEffect } from "react";

function AdminComp() {
  const { state: { contract, accounts } } = useEth();
  const [addressVoter, setVoter] = useState("");
  const [addressRegistered, setRegistrationEvents] = useState([]);

  let votants=[];

  useEffect(() => {
    (async function () {

        await contract.events.VoterRegistered({fromBlock:"earliest"})
        .on('data', event => {
          votants.push({adresse: event.returnValues.voterAddress});
          setRegistrationEvents(votants);
        })          
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])
  
  useEffect(() => {
    (async function () {
      votants=[];
       let oldEvents= await contract.getPastEvents('VoterRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        oldEvents.forEach(event => {
          votants.push({adresse: event.returnValues.voterAddress});
        });
        setRegistrationEvents(votants);
    })();
  },[contract])

  const handleRegristrationTextChange = e => {
    setVoter(e.target.value);
  };

  const registerVoter = async () => {
    try {
      await contract.methods.addVoter(addressVoter).send({from: accounts[0]});
      console.log(addressVoter);
      // Dispatch an action or update state if needed
    } catch (err) {
      console.error(err);
    }
  };

  const startProposalsRegistering = async () => {
    try {
      await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
      // Dispatch an action or update state if needed
    } catch (err) {
      console.error(err);
    }
  };

  const endProposalsRegistering = async () => {
    try {
      await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
      // Dispatch an action or update state if needed
    } catch (err) {
      console.error(err);
    }
  };

  const startVotingSession = async () => {
    try {
      await contract.methods.startVotingSession().send({ from: accounts[0] });
      // Dispatch an action or update state if needed
    } catch (err) {
      console.error(err);
    }
  };

  const endVotingSession = async () => {
    try {
      await contract.methods.endVotingSession().send({ from: accounts[0] });
      // Dispatch an action or update state if needed
    } catch (err) {
      console.error(err);
    }
  };

  const tallyVotes = async () => {
    try {
      await contract.methods.tallyVotes().send({ from: accounts[0] });
      // Dispatch an action or update state if needed
    } catch (err) {
      console.error(err);
    }
  }

  return (
  <>
    <h2 class="display-5">Admin panel</h2>
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <button onClick={registerVoter}><span class="input-group-text" id="inputGroup-sizing-lg">Register Voter</span></button>
        </div>
        <input 
            type="text" 
            class="form-control" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-lg"
            placeholder="address"
            onChange={handleRegristrationTextChange}
            />
            
      {/* <button onClick={registerVoter}>Register Voter</button>
      <input
        type="text"
        placeholder="address"
        onChange={handleRegristrationTextChange}
      /><br></br> */}
      </div>
      <br/>
        <button type="button" class="btn btn-secondary btn-lg" onClick={startProposalsRegistering}>Start Proposals Registration</button><br/><br/>
        <button type="button" class="btn btn-secondary btn-lg"  onClick={endProposalsRegistering}>End Proposals Registration</button><br/><br/>
        <button type="button" class="btn btn-secondary btn-lg"  onClick={startVotingSession}>Start Voting Session</button><br/><br/>
        <button type="button" class="btn btn-secondary btn-lg"  onClick={endVotingSession}>End Voting Session</button><br/><br/>
        <button type="button" class="btn btn-secondary btn-lg"  onClick={tallyVotes}>Tally Votes</button><br/><br/>
        <h3 class="display-5">Adresses enregistrées :</h3>
        <ul>
          {addressRegistered.map((votant) => (
          <li key={votant.adresse}>{votant.adresse}</li>
        ))}
        </ul>
        
      
  </>
  )
};


export default AdminComp;
