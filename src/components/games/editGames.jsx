import React from 'react';
import PageHeader from "../common/pageHeader"

const EditGames = (props) => {
   let  iframeUrl=`https://nadav.retool.com/embedded/public/b9a1f778-e9c9-44f9-9309-37862ad3a349#teamId=${props.match.params.teamId}`;
   
    return ( 
        <div className="container pb-3">
            <PageHeader titleText="Edit Games"/>
            <p className='text-white'>In this section you can edit, update and delete games and games details.</p>
            <ul className='text-white'>
                <li>Only team managers can edit games.</li>
                <li>when you edit or delete a game, this will not effects details on the relevant Head to Head game (who 
                    will not be updated automatically).
                    This will be fixed soon.
                </li>
            </ul>
            <iframe  title="edit game"src= {iframeUrl} width="100%" height="800px"></iframe>
        </div>
     );
}
 
export default EditGames;