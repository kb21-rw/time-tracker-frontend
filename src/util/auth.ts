export function saveToken(token: string) {
    const decoded = JSON.parse(atob(token.split('.')[1]))
    const expiresAt = decoded.exp * 1000
    localStorage.setItem('token', token)
    localStorage.setItem('token_expiry', expiresAt.toString())
    return expiresAt
}

export function logoutUser() {
    localStorage.clear()
    window.location.href = '/login'
}
