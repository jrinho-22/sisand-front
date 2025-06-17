import { CommonModule } from "@angular/common";
import { Component, Input, Optional, Host, SkipSelf } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from "@angular/forms";
import { NgxMaskDirective } from "ngx-mask";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  imports: [NgxMaskDirective, ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true
    },
  ]
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() label: string = ""
  @Input() type: string = "text";
  @Input() mask: string | undefined
  @Input() showMaskTyped: boolean = false;
  @Input() dropSpecialCharacters: boolean = false;
  @Input() validation: boolean = true;
  @Input() formControlName!: string;
  protected formControl!: AbstractControl;
  private errorsObj = {
    mask: "Campo Inválido",
    required: "Campo Obrigatório",
    minlength: "Mínimo de 5 dígitos Obrigatórios"
  }

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    if (this.controlContainer) {
      const control = this.controlContainer.control?.get(this.formControlName);
      if (control) {
        this.formControl = control;
      } else {
        console.warn(
          `Form control with name '${this.formControlName}' not found`
        );
      }
    }
  }

  public get error(): string | null {
    if (!this.formControl?.validator) return null;

    if (
      !this.formControl.valid &&
      this.formControl?.touched &&
      this.formControl.errors
    ) {
      const errorKey  = Object.keys(this.formControl.errors)[0] as (keyof typeof this.errorsObj)
      if (errorKey) {
        return this.errorsObj[errorKey] || "Campo Inválido"
      }

      return "Campo Inválido"
    }
  
    return null;
  }

  writeValue(value: string) {
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: Function) {
  }
}