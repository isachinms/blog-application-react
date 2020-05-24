import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import Home from "./components/static/Home"
import ListUsers from "./components/users/List"
import ShowUser from "./components/users/Show"
import ListPosts from "./components/posts/List"
import ShowPost from "./components/posts/Show"

function App() {
    return (
        <BrowserRouter>
            <div>
                <h1>Blog Application</h1>
                <Link to="/" >Home</Link> | 
                <Link to="/users" >Users</Link> | 
                <Link to="/posts" >Posts</Link>

                <Route path="/" component={Home} exact={true} />
                <Route path="/users" component={ListUsers} exact={true} />
                <Route path="/users/:id" component={ShowUser} />
                <Route path="/posts" component={ListPosts} exact={true} />
                <Route path="/posts/:id" component={ShowPost} />
            </div>
        </BrowserRouter>
    )
}

export default App