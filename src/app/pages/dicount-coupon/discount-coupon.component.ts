import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DiscountCouponModel } from 'src/app/models/discount-coupon.model';
import { DiscountCouponService } from 'src/app/services/discount-coupon.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dicount-coupon',
  templateUrl: './discount-coupon.component.html',
})
export class DiscountCouponComponent implements OnInit {
  submitted = false;
  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private discountCouponService: DiscountCouponService,
    private messageService: MessageService,
    private toastService: ToastrService
  ) {}

  coupons: DiscountCouponModel[] = [];

  form = this.formBuilder.group({
    couponCode: new FormControl('', Validators.required),
    validUpto: new FormControl('', Validators.required),
    discountPercent: new FormControl(0, Validators.min(1)),
  });

  ngOnInit(): void {
    this.getCoupons();
  }

  onSubmit = () => {
    this.submitted = true;
    this.submitting = true;
    if (this.form.valid) {
      this.discountCouponService.postCoupon(this.form.value).subscribe({
        next: () => {
          this.getCoupons();
          this.toastService.success('Coupon added sucessfully');
          this.submitted = false;
          this.submitting = false;
          this.form.reset();
        },
        error: (e) => {
          this.submitting = false;
          this.messageService.handleError(e);
        },
      });
    }
  };

  private getCoupons() {
    this.discountCouponService
      .getCoupons()
      .subscribe((data) => (this.coupons = data));
  }
}
