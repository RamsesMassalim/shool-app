export default function Profile({ user }) {
    return (
        <div className="profile">
            <h1>Name: {user.userName}</h1><br />
            <div>First name: {user.firstName}</div>
            <div>Last name: {user.lastName}</div>
            <div>Date of Birth: {user.dateOfBirth}</div>
        </div>
    )
}
