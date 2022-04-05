export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn || !$auth.user.role.includes('ROLE_ADMIN')) {
    return redirect('/')
  }
}
