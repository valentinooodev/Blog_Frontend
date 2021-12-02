import React, {useState, useEffect} from "react";
import axiosInstance from "../axios";

import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardMedia, Grid, Typography, Container, Link} from "@material-ui/core";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
}));

const Search = () => {
    const classes = useStyles();
    const search = 'search';
    const [appState, setAppState] = useState({
        search: '',
        posts: [],
    });

    useEffect(() => {
        axiosInstance.get(search + '/' + window.location.search).then((res) => {
            const allPosts = res.data;
            setAppState({posts: allPosts});
            console.log(res.data);
        });
    }, [setAppState]);

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {appState.posts.map((post) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={post.id} xs={12} md={4}>
                                <Card className={classes.card}>
                                    <Link
                                        color="textPrimary"
                                        href={'/post/' + post.slug}
                                        className={classes.link}
                                    >
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://source.unsplash.com/random"
                                            title="Image title"
                                        />
                                    </Link>
                                    <CardContent className={classes.cardContent}>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className={classes.postTitle}
                                        >
                                            {post.title.substr(0, 50)}...
                                        </Typography>
                                        <div className={classes.postText}>
                                            <Typography color="textSecondary">
                                                {post.description.substr(0, 40)}...
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default Search;