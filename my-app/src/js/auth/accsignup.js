import { supabase, successNotification, errorNotification } from "../main";

const form_signup = document.getElementById("form_signup");

form_signup.onsubmit = async (e) => {
    e.preventDefault();

    //Disable button
    document.querySelector("#form_signup button").disabled = true;
    document.querySelector("#form_signup button").innerHTML = '<div class="spinner-border me-2" role="status"></div> <span>Loading..</span>';

    const formData = new FormData(form_signup);
    const password = formData.get("password");
    const email = formData.get("email");
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const phone_number = formData.get("phone_number");
    console.log(formData);
    console.log(email);
    console.log(password);
    console.log(firstname);
    console.log(lastname);
    console.log(phone_number);
 

    
    if (password == formData.get("password_confirmation")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        let userId = signUpData?.user?.id;

        if (userId != null) {
            const { data: userInfoData, error: userInfoError } = await supabase
                .from('userinfos')
                .insert([
                    {
                        firstname: firstname,
                        lastname: lastname,
                        phone_number: phone_number,
                        user_id: userId,
                    },
                ]);
                 const Id = userInfoData[0].id; 
                console.log(Id);

    

            successNotification("Sign up Successfully!", 10);
            //alert("Sign Up Successful");
           // window.location.href="login.html";
           
        } else {
            errorNotification("Cannot register account.", 10);
            //alert(`Error: ${signUpError.message}`);
            console.log(signUpError);
        }
       //Reset Form
         form_signup.reset();

         //Enable submit button
         document.querySelector("#form_signup button").disabled = false;
         document.querySelector("#form_signup button").innerHTML = 'Sign Up';
   
        } else {
        alert("Password doesn't match");
    }
};