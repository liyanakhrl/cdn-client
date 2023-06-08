import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() message!: string;
  @Input() description!: string;
  @Input() variant!: string;
  cssClass!: string;

  ngOnInit() {
  }

  get backgroundColor(): string {
    let backgroundColor = ""
    switch (this.variant) {
      case 'success':
        backgroundColor = '#57BB8A'; // Light green
        break;
      case 'warning':
        backgroundColor = '#FFC107'; // Amber
        break;
      case 'deleted':
        backgroundColor = '#E53935'; // Dark red
        break;
      case 'info':
        backgroundColor = '#607D8B'; // Blue gray
        break;
      default:
        backgroundColor = '#2196F3'; // Blue
        break;
    }

    return backgroundColor;
  }


}
