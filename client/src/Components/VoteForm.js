import React from "react";
import Form from 'react-bootstrap/Form';

const VoteForm = ({list,onVote})=>{
    console.log("Voteform: ",list);
    console.log("onVote:",onVote);
    return (
        <Form>
            <Form.Group controlId="candidateSelect">
                <Form.Label> Choose a candidate </Form.Label>
                <Form.Control as="select" onChange={onVote}>
                    <option value="0"> Select a candidate </option>
                    {
                        list.map(candidate => (
                            <option value={candidate.id}> {candidate.name} </option>            
                        ))
                
                    }
                </Form.Control>
            </Form.Group>      
        </Form>

    );
};

export default VoteForm;