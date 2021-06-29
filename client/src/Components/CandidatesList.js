import React from "react";
import Table from 'react-bootstrap/Table';
import Candidate from "./Candidate";
import Container from "react-bootstrap/Container";
const CandidatesList = ({list})=>{
    // console.log(list);
    return (
        <Container fluid style={{display:"grid", textAlign:"center"}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Candidate Name</th>
                    <th>Votes</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:"center"}}>
                    {
                        list.map(candidate => (
                            <Candidate id = {candidate[0]} name={candidate[1]} voteCount={candidate[2]}/>            
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default CandidatesList;