# Aufgabe 5: Hüpfburg

## Lösungsidee


Alle möglichen Sprungfolgen werden betrachtet. Kommen Sasha und Mika mit der gleichen Anzahl an Sprüngen auf dasselbe Feld, ist der Parcours möglich, wenn dies nicht der Fall ist, ist der Parcours unmöglich.  
Dabei ist es wichtig herauszuheben, dass nicht jede Sprungfolge endlich ist. Die Protagonisten können eine bestimmte Felderfolge unendlich durchlaufen. Sie stecken dann in einer Schleife fest. Doch das heißt nicht, dass Schleifen in jedem Fall kontraproduktiv sind. Schleifen sind oftmals essenziell, um einen Lösungsweg zu finden. Es ist wichtig zu unterscheiden. Nur wenn alle möglichen Sprungfolgen der beiden Protagonisten in einer gemeinsamen Schleife feststecken, kann man mit Sicherheit sagen, dass der Parcours unmöglich ist.

## Umsetzung


Der Parcours wird als Graph dargestellt. Er wird in einer Map gespeichert. Die aktuelle Sprungfolge der beiden Protagonisten beinhaltet nur ihr Startfeld. Schrittweise wird der Sprungablauf breitensuchartig simuliert. Dabei werden alle möglichen Verzweigungen als eigene Sprungfolgen gespeichert.  
Landen Sasha und Mika auf dem gleichen Feld wird die Sprungfolge ausgegeben und das Programm beendet. Führen zwei Sprungfolgen im gleichen Schritt auf dasselbe Feld, oder das letzte Feld stellt sich als Sackgasse heraus, kann die Sprungfolge entfernt werden.  
Parcours können nur unter zwei Szenarien unmöglich sein. Entweder führen alle Sprungfolgen in eine Sackgasse oder sie bleiben in einer gemeinsame Schleifen stecken. Gemeinsame Schleifen sind Abschnitte bei welchem alle Sprungfolge der Protagonisten an einem Index A dasselbe Feld wie bei einem unterschiedlichen Index B haben. A und B müssen bei allen Sprungfolgen gleich sein, nur die Felder von A und B dürfen sich unter den Sprungfolge selbstverständlich unterscheiden.  
Die Lösung wurde in JavaScript implementiert und mit NodeJS v16.17.1 getestet. Das Programm nimmt beim Ausführen den Dateipfad der Beispieldatei als Parameter. Ist dieser nicht vorhanden führt dies zu einem Error.

## Beispiele

**huepfburg0.txt**  
Dieser Parcours kann erfolgreich absolviert werden!  
Sasha: 1, 18 ,13 ,10  
Mika: 2, 19, 20, 10

**huepfburg1.txt**  
Dieser Parcours kann erfolgreich absolviert werden!  
Sasha: 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 4  
Mika: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 1, 2, 3, 4

**huepfburg2.txt**  
Dieser Parcours kann erfolgreich absolviert werden!  
Sasha: 1, 51, 76, 59, 116, 112, 95, 8, 51  
Mika: 2, 106, 136, 108, 100, 12, 114, 3, 51

**huepfburg3.txt**  
Dieser Parcours kann nicht absolviert werden!

**huepfburg4.txt**  
Dieser Parcours kann erfolgreich absolviert werden!  
Sasha: 1, 99, 89, 79, 78, 77, 76, 66, 56, 55, 54, 44, 43, 33, 23, 13, 12  
Mika: 2, 12, 11, 100, 2, 12, 11, 100, 2, 12, 11, 100, 2, 12, 11, 100, 12

