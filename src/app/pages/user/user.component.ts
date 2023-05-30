import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  activeTabIndex: number = 0;
  selectedRow: any = null;
  isEditPopupOpen: boolean = false;
  isViewPopupOpen: boolean = false;
  isDeletePopupOpen: boolean = false;
  rows: any[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Mike Johnson', email: 'mike@example.com' }
  ];
  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
  addRow() {
    this.rows.push({ name: '', email: '' });
  }

  openEditPopup(row: any) {
    this.selectedRow = { ...row }; // Create a copy of the row
    this.isEditPopupOpen = true;
  }

  openViewPopup(row: any) {
    this.selectedRow = row;
    this.isViewPopupOpen = true;
  }

  openDeletePopup(row: any) {
    this.selectedRow = row;
    this.isDeletePopupOpen = true;
  }

  closePopup() {
    this.selectedRow = null;
    this.isEditPopupOpen = false;
    this.isViewPopupOpen = false;
    this.isDeletePopupOpen = false;
  }

  saveRow() {
    // Find the index of the selected row
    const index = this.rows.findIndex(row => row === this.selectedRow);
    if (index > -1) {
      // Update the row with the modified values
      this.rows[index] = { ...this.selectedRow };
    }
    this.closePopup();
  }

  deleteRow() {
    const index = this.rows.indexOf(this.selectedRow);
    if (index > -1) {
      this.rows.splice(index, 1);
    }
    this.closePopup();
  }
}
