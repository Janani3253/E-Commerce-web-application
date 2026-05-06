export function decodeToken(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  const decodedUser = decodeToken(token) || {};

  try {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    return { ...decodedUser, ...storedUser };
  } catch (err) {
    console.error("Failed to read stored user:", err);
    return decodedUser;
  }
}

export function isCurrentUserAdmin() {
  const user = getCurrentUser();
  return user?.isAdmin === true || user?.role === "admin";
}

export function getCurrentUserId() {
  const user = getCurrentUser();
  return user.userId || user._id || user.id || null;
}
