import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  public step: number = 1;

  constructor() { }

  ngOnInit() {

  }

  prevStep() {
    if (this.step > 1) {
      this.step -= 1;
    }
  }

  nextStep() {
    if (this.step < 3) {
      this.step += 1;
    }
  }

}
