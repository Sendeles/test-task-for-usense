import {FormControl} from "@angular/forms";

export class MyValidators {

  static restrictedEmail(control: FormControl): { [key: string]: boolean } {
    if (control.value !== null) {
      const email = control.value as string;

      if (['v@mail.ru', 'test@mail.ru'].includes(email)) {
        return {restrictedEmail: true};
      }

      const atIndex = email.lastIndexOf('@');

      if (atIndex >= 0) {
        const domain = email.slice(atIndex + 1);
        const restrictedDomains = ['mail.ru', 'example.com', 'yourdomain.com'];

        if (restrictedDomains.includes(domain)) {
          return {restrictedEmail: true};
        }
      }

      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return {invalidEmail: true};
      }
    }

    return {};
  }
}
