export const isAuthenticated = () => localStorage.getItem("accessToken") !== null;

export const isADM = (user) => {
    return user.role.access ===  'ADM';
};
