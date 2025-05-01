import { User } from './models/models';
import * as APICALLS from './api/apicalls';  

export function showAuthForm(container: HTMLElement, onAuthSuccess: () => void) {
  container.innerHTML = `
    <div>
      <div style="margin-bottom: 10px;">
        <button id="show-login">Login</button>
        <button id="show-signup">Sign Up</button>
      </div>
      <div id="auth-form"></div>
    </div>
  `;
  const formContainer = document.getElementById("auth-form")!;


 function renderLoginForm() {
  formContainer.innerHTML = `
      <div class="login-form">
        <h2>Login</h2>
        <input id="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Password" />
        <button id="login-btn">Login</button>
      </div>
    `;

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passInput = document.getElementById("password") as HTMLInputElement;
  const btn = document.getElementById("login-btn")!;
  btn.addEventListener("click", async () => {
    let loginSuccess:boolean = await APICALLS.login(emailInput.value, passInput.value);
    if (loginSuccess) {
      onAuthSuccess();
    } else {
      alert("Invalid credentials");
    }
  });
}

function renderSignupForm() {
  formContainer.innerHTML = `
    <h2>Sign Up</h2>
    <input id="name" placeholder="Name" /><br>
    <input id="email" placeholder="Email" /><br>
    <input id="phone" placeholder="Phone Number" /><br>
    <input id="password" type="password" placeholder="Password" /><br>
    <input id="aadhar" type="text" placeholder="Aadhar number" /><br>
    <input id="gender" type="text" placeholder="Gender" /><br>
    <input id="address" type="text" placeholder="Address" /><br>
    <label for="foodtype">Food Type</label>
    <select id="foodtype">
    <option value="VEG">VEG</option>
    <option value="NONVEG">NON-VEG</option>
    </select> <br>
    <input type="file" id="profilePhoto"> <br>
    <button id="signup-btn">Sign Up</button>
  `;
  const picture=(document.getElementById("profilePhoto") as HTMLInputElement);
  let imagestring= "";
  picture.addEventListener("change", async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        imagestring=await ConvertImage(file);
        alert(imagestring);
      }
  });
  
  
  document.getElementById("signup-btn")!.addEventListener("click", async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const aadhar=(document.getElementById("aadhar") as HTMLInputElement).value;
    const gender=(document.getElementById("gender") as HTMLInputElement).value;
    const address=(document.getElementById("address") as HTMLInputElement).value;
    const foodType=(document.getElementById("foodtype") as HTMLSelectElement).value;

    const existing = await APICALLS.checkUser(email);
    if (existing) {
      alert("User already exists.");
      return;
    }

    const newUser: User = { userID: 0, amount: 0,email, password, mobileNumber: phone,aadharNumber:aadhar,foodType:foodType,gender:gender,address:address,userName:name,profilePhoto:imagestring};
    APICALLS.addNewUser(newUser);
    alert("Signup successful. Please login.");
    renderLoginForm();

  });
  function ConvertImage(file:File):Promise<string>
  {
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result as string);
      reader.onerror=error=>reject(error);
    });
  }
}

document.getElementById("show-login")!.addEventListener("click", renderLoginForm);
document.getElementById("show-signup")!.addEventListener("click", renderSignupForm);

// Show login by default
renderLoginForm();
}