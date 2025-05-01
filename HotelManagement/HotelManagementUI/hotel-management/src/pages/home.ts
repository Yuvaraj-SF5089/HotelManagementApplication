import * as APICALLS from "../api/apicalls";
export async function renderHome(container: HTMLElement) {
   var user =  await APICALLS.isAuthenticated();
    container.innerHTML = `<h2>Welcome ${user.name} to our Hotel Management Application !</h2> <br> <img src="images/hotel.png" width="500" height="250" id="hotelimg"> <br>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, deserunt, eius dolor voluptates quis aut, accusamus doloremque fuga quidem illo corrupti? Consequuntur ut minima aut eligendi, alias aliquid vero libero!<p>
    `;
  }