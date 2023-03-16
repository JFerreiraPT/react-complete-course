import { Suspense } from "react";
import { json, useLoaderData, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  //this data is returned by defer now, and its a promise
  const { events } = useLoaderData();

  console.log("events", events);

  // if(data.isError) {
  //   return <p>{data.message}</p>
  // }

  //const fetchedEvents = data.events;

  //return <>{<EventsList events={fetchedEvents} />}</>;

  //this Wait will resolve the promise
  //we resolved it will execute the data which is inside Await component
  //the suspense component from react is used to show something while Data is arriving
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //return { isError: true, message: 'Could not fetch events.'};
    // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {status: 500});
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    //return response;
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  //to use defer we should have a promise
  return defer({
    //execute loadEvents and store promise on events
    events: loadEvents(),
  });

  // const response = await fetch("http://localhost:8080/events");

  // if (!response.ok) {
  //   //return { isError: true, message: 'Could not fetch events.'};
  //   // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {status: 500});
  //   throw json({message: 'Could not fetch events.'}, {status: 500});
  // } else {
  //   return response;
  // }
}
