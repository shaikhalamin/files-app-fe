export const getLocalSession = () => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("Failed to parse session from localStorage:", error);
    return null;
  }
};

export const removeLocalSession = () => {
  localStorage.removeItem("session");
};

export const setUserSession = (newSession: any) => {
  localStorage.setItem("session", JSON.stringify(newSession));
  return getLocalSession();
};

export const updateLocalSession = (updatedSession: any) => {
  const session = JSON.parse(localStorage.getItem("session") as string);
  const update = Object.assign(session, { ...updatedSession });
  setUserSession(update);
  return getLocalSession();
};
