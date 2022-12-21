//
//  Aufgabe 1   Stoerung
//  Tim Himmelsbach
//

//Für das Einlesen von Dateien
const fs = require('fs');

const buch = fs.readFileSync('Alice_im_Wunderland.txt').toString();
const stoerung = fs.readFileSync(process.argv[2]).toString();

//Erstellen aus stoerung eine regular expression
//Alle Unterstriche werden durch einen Platzhalter für ein Wort ersetzt
//Groß- und Kleinschreibung wird ignoriert
let regex = new RegExp(stoerung.replace(/_/g,'[a-z|ä|ö|ü|ß]+'), 'gi');

//Speichert alle Auschnitte aus dem Buch, auf die regular expression zutrifft
//Duplikate werden entfernt
let ergebnisse = [...new Set(buch.match(regex))];

//Gibt alle Ergebnisse auf die Konsole aus
console.log(ergebnisse.join('\n').toLocaleLowerCase());
