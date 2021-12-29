import { ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {
    isLoggedIn: ConstrainBoolean;
    loggedInPath: string;
    children?: ReactNode;
}

export function IsUserRedirect({ isLoggedIn, loggedInPath, children }: IProps) {
    return (
        <Route>
            {!isLoggedIn ? (
                children
            ) : (
                <Redirect to={{ pathname: loggedInPath }} />
            )}
        </Route>
    );
}

export function PrivateRoute({ isLoggedIn, loggedInPath, children }: IProps) {
    return (
        <Route>
            {isLoggedIn ? (
                children
            ) : (
                <Redirect to={{ pathname: loggedInPath }} />
            )}
        </Route>
    );
}
