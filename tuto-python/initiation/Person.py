class Person:

    def __init__(self, first_name, last_name, ag):
        self.first_name = first_name
        self.last_name = last_name
        self.ag = ag

    def __check__(self):
        while True:
            self.first_name = input("Entrer votre prénom: ")
            if not self.first_name:
                print("Vous n'avez pas entré votre prénom.")
            else:
                break

        while True:
            self.last_name = input("Entrer votre nom: ")
            if not self.last_name:
                print("Vous n'avez pas entré votre nom.")
            else:
                break

        while True:
            self.ag = input("Entrer votre âge: ")
            if not self.ag:
                print("Vous n'avez pas entré votre âge.")
            elif not self.ag.isdigit():
                print("L'âge doit être un nombre.")
            else:
                break

 
    def __str__(self):
        return f"Je m'appelle {self.first_name} {self.last_name} et j'ai {self.ag} ans"
    

if __name__ == "__main__":

    person = Person("","","")

    person.__check__()

    print(person)