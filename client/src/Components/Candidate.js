import React from "react";

const Candidate = ({id, name, voteCount})=>{
    return (
        <tr className="candidate-info"><th> {id} </th><td> {name} </td><td> {voteCount} </td></tr>
    );
};

export default Candidate;