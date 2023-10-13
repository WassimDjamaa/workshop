class Personne : 
    def __init__(self, prenom, nom, age) :
        self.age = age
        self.prenom = prenom
        self.nom = nom
    

prenom = input("Entrer votre prenom : ")
nom = input("Entrer votre nom : ")
age = input("Entrer votre age : ")

personneA = Personne(prenom, nom, age)

print(f"Je m'appelle {personneA.prenom} {personneA.nom} et j'ai {personneA.age} ans")

