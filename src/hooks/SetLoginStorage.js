export const SetLoginStorage = (data) => {
  return (
    localStorage.setItem("email", data.email) &
    localStorage.setItem("phone", data.phone) &
    localStorage.setItem("fullName", data.fullName) &
    localStorage.setItem("token", Date.now())
  );
};
