import React from 'react';
import PageHeader from "../common/pageHeader"

const EditGames = (props) => {
   let  iframeUrl=`https://nadav.retool.com/embedded/public/b9a1f778-e9c9-44f9-9309-37862ad3a349#teamId=${props.match.params.teamId}`;

   
    return ( 
        <div className="container pb-3 mt-2">
            <PageHeader titleText="Edit Games"/>
            <iframe  src= {iframeUrl} width="100%" height="800px"></iframe>
        </div>
     );
}
 
export default EditGames;