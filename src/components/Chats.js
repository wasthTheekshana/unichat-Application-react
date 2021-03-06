import React, { useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from "react-chat-engine";
import { auth } from "./firebase";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


const Chats = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    // user data coming here
    const { user } = useAuth();

    console.log(user);

    const handleLogout = async () => {
     await auth.signOut();
     history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); //any format can convert to binary
        return new File([data], "userPhoto.jpg",{type: 'image/jpeg'})
    }
    useEffect(() =>{
        if (!user){
            history.push('/');
            return;
        }
        //get already user
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id" : process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
            .then(() =>{
                setLoading(false);
            })
            .catch(() => {
                //already user not exits we create it
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);
                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar',avatar,avatar.name);
                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            { headers: { "private-key": process .env.REACT_APP_CHAT_ENGINE_KEY }}
                            )
                            .then(() => setLoading(false))
                            .catch((err) => console.log(err))
                    })
            })
    },[user,history])
    if (!user || loading ) return 'Loading....!';
        return (
            <div className='chats-page'>
                <div className="nav-bar">
                    <div className="logo-tab">
                        Uni Chat
                    </div>
                    <div onClick={handleLogout} className="logout-tab">
                        Log Out
                    </div>
                </div>
                <ChatEngine height="calc(100vh - 66px)"
                            projectID= {process.env.REACT_APP_CHAT_ENGINE_ID}
                            userName={user.email}
                            userSecret={user.uid}
                           />
            </div>
        );

}

export default Chats;