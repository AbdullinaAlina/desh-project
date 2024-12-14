export default defineNuxtRouteMiddleware((to) => {
    const role = useCookie("role").value;
  
    if (!role) {
      return navigateTo("/auth");
    }
  
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
  