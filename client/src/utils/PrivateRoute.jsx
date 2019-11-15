//importing
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//The PrivateRoute

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route
    {...rest}
    render={props =>
        localStorage.getItem('token') ?(
            <Component {...props} />
        ) : (
            <Redirect to='/login' />
        )
    }
    />
}


// export
export default PrivateRoute
