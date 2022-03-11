import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
})
export class ValidatorComponent implements OnInit {
  constructor() {}

  @Input()
  abstractControl: AbstractControl | null = null;
  @Input()
  message: string = '';
  @Input()
  submitted = false;

  ngOnInit(): void {}
}
