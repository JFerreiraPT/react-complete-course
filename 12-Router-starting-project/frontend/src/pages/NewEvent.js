import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";


const NewEvent = () => {
    return <>
        <EventForm method='POST' />
    </>

};

export default NewEvent;

