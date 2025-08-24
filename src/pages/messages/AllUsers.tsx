import { useAllUsers } from "../../hooks/useAllUsers"



const AllUsers = () => {

    const { loading, error, allUsers } = useAllUsers()



    if (loading) return <h1>LOADING ....</h1>
    if (error) return <h1>ERROR FOUND! {error}</h1>

    return (
        <div>
            {
                !!allUsers && allUsers.map((user: any, i: number) => (
                    <div key={i} className="card w-full bg-base-300 card-sx shadow-sm my-2">
                        <div className="card-body">
                            <h1 className="card-title">{user?.username}</h1>
                            <p className="fazal@gmail.com">{user?.email}</p>
                            <div className="justify-end card-actions">
                                <button
                                    className={`btn ${user.isFollowing ? 'btn-error' : 'btn-primary'}`}
                                    // onClick={() => handleFollowToggle(user.id)}
                                >
                                    {user.isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AllUsers