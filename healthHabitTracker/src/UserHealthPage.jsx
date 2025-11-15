import './UserHealthPage.css'
import { useState } from 'react'
import {useEffect} from 'react'

function UserHealthPage ({userLoggedIn, setUserLoggedIn, setDisplayLogin}) {
    return (
        <>
            <h2>Hello {userLoggedIn.username}</h2>
            <button onClick={() => signOutFunction(setUserLoggedIn, setDisplayLogin)}>Sign out</button>
        </>
    );
    
}
function signOutFunction (setUserLoggedIn, setDisplayLogin) {
    setUserLoggedIn({});
    setDisplayLogin(true); // go back to login page

}
export default UserHealthPage;