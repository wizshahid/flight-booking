import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-button',
  templateUrl: './loader-button.component.html',
})
export class LoaderButtonComponent implements OnInit {
  constructor() {}

  @Input()
  submitting = false;

  @Input()
  class = '';

  @Input()
  type = 'submit';

  ngOnInit(): void {}
}
