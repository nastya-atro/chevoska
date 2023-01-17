import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'app-modal-request',
  templateUrl: './modal-request.component.html',
  styleUrls: ['./modal-request.component.scss'],
})
export class ModalRequestComponent implements OnInit {
  @Input() isPrivate!: boolean;
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'),
    Validators.maxLength(80),
  ]);
  @Output() makeRequest = new EventEmitter();

  ngOnInit() {}

  send() {
    if (this.email.valid) {
      this.makeRequest.emit(this.email.value);
      this.email.reset();
    } else {
      this.email.markAsTouched();
    }
  }
}
