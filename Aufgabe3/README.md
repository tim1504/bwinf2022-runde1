# Aufgabe 3: Sudokopie

## Lösungsidee

Man könnte Brute-Force-artig alle möglichen Varianten des Sudokus erstellen und sie mit der potentiellen Sudokopie vergleichen. Da es aber etwa 2,4 Billionen Varianten eines Sudokus mit den angegebenen Veränderungen gibt, würde dies einen unvertretbar hohen Rechenaufwand darstellen. Ein effizienterer Lösungsweg, der sich an dem "Brute-Force- Prinzip" orientiert, würde alle Varianten erstellen, die Umstellung der Zahlen aber erstmal außen vorlassen. Erst im letzten Schritt wird evaluiert ob man mit einer Umstellung der Zahlen zu einem gültigem Ergebnis kommen würde. Dabei muss man nicht willkürlich alle Umstellungsmöglichkeiten ausprobieren. Da dies der letzte Schritt ist kann man sich die potentiellen Sudokopie als Vorlage nehmen, was den Rechenaufwand drastisch reduziert.

## Umsetzung

Durch mehrere verschachtelte for-Schleifen wird nacheinander durch die alle möglichen Varianten des Sudokus iteriert. Stimmen die Positionen der freien und ausgefüllten Felder der Variante des Sudokus mit der potentiellen Sudokopie ein, wird evaluiert ob man mit einer Umstellung der Zahlen zu dem gewünschten Ergebnis kommt. Eine Funktion geht folgendermaßen vor. Sie geht alle Felder des Sudokus durch. Ist ein Feld nicht frei vergleicht die Funktion die Zahl der Variante des Sudokus und der potentiellen Kopie. Stimmen die Zahlen nicht überein, vermerkt die Funktion eine Umstellung. Am Ende werden die Umstellungen als Array ausgegeben. Falls die Funktion wieder auf diese Zahl trifft, die Umstellung aber nicht der vermerkten Zahl entspricht ist keine Umstellung möglich. Die nächste Variante des Sudoku wird getestet.  
Ist eine Umstellung erfolgreich, werden Umformungen, basierend auf den Variablen der for-loops, auf die Konsole ausgegeben. Ist keine Variante erfolgreich, wird „Die Sudokus sind keine Varianten voneinander.“ auf die Konsole ausgegeben.  
Die verschiedenen Veränderungen, Permutationen und um 90-Grad drehen, werden durch Hilfsmethoden durchgeführt. Diese nehmen immer das Sudoku und eine Zahl als Argument. Die Zahl steht dabei für eine Zahl zwischen 0 und die Anzahl der einzigartigen Möglichkeiten - 1.  
Die Funktion zur Permutation der Spalten und Spaltenblöcke rufen jeweils die Funktion zur Permutation der Zeilen und Zeilenblöcke auf, vertauschen aber vor und nach den Aufruf die Spalten mit den Zeilen. Dies spart überflüssigen Code.  
Die Lösung wurde in JavaScript implementiert und mit NodeJS v16.17.1 getestet. Das Programm nimmt beim Ausführen den Dateipfad der Beispieldatei als Parameter. Ist dieser nicht vorhanden führt dies zu einem Error.

## Beispiele

**sudoku0.txt**  
Permutation Zeilen 1-3: 2 1 3  
Permutation Zeilen 7-9: 1 3 2   
Permutation Spalten 1-3: 3 1 2  
Permutation Spalten 4-6: 2 3 1  
Permutation Spalten 7-9: 3 2 1  

**sudoku1.txt**  
Rotation um 90 Grad: 1  
Permutation Zeilenbloecke: 2 3 1  
Permutation Spaltenbloecke: 2 3 1  

**sudoku2.txt**  
Permutation Spaltenbloecke: 3 2 1  
Permutation Zeilen 4-6: 1 3 2  
Umbenennung: 2 3 4 5 6 7 8 9 1  

**sudoku3.txt**  
Das Sudoku ist keine Sudokopie!

**sudoku4.txt**  
Rotation um 90 Grad: 1  
Permutation Zeilenbloecke: 1 3 2  
Permutation Spaltenbloecke: 2 3 1  
Permutation Zeilen 1-3: 3 2 1  
Permutation Zeilen 4-6: 3 2 1  
Permutation Zeilen 7-9: 3 2 1  
Permutation Spalten 1-3: 3 1 2  
Permutation Spalten 4-6: 3 2 1  
Permutation Spalten 7-9: 3 1 2  
Umbenennung: 4 8 1 9 2 5 7 3 6  