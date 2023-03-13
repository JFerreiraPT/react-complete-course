import { useCallback, useState } from "react";

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState(null);

    const get = useCallback( async(getRequest, functionHandler) => {
        setIsLoading(true);
        setError(null);
        
        
        try {
            const response = await fetch(getRequest.url);
 
            if(!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            functionHandler(data);
            setIsLoading(false);
            setError(null);            

        } catch(err) {
            console.log(err);
            setError(err.message || 'Something went wrong!');
        }


    }, []);

    const post = useCallback( async(postRequest, functionHandler) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(postRequest.url, {
                method: 'POST',
                body: JSON.stringify(postRequest.body),
                headers: postRequest.headers,
            });
            
            if(!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            functionHandler(data);            

        } catch(err) {
            setError(err.message || 'Something went wrong!');
        }

    }, []);

    return {
        isLoading,
        error,
        get,
        post
    }

}

export default useFetch;