import React from "react";

import "./css/login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider).then((result) => {
                console.log(result.user);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((e) => alert(e.message))
    };
    return <div className="login">
        <div className="login__container">
            <img src="data:image/png;base64,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" alt="" />
            <div className="login__text">
                <h1>SIGN IN TO WHATSAPP CLONE</h1>
            </div>
            <button type='submit' onClick={signIn}>
                SIGN IN WITH GOOGLE
          </button>
            <p>This clone is made for learning purpose only.</p>
        </div>

    </div>;
}
export default Login;
