export default defineNuxtRouteMiddleware((to) => {
    const role = useCookie("role").value;
  
    if (!role) {
      console.error("Role cookie is missing. Redirecting to /auth.");
      return navigateTo("/auth");
    }
  
    console.log("Role middleware executed for:", to.fullPath, "Route name:", to.name);

    if (to.name === "student" && role !== "student") {
      console.error("Unauthorized: Student route is restricted.");
      return navigateTo(`/${role}`);
    }
    if (to.name === "tutor" && role !== "tutor") {
      console.error("Unauthorized: Tutor route is restricted.");
      return navigateTo(`/${role}`);
    }
    if (to.name === "admin" && role !== "admin") {
      console.error("Unauthorized: Admin route is restricted.");
      return navigateTo(`/${role}`);
    }
  });
  