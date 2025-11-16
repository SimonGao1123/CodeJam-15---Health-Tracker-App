import './UserHealthPage.css'
import { useState } from 'react'
import {useEffect} from 'react'

function UserHealthPage ({userLoggedIn, setUserLoggedIn, setDisplayLogin}) {
    const {weight, sex, age, height} = userLoggedIn;

    // const [aiMessage, setAIMessage] = useState("");
    const [updateHeight, setUpdateHeight] = useState(height);
    const [updateWeight, setUpdateWeight] = useState(weight);
    const [updateSex, setUpdateSex] = useState(sex);
    const [updateAge, setUpdateAge] = useState(age);

    const [menuShown, setMenuShown] = useState(!sex);

    console.log("Height: " + updateHeight + ", Weight" + updateWeight + ", Sex" + updateSex + ", Age" + updateAge);
    // function askAI () {
    //     fetch("http://localhost:3000/api/chat", {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({message: aiMessage})
    //     }).then(async response => {
    //         const data = await response.json();
    //         console.log(data.reply);
    //     }).catch(error => {
    //         console.log("Error in receiving gemini response: " + error);
    //     })
    // }


    return (
        <div className="user-health-page">

                {menuShown ?
                            <AttributeForm 
                            updateHeight={updateHeight}
                            setUpdateHeight={setUpdateHeight}
                            updateWeight={updateWeight}
                            setUpdateWeight={setUpdateWeight}
                            updateSex={updateSex}
                            setUpdateSex={setUpdateSex}
                            updateAge={updateAge}
                            setUpdateAge={setUpdateAge}
                            userLoggedIn={userLoggedIn}
                            
                            /> : <></>}
                        

            <div className="main-boxes">

                <div className='box1'>

                    <div className='attributes'>
                        <div className='head'>
                            <h2>Hello {userLoggedIn.username}</h2>
                        </div>
                        
                        <div className='master-buttons'>
                            <button onClick={() => setMenuShown(!menuShown)}>Menu</button>
                            <button onClick={() => signOutFunction(setUserLoggedIn, setDisplayLogin)}>Sign out</button>
                        </div>
                    </div>

                </div>
                

                <div className='box2'>
                    
                </div>

                <div className='box3'>

                </div>


            </div>

        </div>
    );
    
}
function AttributeForm ({updateHeight, setUpdateHeight, updateWeight, setUpdateWeight, updateSex, setUpdateSex, updateAge, setUpdateAge,userLoggedIn}) {
    function handleUpdateAttributes (e) {
        e.preventDefault();

        fetch("http://localhost:3000/updateUser", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id:userLoggedIn.id, weight:updateWeight, sex:updateSex, height:updateHeight, age:updateAge})
        }).catch(error => {
            console.log("Error in adding user information: " + error);
        })
    }
    return (            
    <div className='overlay-box'>
            <form onSubmit={handleUpdateAttributes}>
                <h3>Physical Attributes:</h3>
                
                <label for="updateheight">Height: </label>
                <input type="text" id="updateheight" value={updateHeight} onChange={(e) => {if(!isNaN(e.target.value))setUpdateHeight(Number(e.target.value))}}/>
                
                <label for="updateweight">Weight: </label>
                <input type="text" id="updateweight" value={updateWeight} onChange={(e) => {if(!isNaN(e.target.value))setUpdateWeight(Number(e.target.value))}}/>
                
                <label for="updatesex">Gender: </label>
                <select id="updatesex" value={updateSex} onChange={(e)=>setUpdateSex(e.target.value)}>
                    <option selected disabled hidden value="">Select Option:</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                
                <label for="updateage">Age: </label>
                <input type="number" id="updateage" value={updateAge} onChange={(e) => {if(!isNaN(e.target.value) || e.target.value < 0)setUpdateAge(Number(e.target.value))}}/>
                
                <button type="submit">Update</button>
            </form>
    </div>
        );
}

function signOutFunction (setUserLoggedIn, setDisplayLogin) {
    setUserLoggedIn({});
    setDisplayLogin(true); // go back to login page
}
export default UserHealthPage;