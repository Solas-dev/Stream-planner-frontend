export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    //for non node.js backend
     // return { Authorization: 'Bearer ' + user.accessToken };
    //for node.js backend
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
