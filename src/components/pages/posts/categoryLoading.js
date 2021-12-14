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
        pages: 0
    });

    useEffect(() => {
        axiosInstance.get('/').then((res) => {
            const allPosts = res.data.data;
            const numofPage = res.data.pagination.total_pages;
            setAppState({ loading: false, posts: allPosts, pages: numofPage});
        });
    }, [setAppState]);
    return (
        <div className="App">

            <PostLoading isLoading={appState.loading} posts={appState.posts} pages={appState.pages} />
        </div>
    );
}
export default App;