import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-button',
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.scss'
})
export class LoadingButtonComponent {
  @Input() loadingIconSpace: string = "ms-2"
  @Input() customClass: string = ""
  @Input() label: string = ""
  @Input() function: Function = async () => { }
  loading: boolean = false

  async runAction(event: Event) {
    this.loading = true
    try {
    await this.function(event) 
    } catch (error) {
      window.alert("Something went wrong")
    }
    this.loading = false
  }
}
