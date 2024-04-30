import {
  supabase, doLogout
} from "../main";


document.body.addEventListener("click", function (event) {
  if (event.target.id === "logout_btn") {
   doLogout();
  }
});