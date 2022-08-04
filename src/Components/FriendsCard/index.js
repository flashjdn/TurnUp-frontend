import "./index.css";

export const FriendsCard = () => {
    return (
        <>
            <div
                className="friend-card-one">
                {" "}
                <div className="friend-name-box">
                </div>
                <div className="friend-card-one-text">

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GNLQ5Rq4_uCHZY7yxKiYXxjkkhro_aIbGQ&usqp=CAU" className="friend-pic" alt="friend-img">
                    </img> <p className="friend-name"> Friend Name</p>
                </div>
            </div>
            <div className="right-friend-section">
            </div>
        </>
    )
}