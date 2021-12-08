import React, {useState} from "react";
import axiosInstance from "../../axios/login";
import {useNavigate} from 'react-router-dom'
import FbLogin from 'react-facebook-login'
import FacebookLogin from '../../axios/facebookLogin'

import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, makeStyles, Container
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, avatar: {
        margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main,
    }, form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '', password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData, [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`auth/token/`, {
                username: formData.email,
                password: formData.password,
                grant_type: 'password',
                client_id: 'tNTSIUWa0wIlRNQxhtkiJfjmewfMypGz5CRqhVEj',
                client_secret: "5swFIkdjaoEJT20MHtveRDoqqn684glYVeyrqp3IkF2Dg5yEQk2RI1SitXCeZXAjdJ5gHkqmlzCi6aDa7Lu3xO0et9q6kSHVBBeIvSSn2lzZZ6JcBUNsQcMUQK5beaGy"
            })
            .then((res) => {
                console.log(res);
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                navigate('/', {replace: true});
            });
    };

    const responseFacebook = (response) => {
        FacebookLogin(response.accessToken);
    };

    const classes = useStyles();

    return (<Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>
                <FbLogin
                    appId = "447695540206503"
                    fields="name,email,picture"
                    callback={responseFacebook}
                />
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Container>);
}