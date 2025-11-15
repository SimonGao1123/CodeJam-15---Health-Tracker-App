import './UserHealthPage.css'
import { useState } from 'react'
import {useEffect} from 'react'

function UserHealthPage ({userLoggedIn, setUserLoggedIn, setDisplayLogin}) {
    const [aiMessage, setAIMessage] = useState("");
    const [updateHeight, setUpdateHeight] = useState("");
    const [updateWeight, setUpdateWeight] = useState("");
    function askAI () {
        fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: aiMessage})
        }).then(async response => {
            const data = await response.json();
            console.log(data.reply);
        }).catch(error => {
            console.log("Error in receiving gemini response: " + error);
        })
    }
    return (
        <>
            <h2>Hello {userLoggedIn.username}</h2>

            
            <input type="text" value={aiMessage} onChange={(e) => setAIMessage(e.target.value)}/>
            <button onClick={() => askAI()}>Ask AI</button>

            <button onClick={() => signOutFunction(setUserLoggedIn, setDisplayLogin)}>Sign out</button>

            {/* <button onClick={() => openMenu()}>Update Physical Attributes</button> */}

            {/* <form onSubmit={handleAttributesSubmit}>
                <h3>Physical Attributes:</h3>
                <label for="updateheight">Height: </label>
                <input type="text" id="updateheight" value={updateheight} onChange={(e) => setUpdateHeight(e.target.value)}/>
                <label for="updateweight">Weight: </label>
                <input type="text" id="updateweight" value={updateweight} onChange={(e) => setUpdateWeight(e.target.value)}/>
                <button type="submit">Update</button>
            </form> */}

        </>
    );
    
}


function signOutFunction (setUserLoggedIn, setDisplayLogin) {
    setUserLoggedIn({});
    setDisplayLogin(true); // go back to login page
}
export default UserHealthPage;