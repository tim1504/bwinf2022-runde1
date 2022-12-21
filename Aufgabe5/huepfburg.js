//
//  Aufgabe 5   Huepfburg
//  Tim Himmelsbach
//

//Für das einlesen von Dateien
const fs = require('fs');

//Der Parcours wird als Graph in einer Map gespeichert
const parcours = new Map();

//Einlesen und speichern der Verbindungen der Felder aus der Datei
const array = fs.readFileSync(process.argv[2]).toString().split(/\s+/);
//Die ersten beiden Zahlen werden ignoriert, da diese nur angaben über die Anzahl der Felder und der Pfeile machen
for(let i = 2; i < array.length; i += 2) {
    if(parcours.get(array[i]) === undefined) {
        parcours.set(array[i], []);
    }
    parcours.get(array[i]).push(array[i+1]);
}

//Sasha beginnt bei Feld 1, Mika bei Feld 2
let sprungFolgeSasha = [['1']];
let sprungFolgeMika = [['2']];

//Überprüft ob ein Parcours möglich ist
istMoeglich(sprungFolgeSasha,sprungFolgeMika);


//Die Methode gibt in die Konsole aus, ob eine Parcours möglich ist
function istMoeglich(sasha, mika) {
    while(sasha.length && mika.length) {
        sasha = naechterSprung(sasha);
        mika = naechterSprung(mika);
        for(const sprungFolgeSasha of sasha) {
            for(const sprungFolgeMika of mika) {
                //Sind beide auf dem gleichen Feld
                if(sprungFolgeSasha.at(-1) === sprungFolgeMika.at(-1)) {
                    console.log('Dieser Parcours kann erfolgreich absolviert werden!');
                    console.log('Sasha: ', sprungFolgeSasha.join(', '));
                    console.log('Mika: ', sprungFolgeMika.join(', '));
                    return;
                }
            }
        } 
        if(gemeinsameSchleife([...sasha,...mika])) {
            break;
        }
    }
    //Alle Sprungfolgen führen in eine Sackgasse
    //Alle Sprungfolgen stecken in einer gemeinsamen Schleife fest
    console.log('Dieser Parcours kann nicht absolviert werden!');
}

//Gibt ein Array mit allen nächsten möglichen Sprungfolgen aus
function naechterSprung(sprungFolgen) {
    let neueSprungfolgen = [];
    for(const sprungFolge of sprungFolgen) {
        let sprungMoeglichkeiten = parcours.get(sprungFolge.at(-1));
        if(sprungMoeglichkeiten !== undefined) {
            //Ist eine Sprungfolge eine Sackgasse kann diese entfernt werden
            for(const sprungMoeglichkeit of sprungMoeglichkeiten) {
                //Führen zwei Sprungfolgen aus dasselbe Feld kann eine der Sprungfolgen entfernt werden
                if(!selbesFeld(neueSprungfolgen, sprungMoeglichkeit)) {
                    neueSprungfolgen.push([...sprungFolge,sprungMoeglichkeit]);
                }
            }
        }
    }
    return neueSprungfolgen;
}

//Überprüft ob schon eine andere Sprungfolge auf dasselbe Feld führt
function selbesFeld(sprungFolgen, sprungMoeglichkeit) {
    for(const sprungFolge of sprungFolgen) {
        if(sprungFolge.at(-1) === sprungMoeglichkeit) {
            return true;
        }
    }
    return false;
}

//Überprüft die aktuellen Sprungfolgen auf eine gemeinsame Schleife 
function gemeinsameSchleife(sprungFolgen) {
    for(let i = 0; i < sprungFolgen[0].length; i++) {
        for(let k = 0; k < sprungFolgen[0].length; k++) {
            for(let j = 0; j < sprungFolgen.length; j++) {
                if(sprungFolgen[j][k] !== sprungFolgen[j][i] || i === k) {
                    break;
                }
                if(j === sprungFolgen.length - 1) {
                    //Alle Sprungfolgen haben am Index i und k dasselbe Feld
                    //Sie stecken in einem gemeinsamen Loop fest
                    return true;
                }
            }
        }
    }
    return false;
}