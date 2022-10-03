import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
    const [waiting, setWaiting] = useState("")
    var delayInMilliseconds = 5000;

    useEffect(() => {
        let isMounted = true;
        setTimeout(function() {
            if (isMounted) setWaiting(<p>Elon Musk probably tweeted about Dogecoin again... Try reloading the page!</p>)
        }, delayInMilliseconds);
        return () => { isMounted = false };
      }, []);

    return(
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>

            <p>Loading...</p>
            {waiting}
        </>
    )
}