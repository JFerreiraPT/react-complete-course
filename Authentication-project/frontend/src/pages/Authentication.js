import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
  const queryParams = new URL(request.url).searchParams;
  const mode = queryParams.get('mode') || 'signup';

  if(mode !== 'login' && mode !== 'signup' ) {
    throw json({message: "invalid method"}, {status: 500});
  };

  const url = "http://localhost:8080/" + mode;


  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password")
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(authData),
  })

  if(response.status === 422 || response.status === 401) {
    return response
  }

  if(!response.ok) {
    throw json({message: "Something went wrong"}, {status: 500});
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("AUTH_TOKEN", token);

  //store expiration time for autologout
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('EXPIRATION', expiration.toISOString());

  //manage returned token
  return redirect("/");


}