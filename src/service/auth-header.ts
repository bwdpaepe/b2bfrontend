
export default function authHeader() {
  const tokenStr = localStorage.getItem("Token");

  //console.log("token", tokenStr);

  if (tokenStr) {
    return { Authorization: "Bearer " + tokenStr };
  } else {
    return { Authorization: "" };
  }
}
