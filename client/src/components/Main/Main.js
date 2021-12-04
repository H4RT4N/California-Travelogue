import React from 'react';
import Landing from '../Landing/Landing';
import Travelogue from '../Travelogue/Travelogue';

// location at "/"
function Main() {
    return ( 
        <React.Fragment>
            <Landing />
            <Travelogue />
        </React.Fragment>
     );
}

export default Main;