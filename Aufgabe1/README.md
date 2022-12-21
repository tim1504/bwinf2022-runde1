# Aufgabe 1: Störung

## Lösungsidee

Da dies in der deutschen Sprachen so üblich ist, wird ein Wort als eine Reihe der Buchstaben A-Z, Ä, Ö, Ü und ß definiert. Dabei werden Groß- und Kleinschreibung ignoriert.  
Es werden nach Überschneidungen im Text gesucht, ein Unterstrich steht dabei als Platzhalter für ein Wort. Man sucht im Text nach den Wörtern, die die Lücke füllen könnten und setzt sie ein.

## Umsetzung

RegEx, eine regular expression eignet sich sehr gut für das Problem. Ein RegEx Ausdruck funktioniert wie eine Art Suchanfrage. Man kann nach einem bestimmten Wort oder einem Zeichen in einem Text suchen, man kann aber auch z.B. nach Zeichenketten suchen, die einer bestimmten Bedingung unterliegen.  
Nimmt man den Suchsatz als Basis und ersetzt alle Unterstriche mit Platzhaltern für Wörtern kann man das Problem einfach lösen. Eine Methode sucht nach passenden Stellen, die auf den Suchausdruck zutreffen. Regular expressions sind in JavaScript ‚out of the box‘, ohne den import eines zusätzlichen Moduls verfügbar.  
Eine neue regular expression wird erstellt indem alle Unterstriche des Suchsatzes mit einem Platzhalter für ein Wort ([a- z|ä|ö|ü|ß]+) ersetzt werden. Als Wort wird eine Reihe der Buchtaben A-Z, Ä, Ö, Ü und ß, deren Länge mindestens 1 oder größer ist definiert. Mithilfe der match-Methode und den flags g für global und i für insensitive wird im gesamten Buch unabhängig von Groß- und Kleinschreibung nach passenden Stellen gesucht. Die als Array gespeicherten Resultate werden anschließend auf die Konsole ausgegeben.  
Die Lösung wurde in JavaScript implementiert und mit NodeJS v16.17.1 getestet. Das Programm nimmt beim Ausführen den Dateipfad der Beispieldatei als Parameter. Ist dieser nicht vorhanden führt dies zu einem Error.

## Beispiele

**stoerung0.txt**  
das kommt mir gar nicht richtig vor

**stoerung1.txt**  
ich muß in clara verwandelt  
ich muß doch clara sein

**stoerung2.txt**  
fressen katzen gern spatzen  
fressen spatzen gern katzen

**stoerung3.txt**  
das spiel fing an  
das publikum fing an

**stoerung4.txt**  
ein sehr schöner tag

**stoerung5.txt**  
wollen sie so gut sein
