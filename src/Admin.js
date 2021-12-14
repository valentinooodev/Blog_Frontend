import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/pages/admin/posts';
import PostLoadingComponent from './components/pages/posts/postLoading';
import axiosInstance from './components/services/axios/axios';

function Admin() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get().then((res) => {
            const allPosts = res.data.data;
            setAppState({ loading: false, posts: allPosts });
            console.log(res.data);
        });
    }, [setAppState]);

    return (
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}
export default Admin;