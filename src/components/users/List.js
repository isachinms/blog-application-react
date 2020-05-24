import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ListUsers extends React.Component {
    _isMounted = false

    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('/users')
            .then((response) => {
                const users = response.data
                // console.log(users)
                if(this._isMounted) {
                    this.setState({ users })
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
        const { users } = this.state
        return (
            users.length ? (
                <div>
                    <h3>Total Users - {users.length} </h3>
                    <ul>
                    {
                        users.map(user => {
                            return <li key={user.id} ><Link to={`/users/${user.id}`}>{user.name}</Link></li>
                        })
                    }
                    </ul>
                </div>
            ) : <p>Loading...</p>
        )
    }
}

export default ListUsers