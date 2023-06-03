import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http.service';
import { Freelancer } from 'src/app/interface/freelancer.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  activeTabIndex: number = 0;
  userForm: FormGroup;
  isEditPopupOpen: boolean = false;
  isViewPopupOpen: boolean = false;
  isDeletePopupOpen: boolean = false;
  mode: string = "";

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }


  freelancers!: Freelancer[];
  popupVisible = false;
  selectedRow: any;

  constructor(private formBuilder: FormBuilder, public httpService: HttpService) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      hourlyRate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getFreelancer();
  }

  getFreelancer(){
    this.httpService.get('/freelancer').subscribe(i => {
      this.freelancers = i;
      console.log('get->', this.freelancers)
    })
  }
  addRow() {
    this.mode = "Add"
    this.popupVisible = true;
    this.selectedRow = null;
    this.userForm.reset();
  }

  viewRow(mode: string, row: any) {
    this.mode = mode;
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
      firstName: row.firstName,
      surname: row.surname,
      gender: row.gender,
      designation: row.designation,
      email: row.email,
      address: row.address,
      hourlyRate: row.hourlyRate,
    });
  }

  editRow(mode: string, row: any) {
    this.mode = mode;
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
      firstName: row.firstName,
      surname: row.surname,
      gender: row.gender,
      designation: row.designation,
      email: row.email,
      address: row.address,
      hourlyRate: row.hourlyRate,
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
        if (this.mode === 'edit') {
          this.httpService.put('/freelancer', {
            "firstName": this.userForm.get('firstName')?.value,
            "surname": this.userForm.get('surname')?.value,
            "gender": this.userForm.get('gender')?.value,
            "designation": this.userForm.get('designation')?.value,
            "email": this.userForm.get('email')?.value,
            "address": this.userForm.get('address')?.value,
            "hourlyRate": this.userForm.get('hourlyRate')?.value,
          })
        }
      } else {
        // Add new row
        const obj : Freelancer = {
          firstName: this.userForm.get('firstName')?.value,
          surname: this.userForm.get('surname')?.value,
          gender: this.userForm.get('gender')?.value,
          designation: this.userForm.get('designation')?.value,
          email: this.userForm.get('email')?.value,
          address: this.userForm.get('address')?.value,
          hourlyRate: this.userForm.get('hourlyRate')?.value,
        }

        this.httpService.post('/freelancer',obj).subscribe(i=>{this.getFreelancer();
        })
      }
      this.closePopup();
    }
  }

  deleteRow(mode: string, row: any) {
    this.mode = "Delete User";
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
      firstName: row.firstName,
      surname: row.surname,
      gender: row.gender,
      designation: row.designation,
      email: row.email,
      address: row.address,
      hourlyRate: row.hourlyRate,
    });
  }

  removeRow() {
    const removeRow = this.freelancers.findIndex(i => this.selectedRow.id === i._id);
    this.freelancers.splice(removeRow, 1);
    this.closePopup();
  }

  closePopup() {
    this.popupVisible = false;
  }
}
