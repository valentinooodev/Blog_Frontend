import React, {useState, useEffect} from 'react';
import axiosInstance from '../../services/axios/axios';
import {useParams} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function Post() {
    const {slug} = useParams();
    const classes = useStyles();

    const [post, setPost] = useState({posts: []});
    const [comments, setComments] = useState({comments: []});

    useEffect(() => {
        axiosInstance.get('/post/' + slug).then((res) => {
            setPost({posts: res.data});
        });
        axiosInstance.get('/action/comment/list/' + slug).then((res) => {
            setComments({comments: res.data});
        });
    }, [setPost, setComments]);


    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <div className={classes.paper}/>
            <div className={classes.heroContent}>
                <Container fixed>
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        {post.posts.title}
                    </Typography>
                    <Typography
                        variant="i"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        {post.posts.description}
                    </Typography>
                    <ReactMarkdown
                        children={post.posts.content}
                        components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />

                </Container>
                {comments.comments.map((comment) => {
                    return (
                        <CardContent className={classes.cardContent}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                className={classes.postTitle}
                            >
                                {comment.user_name}:
                            </Typography>
                            <div className={classes.postText}>
                                <Typography color="textSecondary">
                                    {comment.content}
                                </Typography>
                            </div>

                        </CardContent>
                    );
                })}
            </div>
        </Container>
    );
}