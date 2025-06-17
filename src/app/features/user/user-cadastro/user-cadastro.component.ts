import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { UserDto, UserForm } from '../shared/types';
import { TextFieldComponent } from '../../../shared/components/inputs/text-field/text-field.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cadastro',
  imports: [TextFieldComponent, ReactiveFormsModule, CommonModule],
  providers: [UserService],
  templateUrl: './user-cadastro.component.html',
  styleUrl: './user-cadastro.component.scss'
})
export class UserCadastroComponent {
  protected userForm!: FormGroup<any>;

  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5),]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cep: ['', Validators.required],
    })
  }

  async registerUser(e: Event) {
    e.preventDefault()
    console.log(this.userForm)
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formData = this.userForm.value;
    await this.userService.registerUser(formData as UserDto);
  }
}
