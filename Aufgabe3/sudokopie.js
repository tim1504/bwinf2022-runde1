//
//  Aufgabe 3    Sudokopie
//  Tim Himmelsbach
//

//Für das Einlesen von Dateien
const fs = require('fs');

//Alle Kombinationen zur Anordnung von drei Elementen
//Kann auch durch einen Algorithmus ermittelt werden
//Wurde hier fest gespeichert um einen größeren Rechenaufwand zu vermeiden
const combinations = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];

//Einlesen der beiden Sudokus
let sudoku1 = [];
let sudoku2 = [];

const input = fs.readFileSync(process.argv[2]).toString().trim().split(/\D+/).map(Number);

for(let i = 0; i < 9; i++) {
    sudoku1.push(input.splice(0,9));
    sudoku2.push(input.splice((8-i)*9,9));
}

//Untersucht ob beide Sudokus Varianten voneinander sind
//Falls ja gibt es die Veränderungsschritte in der Konsole aus
variantenVoneinander(sudoku1,sudoku2);

//Permutiert basierend auf einer Zahl von 0 bis 215 die Spalten eines Sudokus
function permutationSpalten(sudoku, param) {
    sudoku = zeileSpaltenVertauschen(sudoku);
    sudoku = permutationZeilen(sudoku, param);
    sudoku = zeileSpaltenVertauschen(sudoku);
    return sudoku;
}

//Permutiert basierend auf einer Zahl von 0 bis 5 die Spaltenbloecke eines Sudokus
function permutationSpaltenbloecke(sudoku, param) {
    sudoku = zeileSpaltenVertauschen(sudoku);
    sudoku = permutationZeilenbloecke(sudoku, param);
    sudoku = zeileSpaltenVertauschen(sudoku);
    return sudoku;
}

//Permutiert basierend auf einer Zahl von 0 bis 215 die Zeilen eines Sudokus
function permutationZeilen(sudoku, param) {
    let a = [Math.floor(param/36),Math.floor((param%36)/6),(param%36)%6];
    return sudoku.map((l, index) => sudoku[Math.floor(index/3)*3+combinations[a[Math.floor(index/3)]][index%3]]);
}

//Permutiert basierend auf einer Zahl von 0 bis 5 die Zeilenbloecke eines Sudokus
function permutationZeilenbloecke(sudoku,param) {
    return sudoku.map((l, index) => sudoku[combinations[param][Math.floor(index/3)]*3+index%3]);
}

//Rotiert basierend auf einer Zahl von 0 bis 3 das Sudoku um 90-Grad
function rotation(sudoku,param) {
    for(let i = 0; i < param; i++) {
        let sudokuEmpty = [];
        for(let row = 0; row < 9; row++) {
            let sudokuRow = [];
            for(let column = 0; column < 9; column++) {
                sudokuRow.push(sudoku[8-column][row]);
            }
            sudokuEmpty.push(sudokuRow);
        }
        sudoku = [...sudokuEmpty];
    }
    return sudoku;
}

//Überprüft ob ein und wie ein sudoku1 durch Umbenennung zu sudoku2 verändert werden kann
function ubennenDerZiffern(sudoku1, sudoku2) {
    let umbenennung = [];
    for(let i = 0; i < 9; i++) {
        for(let k = 0; k < 9; k++) {
            if(sudoku1[i][k] !== 0) {
                if(umbenennung[sudoku1[i][k]-1] === undefined) {
                    umbenennung[sudoku1[i][k]-1] = sudoku2[i][k];
                } else {
                    if(umbenennung[sudoku1[i][k]-1] !== sudoku2[i][k]) {
                        //Falls dies nicht möglich ist gibt die Funktion ein leeres Array zurück
                        return [];
                    }
                }
            }
        }
    }
    //Sonst gibt die Funktion die Umbenennung als Array zurück
    //Am Index zahl-1 steht die Umbenennung für eine Zahl
    return umbenennung;
}

//Vertauscht die Zeilen und Spalten eines Sudokus
function zeileSpaltenVertauschen(sudoku){
    return sudoku.map((spalte, s) => sudoku.map((zeile, z) => sudoku[z][s]));
}

//Überprüft ob die Position der freien und ausgefüllten Felder übereinstimmt
function uebereinstimmungFelder(sudoku,sudokuTest) {
    for(let i = 0; i < 9; i++) {
        for(let k = 0; k < 9; k++) {
            if(!(Boolean(sudoku[i][k]) === Boolean(sudokuTest[i][k]))) {
                return false;
            }
        }
    }
    return true;
}

//Alle Varianten eines Sudokus werden geprüft
function variantenVoneinander(sudoku1,sudoku2) {
    for(let r = 0; r < 4; r++) { //ROTATION
        const sudokuCopy = [...sudoku1];
        sudoku1 = rotation(sudoku1, r);
        for(let z = 0; z < 216; z++) { //PERMUTATION ZEILEN
            const sudokuCopy = [...sudoku1];
            sudoku1 = permutationZeilen(sudoku1, z);
            for(let s = 0; s < 216; s++) { //PERMUTATON SPALTEN
                const sudokuCopy = [...sudoku1];
                sudoku1 = permutationSpalten(sudoku1, s);
                for(let zB = 0; zB < 6; zB++) { // PERMUTATION ZEILENBLOECKE
                    const sudokuCopy = [...sudoku1];
                    sudoku1 = permutationZeilenbloecke(sudoku1, zB);
                    for(let sB = 0; sB < 6; sB++) { // PERMUTATION SPALTENBLOECKE
                        const sudokuCopy = [...sudoku1];
                        sudoku1 = permutationSpaltenbloecke(sudoku1, sB);
                        if(uebereinstimmungFelder(sudoku1,sudoku2)) {
                            let ubennen = ubennenDerZiffern(sudoku1,sudoku2);
                            //Falls das Sudoku durch Umbenennung verändert zu Sudoku 2 verändert werden kann
                            if(ubennen.length) {
                                //Ausgeben der Veränderungen in die Konsole
                                if(r !== 0) console.log('Rotation um 90 Grad: ' + r);
                                if(zB !== 0) console.log('Permutation Zeilenbloecke: ' + combinations[zB].map((value) => value+1).join(' '));
                                if(sB !== 0) console.log('Permutation Spaltenbloecke: ' + combinations[sB].map((value) => value+1).join(' '));
                                if(Math.floor(z/36) !== 0) console.log('Permutation Zeilen 1-3: ' + combinations[Math.floor(z/36)].map((value) => value+1).join(' '));
                                if(Math.floor((z%36)/6) !== 0) console.log('Permutation Zeilen 4-6: ' + combinations[Math.floor((z%36)/6)].map((value) => value+1).join(' '));
                                if((z%36)%6 !== 0) console.log('Permutation Zeilen 7-9: ' + combinations[(z%36)%6 ].map((value) => value+1).join(' '));
                                if(Math.floor(s/36) !== 0) console.log('Permutation Spalten 1-3: ' + combinations[Math.floor(s/36)].map((value) => value+1).join(' '));
                                if(Math.floor((s%36)/6) !== 0) console.log('Permutation Spalten 4-6: ' + combinations[Math.floor((s%36)/6)].map((value) => value+1).join(' '));
                                if((s%36)%6 !== 0) console.log('Permutation Spalten 7-9: ' + combinations[(s%36)%6].map((value) => value+1).join(' '));
                                if(ubennen.toString() !== [1,2,3,4,5,6,7,8,9].toString())console.log('Umbenennung: ' + ubennen.join(' '));
                                return;
                            }
                        }
                        sudoku1 = sudokuCopy;
                    }
                    sudoku1 = sudokuCopy;
                }
                sudoku1 = sudokuCopy;
            }
            sudoku1 = sudokuCopy;
        }
        sudoku1 = sudokuCopy;
    }
    //Falls keine Variante auf sudoku2 zutrifft
    console.log('Die Sudokus sind keine Varianten voneinander!');
}
