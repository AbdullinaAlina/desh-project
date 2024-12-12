export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("accessToken").value;
  const role = useCookie("role").value;

  console.log("[Middleware] Token:", token, "Role:", role);

  console.log("Auth middleware executed for:", to.fullPath, "Route name:", to.name);

  if (!token && to.name !== "Auth") {
    return navigateTo("/auth");
  }

  if (token && to.name === "Auth") {
    if (role) {
      return navigateTo(`/${role}`);
    }
    //  else {
    //   console.error("[Middleware] Role is missing. Staying on /auth.");

    //   return navigateTo("/Auth");
    // }
  }
});
