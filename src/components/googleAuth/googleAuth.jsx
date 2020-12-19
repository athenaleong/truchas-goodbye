
import axios from 'axios';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

import config from '../../config';

function SignInButton(props) {

    const [accessToken, setAccessToken] = useState(null);

    const onSignIn = (response) => {
        console.log(response.accessToken);
        axios.get(`http://localhost:5555/getAlbumContent?token=${response.accessToken}`).then(res => {console.log(res)})
    }


    return (
        <GoogleLogin
            clientId={config.oAuthClientID}
            buttonText='Login'
            onSuccess={onSignIn}
            onFailure={onSignIn}
            cookiePolicy={'single_host_origin'}
            scope={config.scopes}
        />
    )
}

export default SignInButton;