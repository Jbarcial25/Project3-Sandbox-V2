import React from 'react';
import { Link } from 'react-router-dom';

const ThoughList = ({
    posts,
    title,
    showTitle = true,
    showUser =true,
}) => {
    if(!posts.lengths) {
        return <h3> No posts yet </h3>
    }

}


export default ThoughtList;
