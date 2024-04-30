import { errorNotification, successNotification, supabase } from "../main";

const login_form = document.getElementById("login_form");

login_form.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button
  document.querySelector("#login_form button").disabled = true;
  document.querySelector("#login_form button").innerHTML = '<div class="spinner-border me-2" role="status"></div> <span>Loading..</span>';

  const formData = new FormData(login_form);

  // supabase sign-in
  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  let session = data.session;
  let user = data.user;

  console.log(user);

  if (session!= null) {
    // Store tokens for API
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);

    // For role-based authentication; uncomment if you want to implement example: admin log-in
    let { data: userinfos, error } = await supabase
     .from("userinfos")
     .select("*")

    // Save user id in local storage
    localStorage.setItem("user_id", userinfos[0].id);
    console.log(userinfos[0].id);

    if (session!= null) {
      const userRole = userinfos[0].Role;
      const userId = user.id;

      successNotification("Login Successfully!", 10);

      window.location.pathname = '/gallery.html';
    }
  } else {
    //alert(`Error: ${error.message}`);
    errorNotification("Cannot login account", 2);
    console.log(error);
  }

  // Resetting form
  login_form.reset();

  // Enable submit button
  document.querySelector("#login_form button").disabled = false;
  document.querySelector("#login_form button").innerHTML = 'Log in';
};