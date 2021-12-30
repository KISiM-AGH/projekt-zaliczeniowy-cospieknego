import { ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {
    isLoggedIn: ConstrainBoolean;
    loggedInPath: string;
    children?: ReactNode;
}

export function IsUserRedirect({
    isLoggedIn,
    loggedInPath,
    component,
    children,
}: IProps) {
    return !isLoggedIn ? (
        <Route component={component}>{children}</Route>
    ) : (
        <Redirect to={{ pathname: loggedInPath }} />
    );
}

export function PrivateRoute({
    isLoggedIn,
    loggedInPath,
    component,
    children,
}: IProps) {
    return isLoggedIn ? (
        <Route component={component}>{children}</Route>
    ) : (
        <Redirect to={{ pathname: loggedInPath }} />
    );
}
