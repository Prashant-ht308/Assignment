import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control:AbstractControl):ValidationErrors | null{

  let confirmPassword = control.value;
  let password = control.root.get('password')?.value;

  if(password != "" && (password !== confirmPassword)){
    return {'passwordNotMatch':true};
  }else{
    return null;
  }
}
