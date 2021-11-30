import React from "react";
import {AppBar} from "@material-ui/core";
import {Toolbar} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
}));

function Header() {
    const classes = useStyle();
    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar
                position="static"
                color="white"
                elevation={0}
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant="h4" color="inherit" noWrap>
                        Pythonista
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header

