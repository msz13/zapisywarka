Feature: Walidacja rejestracji konta

    
    Scenario: Użytkownik rejestruje się w systemie
        Given Organizator zapisów podał kod dostępu "TbkdNPHf"
        And Organizator zapisów wypełnił dane rejestracji konta
            | Nazwa_użytkownika | Hasło      | Potwierdzenie_hasła |
            | Jan23             | Pasword_01 | Pasword_01          |
        When Próbuję się zarejestrować
        Then Przekierowany jest na stronę logowania

     # Rule: Użytkownicy powinni być unikalni
     Scenario Outline: Użytkownik, który próbuje się zarejestrować podaje istniejącą nazwę użytkownika
        Given Baza użytkowników zawiera następujących organizatorów
         | Nazwa_użytkownika |
         | wojtek            |
         When Organizator zapisów próbuje utworzyć konto użytkownika <nazwa_użytkownika>
         Then Nie może procesować rejestracji i widzimi komunikat "Nazwa użytkownika już istnieje"

         Examples:
         | przypadek | nazwa_użytkownika |
         | ta sama nazwa | wojtek |
         | duza litera   | Wojtek |

    
# zasady techniczne
    #Rule Wszystkie pola formularza są obowiązkowe
#Nazwa użytkownika
    #Rule Nazwa użytwkonika powinna zawierać znaki dozwolone dla url
    #Rule Nazwa użytkownika powinna zawierać mieć długoś 3 - 32 

      

Scenario Outline: User name validation
     Given Organizator zapisał imię zawierające znak <znak>
     When Próbuje się zarejestrować
     Then Może się zarejestrować

Example: Znak
| a| b | c | d | e | f | g | h | i | j | k | l | m | n| o | p | r | s | q | t | u | w | y | z | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | R | S | Q | T | U | W | Y | Z | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | - | . | _ | ~ |


Scenario Outline: User name validation
     Given Organizator zapisał imię zawierające znak <znak>
     When Próbuje się zarejestrować
     Then Nie może procesować rejestracji konta i widzi komunikat błędu

Example: Znak
| / | ? | # | [ | ] | @ | ! | $ | & | ' | ( | ) | * | + | , | ; | = | ą | ę | ć | ń | ź | ż |


Scenario Outline: Organizator zapisów podane nieprawidłową nazwę użytkownika
         When Organizator zapisów próbuje utworzyć konto użytkownika <nazwa_użytkownika>
         Then Nie może procesować rejestracji i widzimi komunikat <komunikat>

         Examples:
         | przypadek | nazwa_użytkownika |komunikat|
         | zbyt króka nazwa | wojtek |
         | zbyt długa nazwa   | Wojtek |
       
Scenario Outline: Organizator zapisów podaje nieprawidłowe znaki w nazwie użytkownika
         When Organizator zapisów próbuje utworzyć konto użytkownika <nazwa_użytkownika>
         Then Nie może procesować rejestracji i widzimi komunikat <komunikat>

         Examples:
         | przypadek | nazwa_użytkownika |komunikat|
         | dozwolone znaki | A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z
a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z
0	1	2	3	4	5	6	7	8	9 -	_	.	~ |
 