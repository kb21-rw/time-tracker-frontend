export default function DashboardPage() {
    const user = localStorage.getItem('user')
    const fullName = JSON.parse(user as string).fullName
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard {fullName}</p>
        </div>
    )
}
