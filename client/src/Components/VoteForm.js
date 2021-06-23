import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const VoteForm = ({list,onVote})=>{
    console.log("Voteform: ",list);
    console.log("onVote:",onVote);
    const onSubmit = (e) => {
        e.preventDefault();
        onVote(e);
    };
    return (
        <Form onSubmit={onSubmit}>
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