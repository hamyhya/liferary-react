export default function Token() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token && token.token) {
    return { 'Authorization':'Bearer ' + token.token, 'Content-Type' : 'application/x-www-form-urlencoded' };
  } else {
    return {};
  }
}