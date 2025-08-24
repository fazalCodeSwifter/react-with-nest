import { useAllFriends } from "../../hooks/useAllFriends"

const ShowFriends = ({ getCurrentId } : any ) => {

    const { loading, error, allFriends } = useAllFriends()

    

    if (loading) return <h1>LOADING ....</h1>
    if (error) return <h1>ERROR FOUND! {error}</h1>
    return (
        <div className="h-full overflow-scroll">
            {
                !!allFriends && allFriends.map((friend: any, i: number) => (
                    <div onClick={() => { getCurrentId(friend.userId); localStorage.setItem("currentUser:key", friend.userId)}} key={i} className="p-2 my-5 cursor-pointer bg-base-300/70 w-11/12 mx-auto flex items-center justify-around rounded ">
                        <div className="avatar avatar-online">
                            <div className="w-18 h-18 rounded-full bg-purple-500">
                                <h1 className="uppercase text-3xl text-center h-full flex justify-center items-center"><span>{friend.username.slice(0,2)}</span></h1>
                            </div>
                        </div>
                        <h1>{friend.email}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowFriends