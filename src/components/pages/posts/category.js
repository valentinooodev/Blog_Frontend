import React, {useState, useEffect} from "react";
import axiosInstance from "../../services/axios/axios";

import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardMedia, Grid, Typography, Container, Link} from "@material-ui/core";
import {useParams} from "react-router-dom";

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
    const {slug} = useParams();
    const [appState, setAppState] = useState({
        posts: [],
    });

    useEffect(() => {
        axiosInstance.get( 'category/' + slug).then((res) => {
            const allPosts = res.data;
            setAppState({posts: allPosts});
            console.log(res.data);
        });
    }, [setAppState]);
    if (!appState.posts || appState.posts.length === 0) return <p>Can not find any posts, sorry</p>;
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
                                            image={post.image}
                                            title={post.title}
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