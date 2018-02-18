import React, { Component } from 'react';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import { Route, Link } from 'react-router-dom'
import './Blog.css';

class Blog extends Component {
    render () {
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new-post">New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                <Route exact path="/" component={Posts} />
                <Route exact path="/new-post" component={NewPost} />
            </div>
        );
    }
}

export default Blog;