import React from 'react';
import {Spinner} from "react-bootstrap";

function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <Spinner animation="border" />
        );
    };
}
export default PostLoading;