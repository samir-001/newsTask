import { Component, forwardRef,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),  // replace name as appropriate
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor,Validator  {

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  private onChange!: (value: any) => void;
  private onTouched!: () => void;
  private _value: any;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
  }

  writeValue(value: any): void {
    this._value = value;
  }
  registerOnChange(fn: any): void {
      this.onChange = fn
  }
  registerOnTouched(fn: any): void {
      this.onTouched =fn
  }


}
