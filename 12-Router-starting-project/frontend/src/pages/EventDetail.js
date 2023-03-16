import { Suspense } from "react";
import {
  useParams,
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetail = () => {
  // const params = useParams();

  // const data = useRouteLoaderData('event-detail');

  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading Event...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading Events...</p>}>>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetail;

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

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch event" }, { status: 500 });
  }

  const resData = await response.json();
  return resData.event;
}

export async function loader({ request, params }) {
  const id = params.id;

  return defer({
    //with await on just one price of data w emake sure component is not rendered until
    //event is loaded!!
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.id;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }

  return redirect("/events");
}
