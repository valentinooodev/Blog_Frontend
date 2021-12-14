import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const facebookLogin = (accesstoken) => {
    console.log(accesstoken);
    axios
        .post('http://13.214.199.49:8000/auth/convert-token', {
            token: accesstoken,
            backend: 'facebook',
            grant_type: 'convert_token',
            client_id: 'tNTSIUWa0wIlRNQxhtkiJfjmewfMypGz5CRqhVEj',
            client_secret:
                '5swFIkdjaoEJT20MHtveRDoqqn684glYVeyrqp3IkF2Dg5yEQk2RI1SitXCeZXAjdJ5gHkqmlzCi6aDa7Lu3xO0et9q6kSHVBBeIvSSn2lzZZ6JcBUNsQcMUQK5beaGy',
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
        });
};

export default facebookLogin;