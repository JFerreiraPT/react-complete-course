import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';


//we cant use Form because this will be rendered on multiple components
//the form triggers a route transition, in other words, if we trigger action from Form
//we will be redirected to the page where the action is defined...
//with fetcher we dont trasit to other route
function NewsletterSignup() {
    const fetcher = useFetcher();
    const {data, state} = fetcher;

    //we can have access to status and other informations
    //fetcher.state

    useEffect(() => {
        //this means, if the sending was terminated
        if(state === 'idle' && data && data.message) {
            window.alert(data.message);

        }
    }, [data, state])

  return (
    <fetcher.Form action='/newsletter' method="post" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;