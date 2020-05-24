import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ListPosts extends React.Component {
    _isMounted = false

    constructor() {
        super()
        this.state = {
            posts : []
        }
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('/posts')
            .then((response) => {
                const posts = response.data
                // console.log(posts)
                if(this._isMounted) {
                    this.setState({ posts })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        this._isMounted = false
        console.log('component is unmounting')
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