import React from 'react'
import { Link } from 'react-router-dom'
import './PostNav.scss'

const PostNav = props => {
    return (
        <div className="post-nav">
            <Link to="/new-post">New Post</Link>
            <Link to="/sort">Sort by</Link>
        </div>
    )
}

export default PostNav;