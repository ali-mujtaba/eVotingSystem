import React from "react";

const Candidate = ({id, name, voteCount})=>{
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{voteCount}</td>
        </tr>
    );
};

export default Candidate;