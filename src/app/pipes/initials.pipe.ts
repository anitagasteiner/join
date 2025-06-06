import { Pipe, PipeTransform } from '@angular/core';

/**
 * A custom pipe that transforms a full name string into its initials.
 */
@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  /**
   * Transforms a full name into a string of up to two uppercase initials.
   * @param {string} fullName - The full name string to convert.
   * @returns {string} The initials derived from the name.
   */
  transform(fullName: string): string {
    if (!fullName) return '';
    const words = fullName.trim().split(/\s+/); //NOTE - trim() entfernt Leerzeichen vorne und hinten, split(/\s+/) teilt bei einem oder mehreren Leerzeichen
    const initials = words.filter(word => !!word).map(word => word.charAt(0).toUpperCase()).slice(0, 2).join(''); // NOTE - filter: leere Strings raus; map: holt sich den ersten Buchstaben jedes Wortes; slice: falls Doppelnamen oder mehrere Vornamen -> nur die ersten beiden Initialen; join: setzt die Buchstaben zusammen
    return initials;

    //NOTE - Falls in Zukunft zweiter Vorname bei Eingabe möglich ist, dann brauche ich eine geänderte Funktion:
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