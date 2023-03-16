import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('EXPIRATION');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();

    return expirationDate.getTime() - now.getTime 


}

export function getAuthToken() {
    const token = localStorage.getItem('AUTH_TOKEN');

    if(!token) return null;

    if(getTokenDuration() < 0) {
        return "EXPIRED";
    }

    return token;
};

export function loader() {
    return getAuthToken();

}

export function checkAuthLoader() {
    const token = getAuthToken();

    if(!token) {
        return redirect('/auth');
    }

}
