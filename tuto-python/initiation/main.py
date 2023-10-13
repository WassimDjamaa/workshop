villes = [
    "Paris",
    "Madrid",
    "Alger",
    "Tunis",
    "Rome",
    "Londre",
    "Berlin",
    "New York",
    "Tokyo",
    "Pekin",
]

villeEnter = input("Entrez une ville: ")

if villeEnter in villes:
    print(f"{villeEnter} existe deja ...")
else:
    villes.append(villeEnter)
    print(villes)
