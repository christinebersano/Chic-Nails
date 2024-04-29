function setRouter() {
    // const path = window.location.pathname;
    // const isLoggedIn = localStorage.getItem("access_token") !== null;
     //const userRole = localStorage.getItem("Role");
   
     switch (window.location.pathname) {
       // If you are logged in, you can't access outside pages; redirect to dashboard
       case "/":
       case "/index.html":
       case "/register.html":
        case "/accsignup.html":
         if (localStorage.getItem("access_token")) {
           window.location.pathname = "/home.html"; // default page when logged in
         }
         break;
   
       // If you are not logged in, you can't access dashboard pages; redirect to /
       case "/gallery.html":
       case "/booking.html":
        case "/notification.html":
       case "/profile.html":
       case "/home.html":
       case "/adminbooking.html":
       case "/adminprofile.html":
       case "/customer.html":

         // Allow access to items.html only if the user has the "Owner" or "Admin" role
         if (!localStorage.getItem("access_token")/*  || (userRole !== "user" && userRole !== "Admin") */) {
           window.location.pathname = "/index.html"; // redirect to home page if not logged in or not an owner/admin
         }
         break;
   
       case "/home.html":
         // Add more cases if there are more pages
         if (!isLoggedIn) {
           window.location.pathname = "/index.html"; // default page when logged out
         } else if (userRole !== "Owner" && userRole !== "Admin") {
           // Redirect to home page if the user is not an owner or admin
           window.location.pathname = "/gallery.html";
         }
         break; 
   
       default:
         break;
     }
   }
   
   export { setRouter };
   