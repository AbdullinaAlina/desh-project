export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("accessToken").value;
  const role = useCookie("role").value;

  if (!token && to.name !== "auth") {
    return navigateTo("/auth");
  }

  if (token && to.name === "auth") {
    if (role) {
      return navigateTo(`/${role}`);
    }
    //  else {
    //   console.error("[Middleware] Role is missing. Staying on /auth.");

    //   return navigateTo("/Auth");
    // }
  }
});
