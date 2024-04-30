import { supabase, successNotification, errorNotification } from "../main";

const form_signup = document.getElementById("form_signup");

form_signup.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button
  document.querySelector("#form_signup button").disabled = true;
  document.querySelector("#form_signup button").innerHTML = '<div class="spinner-border me-2" role="status"></div> <span>Loading..</span>';

  const formData = new FormData(form_signup);
  const password = formData.get("password");
  const email = formData.get("email");
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const phone_number = formData.get("phone_number");


  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signUpError) {
      if (signUpError.message === "Email already taken.") {
        errorNotification("Email is already in use.", 10);
      } else {
        errorNotification("Cannot register account.", 10);
        console.log(signUpError);
      }
      return;
    }

    const userId = signUpData.user.id;

    const { data: userInfoData, error: userInfoError } = await supabase
      .from("userinfos")
      .insert([
        {
          firstname: firstname,
          lastname: lastname,
          phone_number: phone_number,
          user_id: userId,
        },
      ]);

    if (userInfoError) {
      errorNotification("Cannot register account.", 10);
      console.log(userInfoError);
      return;
    }

    successNotification("Sign up Successfully!", 10);
    // Reset Form
    form_signup.reset();



    // Enable submit button
    document.querySelector("#form_signup button").disabled = false;
    document.querySelector("#form_signup button").innerHTML = 'Sign Up';

    // Redirect to login page
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    errorNotification("Error signing up. Please try again later.", 10);
    console.log(error);
  }
};