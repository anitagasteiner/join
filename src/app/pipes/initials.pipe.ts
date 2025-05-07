import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(fullName: string): string {
    if (!fullName) return '';
    const words = fullName.trim().split(/\s+/); // trim() entfernt Leerzeichen vorne und hinten, split(/\s+/) teilt bei einem oder mehreren Leerzeichen
    const initials = words.filter(word => !!word).map(word => word.charAt(0).toUpperCase()).slice(0, 2).join(''); // filter: leere Strings raus; map: holt sich den ersten Buchstaben jedes Wortes; slice: falls Doppelnamen oder mehrere Vornamen -> nur die ersten beiden Initialen; join: setzt die Buchstaben zusammen
    return initials;

    //Falls in Zukunft zweiter Vorname bei Eingabe möglich ist, brauche ich dann eine geänderte Funktion:
    // if (words.length === 0) return '';
    // const firstInitial = words[0].charAt(0).toUpperCase();
    // const lastInitial = words[words.length - 1].charAt(0).toUpperCase();
    // if (words.length === 1) {
      //return firstInitial; // Falls nur ein einzelner Name eingegeben wurde. (Das ist momentan nicht möglich.)
      // } else {
        // return firstInitial + lastInitial;
      // }
  }

}
