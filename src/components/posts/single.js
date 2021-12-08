import React, {useState, useEffect} from 'react';
import axiosInstance from '../../axios';
import {useParams} from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


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

    const [data, setData] = useState({posts: []});

    useEffect(() => {
        axiosInstance.get('/post/' + slug).then((res) => {
            setData({posts: res.data});
            console.log(res.data);
        });
    }, [setData]);

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
                        {data.posts.title}
                    </Typography>
                    <Typography
                        variant="i"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        {data.posts.description}
                    </Typography>
                    {/*<Typography*/}
                    {/*    variant="h7"*/}
                    {/*    align="left"*/}
                    {/*    color="textSecondary"*/}
                    {/*    paragraph*/}
                    {/*>*/}
                    {/*    {data.posts.content}*/}
                    {/*</Typography>*/}
                    <ReactMarkdown
                        children={data.posts.content}
                        components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        // style={docco}
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
                    />,
                    document.body

                </Container>
            </div>
        </Container>
    );
}