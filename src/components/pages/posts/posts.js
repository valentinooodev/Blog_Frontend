import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {Badge} from "@material-ui/core";
import { Pagination } from '@mui/material';
import { GoThumbsup, GoEye, GoComment } from "react-icons/go";
import axios from "../../services/axios/axios";
import axiosInstance from "../../services/axios/axios";

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
    actionDetail:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
    },
    badge: {
        justifyContent: 'center',
        marginLeft: 25,
        marginRight: 25,

    },
    // paginationContainer: {
    //     position: 'relative'
    // },
    pagination: {
        justifyContent: 'center',
        marginTop: 20,
    }
}));

const Posts = (props) => {
    const firstPost = props.posts;
    const pages = props.pages;
    const classes = useStyles();
    const [posts, setPosts] = useState(firstPost);
    console.log(posts);
    const [page, setPage] = useState(1)
    const handlePageChange = (e, p) => {
        // setPage(p);
        console.log('here', e);
        // axiosInstance.get('/?page=' + p).then((res) => {
        //     setPosts({posts: res.data});
        // });
    };
    if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <h1>Latest Posts</h1>
                <Grid container spacing={5} alignItems="flex-end">
                    {posts.map((post) => {
                        return (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={post.id} xs={12} md={4}>
                                <Card className={classes.card} href={'post/' + post.slug}>
                                    <Link
                                        color="textPrimary"
                                        href={'post/' + post.slug}
                                        className={classes.link}
                                    >
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={post.image}
                                            title={post.title}
                                        />
                                    </Link>
                                    <div className={classes.actionDetail}>
                                        <Typography color="textSecondary">
                                            <Badge className={classes.badge} badgeContent={post.upvote_count} color="secondary">
                                                <GoThumbsup color="action" size={23} />
                                            </Badge>
                                            <Badge className={classes.badge} badgeContent={post.view_count} color="secondary">
                                                <GoEye color="action" size={23} />
                                            </Badge>
                                            <Badge className={classes.badge} badgeContent={post.comment_count} color="secondary">
                                                <GoComment color="action" size={23} />
                                            </Badge>
                                        </Typography>
                                    </div>
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
                                                {post.description.substr(0, 50)}...
                                            </Typography>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>


            </Container>
            <Container>
                <div className={classes.pagination}>
                <Pagination className={classes.pagination} count={pages} onChange={handlePageChange()} color="primary" />
                </div>
            </Container>
        </React.Fragment>
    );
};
export default Posts;
