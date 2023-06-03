import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http.service';
import { Freelancer } from 'src/app/interface/freelancer.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  activeTabIndex: number = 0;
  userForm: FormGroup;
  isEditPopupOpen: boolean = false;
  isViewPopupOpen: boolean = false;
  isDeletePopupOpen: boolean = false;
  mode : string = "";

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }


  freelancers !: Freelancer[];
  popupVisible = false;
  selectedRow: any;

  constructor(private formBuilder: FormBuilder, public httpService : HttpService) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.httpService.get('/freelancer').subscribe(i=>{
      this.freelancers = i;
      console.log('get->',this.freelancers)
    })
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
        if(this.mode === 'edit'){
          this.httpService.put('/freelancer', {
            "firstName": "Ethan",
            "surname": "King",
            "gender": "Female",
            "designation": "Frontend Developer",
            "email": "e.king@example.com",
            "address": "111 Main St, City, Country",
            "hourlyRate": "30"
          })
        }
        this.httpService.post('/freelancer', {
          "firstName": "Ethan",
          "surname": "King",
          "gender": "Female",
          "designation": "Frontend Developer",
          "email": "e.king@example.com",
          "address": "111 Main St, City, Country",
          "hourlyRate": "30"
        })
        // Perform the update logic for the row
        // For example, update the row in the data array
      } else {
        // Add new row
        // const newRow = {
        //   id: this.freelancers.length + 1,
        //   name: this.userForm.get('name')?.value,
        //   age: this.userForm.get('age')?.value,
        //   email: this.userForm.get('email')?.value,
        //   address: this.userForm.get('address')?.value
        // };

        const newRow = {
          id: this.freelancers.length + 1,
          name: this.userForm.get('name')?.value,
          age: this.userForm.get('age')?.value,
          email: this.userForm.get('email')?.value,
          address: this.userForm.get('address')?.value
        };
        // this.freelancers.push(newRow)
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
    // const removeRow = this.rows.findIndex(i => this.selectedRow.id === i.id);
    // this.rows.splice(removeRow, 1);
    const removeRow = this.freelancers.findIndex(i => this.selectedRow.id === i._id);
    this.freelancers.splice(removeRow, 1);
    this.closePopup();
  }

  closePopup() {
    this.popupVisible = false;
  }
}
