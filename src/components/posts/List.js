import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ListPosts extends React.Component {
    constructor() {
        super()
        this.state = {
            posts : []
        }
    }

    componentDidMount() {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data
                // console.log(posts)
                this.setState({ posts })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { posts } = this.state
        return (
            posts.length ? (
                <div>
                    <h2>Total Posts - {posts.length}</h2>
                    <ul>
                    {
                        posts.map(post => {
                            return <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
                        })
                    }
                    </ul>
                </div>
            ) : <p>Loading...</p>
        )
    }
}

export default ListPosts