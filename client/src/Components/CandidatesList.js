import React from "react";
import Candidate from "./Candidate";

const CandidatesList = ({list})=>{
    // console.log(list);
    return (
        <div className="candidate-list-container">
            <tbody className="candidate-info-table">    
                {
                    list.map(candidate => (
                        <Candidate id = {candidate[0]} name={candidate[1]} voteCount={candidate[2]}/>            
                    ))
                }
            </tbody>
        </div>
    );
};

export default CandidatesList;