import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  activeTabIndex: number = 0;
  editForm: FormGroup;
  isEditPopupOpen: boolean = false;
  isViewPopupOpen: boolean = false;
  isDeletePopupOpen: boolean = false;
  mode : string = "";

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
  // Other component properties
  rows: any[] = [{
    name: "Elsa",
    age: 22,
    email: "elsa@mail.com",
    address: "Geylang, SingapOre"
  }, {
    name: "Robin",
    age: 26,
    email: "rbb@mail.com",
    address: "Jerung West, Singapore"
  }, {
    name: "Robbie",
    age: 22,
    email: "robbie@mail.com",
    address: "Selayang, Selangor"
  }]
  popupVisible = false;
  selectedRow: any;

  constructor(private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  addRow() {
    this.mode = "Add"
    this.popupVisible = true;
    this.selectedRow = null;
    this.editForm.reset();
  }



  viewRow(mode:string,row: any) {
    this.mode = mode;
    this.popupVisible = true;
    this.selectedRow = row;
    this.editForm.patchValue({
      name: row.name,
      age: row.age,
      email: row.email,
      address: row.address
    });
  }

  editRow(mode:string,row: any) {
    this.mode = mode;
    this.popupVisible = true;
    this.selectedRow = row;
    this.editForm.patchValue({
      name: row.name,
      age: row.age,
      email: row.email,
      address: row.address
    });
  }

  saveRow() {
    if (this.editForm.valid) {
      if (this.selectedRow) {
        // Update existing row
        const updatedRow = {
          id: this.selectedRow.id,
          name: this.editForm.get('name')?.value,
          age: this.editForm.get('age')?.value,
          email: this.editForm.get('email')?.value,
          address: this.editForm.get('address')?.value
        };
        // Perform the update logic for the row
        // For example, update the row in the data array
      } else {
        // Add new row
        const newRow = {
          id: this.rows.length + 1,
          name: this.editForm.get('name')?.value,
          age: this.editForm.get('age')?.value,
          email: this.editForm.get('email')?.value,
          address: this.editForm.get('address')?.value
        };
        this.rows.push(newRow)
        // Perform the add logic for the new row
        // For example, add the row to the data array
      }


      this.closePopup();
    }
  }

  deleteRow(mode:string,row: any) {
    // Perform the deletion logic for the specified row
    // For example, remove the row from the data array

    this.closePopup();
  }

  closePopup() {
    this.popupVisible = false;
  }
}
