import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ShowPost extends React.Component {
    _isMounted = false

    constructor() {
        super()
        this.state = {
            post: {},
            user: {},
            comments: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this._isMounted = true
        const postId = this.props.match.params.id
        axios.get(`/posts/${postId}`)
            .then((response) => {
                const post = response.data
                const userURL = `/users/${post.userId}`
                const commentsURL = `posts/${postId}/comments`

                Promise.all([ axios.get(userURL), axios.get(commentsURL) ])
                    .then((response) => {
                        const [ user, comments ] = response
                        if(this._isMounted) {
                            this.setState({ post, user: user.data, comments: comments.data, isLoading: false })
                        }
                    })
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
        const { post, user, comments, isLoading } = this.state
        console.log(isLoading)
        return (
            isLoading ? <p>Loading...</p> : (
                <div>
                    <p><strong>Username : </strong>{user.name} </p>
                    <p><strong>Title : </strong>{post.title} </p>
                    <p><strong>Body : </strong>{post.body}</p><hr/>
                    <strong>Comments : </strong>
                    <ul>
                    {
                        comments.map(comment => {
                            return <li key={comment.id} >{comment.body}</li>
                        })
                    }
                    </ul>
                    <Link to={`/users/${user.id}`} >More posts by {user.name}</Link>
                </div>
            )
        )
    }
}

export default ShowPost