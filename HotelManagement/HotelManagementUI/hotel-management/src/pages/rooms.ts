import { RoomDetails } from '../models/models.ts';
import * as APICALLS from '../api/apicalls';

export function renderRooms(container: HTMLElement) {
    container.innerHTML = `<h2>Rooms</h2> <button id="addMedicineBtn">Add Room</button>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var rooms = await APICALLS.fetchRooms();

        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.className="roomTable";
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Room Image</th>
            <th>Room Id</th>
            <th>Room Type</th>
            <th>Number of Beds</th>
            <th>Price Per Day</th>
            <th>Action</th>`;
        table.appendChild(headerRow);


        rooms.forEach((room) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td id="image"><img src="${room.roomImage}" ></td>
      <td>${room.roomID}</td>
      <td>${room.roomType}</td>
      <td>${room.numberOfBeds}</td>
      <td>${room.pricePerDay}</td>
      <td>
        <button id="edit" onclick="editRoom('${room.roomID}')">Edit</button> <br>
        <button id="delete" onclick="deleteRoom('${room.roomID}')">Delete</button>
      </td>`;
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    }
    function addEditMedicinesForm() {
        const existingForm = document.getElementById("medicineForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "medicineForm";
        form.innerHTML = `
        <label for="medicineName">Room Type:</label>
        <select id="medicineName">
        <option value="Standard">Standard</option>
        <option value="Delux">Delux</option>
        <option value="Suit">Suit</option>
        </select> <br>
        <label for="medicinePrice">Number of Beds :</label>
        <input type="number" id="medicinePrice" name="medicinePrice"><br>
        <label for="medicineCount">Price Per Day:</label>
        <input type="number" id="medicineCount" name="medicineCount"><br>
        <input type="file" id="roomImage"><label for="roomImage">Upload Room Image</label>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
        const picture = (document.getElementById("roomImage") as HTMLInputElement);
        picture.addEventListener("change", async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                imagestring = await ConvertImage(file);
                alert(imagestring);
            }
        });
        function ConvertImage(file: File): Promise<string> {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
        }
    }
    let imagestring = "";
    // Attach listeners AFTER table is in the DOM
    let editingID: number = 0;
    async function editRoom(id: string) {
        // alert("Editing " + id);
        addEditMedicinesForm();
        
        // Populate form with existing data for editing
        const form = document.getElementById("medicineForm") as HTMLFormElement;
        const room = await APICALLS.getIndividualRoom(parseInt(id));
        if (room) {
            editingID = Number(id);
            form.medicineName.value = room.roomType;
            form.medicinePrice.value = room.numberOfBeds.toString();
            form.medicineCount.value = room.pricePerDay.toString();
            // form.roomImage.value = room.roomImage;
        }
    }
    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (editingID > 0) {
            const room: RoomDetails = {
                roomID: editingID,
                roomType: form.medicineName.value,
                numberOfBeds: parseInt(form.medicinePrice.value),
                pricePerDay: parseInt(form.medicineCount.value),
                roomImage:imagestring||form.roomImage.value
            };
            await APICALLS.editRoomDetail(room);
            imagestring="";
            alert("Updated medicine successfully : " + room.roomID);
        } else {
            const room: RoomDetails = {
                roomID: 0, roomType: form.medicineName.value, pricePerDay: parseInt(form.medicineCount.value), numberOfBeds: parseInt(form.medicinePrice.value),roomImage: imagestring
            };
            await APICALLS.addNewRoom(room);
            imagestring="";
            alert("Added medicine successfully : " + room.roomID);
        }
        createTable();
        form.reset();
        editingID = 0;
        const existingForm = document.getElementById("medicineForm");
        if (existingForm) {
            existingForm.remove();
        }
    });

    const addBtn = container.querySelector("#addMedicineBtn") as HTMLButtonElement;
    addBtn?.addEventListener("click", () => {
        alert("Add Room");
        addEditMedicinesForm(); // make sure this function exists and is imported
    });

    async function deleteRoom(id: string) {
        await APICALLS.deleteRoomDetail(parseInt(id));
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editRoom = editRoom;
    (window as any).deleteRoom = deleteRoom;
}