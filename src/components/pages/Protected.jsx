function Protected({children}) {
    const token = sessionStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}


export default Protected;