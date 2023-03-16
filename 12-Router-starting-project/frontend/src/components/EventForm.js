import { Form, useNavigate, useNavigation, useActionData, redirect, json } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  //gives access to data returned by actions !== loader
  const data = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
          {Object.values(data.errors).map((err) => 
          <li key={err}>{err}</li>
          )}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" disabled={isSubmitting} onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({request, params}) {
  //the request olds the form data!!
  //we can get the fields  by its name data.get('title')
  
  const data = await request.formData();

  const method = request.method;

  const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description')
  };

  let url = 'http://localhost:8080/events';

  if(method === 'PATCH') {
    url += `/${params.id}`;
  }


  
  const response = await fetch(url, {
      method: method,
      body: JSON.stringify(eventData),
      headers: {
          'Content-Type': 'application/json'
      }

  });

  if(response.status === 422) {
      return response;
  }

  if(!response.ok) {
      throw json({message: "Could not send data"}, {status: 500});
  }
  return redirect('/events');

};