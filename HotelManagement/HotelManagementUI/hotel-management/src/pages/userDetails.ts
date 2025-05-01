import * as APICALLS from '../api/apicalls';
export async function renderUserDetails(container:HTMLElement) {
    var user = await APICALLS.isAuthenticated();
      if (!user.success) {
        alert("Please login first");
        return;
      }
    var currentUser = await APICALLS.getIndividualUser(user.email);
      if (!currentUser) {
        alert("User not found");
        return;
      }
      container.innerHTML = `
      <div class=info>
      <img id="image" src="${currentUser.profilePhoto}">
      <p><strong>User ID:</strong>${currentUser.userID}</p>
      <p><strong>User Name:</strong>${currentUser.userName}</p>
      <p><strong>Gender:</strong>${currentUser.gender}</p>
      <p><strong>Phone Number:</strong>${currentUser.mobileNumber}</p>
      <p><strong>Mail ID:</strong>${currentUser.email}</p>
      <p><strong>Aadhar Number:</strong>${currentUser.aadharNumber}</p>
      <p><strong>Address:</strong>${currentUser.address}</p>
      <p><strong>Food Type:</strong>${currentUser.foodType}</p>
      <p><strong>Amount:</strong>${currentUser.amount} Rs</p>
      </div>
    `;
    // var image=document.getElementById("image") as HTMLImageElement;
    // image.src=currentUser.profilePhoto;

}