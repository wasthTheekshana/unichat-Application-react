import React from 'react';
import { GoogleOutlined, FacebookOutlined} from "@ant-design/icons";
import "firebase/app";
import { auth } from "./firebase";
import * as firebase from "firebase";

const Login = () => {
    return(
        <div id='login-page'>
            <div id='login-card'>
                <h2>Welcome to unichat</h2>
                <div className="login-button google"
                onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined/> Sign with google
                </div>
                <br/><br/>
                <div className="login-button google"
                     onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined/> Sign with Facebook
                </div>
            </div>
        </div>
    );
}

export default Login;