import Profile from "./Profile"

export default function UserCard({ user, btnFunc, btnName }) {
    return (
        <div className="profile">
            <Profile user={user} />
            <button className="btnstyle" onClick={() => btnFunc(user.id)}>{btnName}</button>
        </div>
    )
}
