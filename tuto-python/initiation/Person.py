class Person:

    def __init__(self, first_name, last_name, ag):
        self.first_name = first_name
        self.last_name = last_name
        self.ag = ag

prenom = input("Entrer votre prenom : ")
nom = input("Entrer votre nom : ")
age = input("Entrer votre age : ")

personneA = Person(prenom, nom, age)

print(f"Je m'appelle {personneA.first_name} {personneA.last_name} et j'ai {personneA.ag} ans")
