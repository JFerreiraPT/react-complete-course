// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// DONE
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// DONE
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// DONE
// 4. Add properly working links to the MainNavigation
// DONE
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// DONE
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// DONE
// 7. Output the ID of the selected event on the EventDetailPage
// DONE
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
// DONE
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction 
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader} from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as submitAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //errors will bubble up, even if error occurs on EventsPage this is the component will handle it
    //We can define error handlers for below components, in that case it will stop propagation and this one will not be triggered
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          //loader is a function that runs when we are about to visit this page
          //so it will execute before the page is rendered
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":id",
            //this id will be used to get data from this specific loader!!
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage />, action: deleteEventAction},
              { path: "edit", element: <EditEventPage />, action: submitAction },
            ],
          },
          { path: "new", element: <NewEventPage />, action: submitAction },
          
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
