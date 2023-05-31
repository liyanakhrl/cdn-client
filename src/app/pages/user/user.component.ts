import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  activeTabIndex: number = 0;
  userForm: FormGroup;
  isEditPopupOpen: boolean = false;
  isViewPopupOpen: boolean = false;
  isDeletePopupOpen: boolean = false;
  mode : string = "";

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
  // Other component properties
  rows: any[] = [{
    id:1,
    name: "Elsa",
    age: 22,
    email: "elsa@mail.com",
    address: "Geylang, SingapOre"
  }, {
    id:2,
    name: "Robin",
    age: 26,
    email: "rbb@mail.com",
    address: "Jerung West, Singapore"
  }, {
    id:3,
    name: "Robbie",
    age: 22,
    email: "robbie@mail.com",
    address: "Selayang, Selangor"
  }]
  popupVisible = false;
  selectedRow: any;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
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
    this.userForm.reset();
  }



  viewRow(mode:string,row: any) {
    this.mode = mode;
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
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
    this.userForm.patchValue({
      name: row.name,
      age: row.age,
      email: row.email,
      address: row.address
    });
  }

  saveRow() {
    if (this.userForm.valid) {
      if (this.selectedRow) {
        // Update existing row
        const updatedRow = {
          id: this.selectedRow.id,
          name: this.userForm.get('name')?.value,
          age: this.userForm.get('age')?.value,
          email: this.userForm.get('email')?.value,
          address: this.userForm.get('address')?.value
        };
        // Perform the update logic for the row
        // For example, update the row in the data array
      } else {
        // Add new row
        const newRow = {
          id: this.rows.length + 1,
          name: this.userForm.get('name')?.value,
          age: this.userForm.get('age')?.value,
          email: this.userForm.get('email')?.value,
          address: this.userForm.get('address')?.value
        };
        this.rows.push(newRow)
        // Perform the add logic for the new row
        // For example, add the row to the data array
      }


      this.closePopup();
    }
  }

  deleteRow(mode:string,row: any) {
    this.mode = "Delete User";
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
      name: row.name,
      age: row.age,
      email: row.email,
      address: row.address
    });
  }

  removeRow() {
    const removeRow = this.rows.findIndex(i => this.selectedRow.id === i.id);
    this.rows.splice(removeRow, 1);
    this.closePopup();
  }

  closePopup() {
    this.popupVisible = false;
  }
}
