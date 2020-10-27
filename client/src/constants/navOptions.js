export const navOptions = {
  auth: [
    { route: '/', name: 'Home' },
    // { route: '/favorites', name: 'My Favorites' },
    { route: '/teams', name: 'View Teams' },
    { route: '/', name: 'Sign Out' },
  ],
  noAuth: [
    { route: '/', name: 'Home' },
    { route: '/teams', name: 'View Teams' },
    { route: '/register', name: 'Sign Up' },
    { route: '/login', name: 'Sign In' },
  ]
};