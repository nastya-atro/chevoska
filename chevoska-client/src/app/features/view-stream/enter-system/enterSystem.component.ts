import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewStreamService } from '../viewStream.service';
import Utils from '../../../core/utils/utils';

@UntilDestroy()
@Component({
  selector: 'app-enter-system',
  templateUrl: './enterSystem.component.html',
  styleUrls: ['./enterSystem.component.scss'],
})
export class EnterSystemComponent {
  myForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private viewStreamService: ViewStreamService) {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'),
          Validators.maxLength(80),
        ],
      ],
      // phone: ['', [Validators.pattern('^[+]*[-\\s\\./0-9]*$')]],
      // key: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (this.myForm.valid) {
      this.viewStreamService
        .enterSystem(this.myForm.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            console.log('111111111111111111');
            //  this.router.navigate([])
          },

          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.myForm);
    }
  }
}
