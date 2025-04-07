import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(fullName: string): string {
    if (!fullName) return '';
    const words = fullName.trim().split(/\s+/); // Teilt bei einem oder mehreren Leerzeichen
    const initials = words.map(word => word[0]?.toUpperCase()).slice(0, 2).join(''); // slice: falls Doppelnamen oder mehrere Vornamen -> nur die ersten beiden Initialen
    return initials;
  }

}
