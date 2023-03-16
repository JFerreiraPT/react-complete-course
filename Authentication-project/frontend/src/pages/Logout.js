import { redirect } from "react-router-dom";

export function action() {
    localStorage.setItem('AUTH_TOKEN', "");
    localStorage.setItem('EXPIRATION', "");
    return redirect('/');
}