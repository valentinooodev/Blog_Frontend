import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/pages/posts/posts';
import PostLoadingComponent from './components/pages/posts/postLoading';
import axiosInstance from './components/services/axios/axios';

function App() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get('/search/').then((res) => {
            const allPosts = res.data;
            setAppState({ loading: false, posts: allPosts });
            console.log(res.data);
        });
    }, [setAppState]);
    return (
        <div className="App">

            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}
export default App;