# Création d'une app capable d'écrire des chansons de haute qualité pour l'app Suno

- Choix d'un style parmis une liste, d'un mood, d'un style d'écriture, et toute autres caractéristiques liées à la musique, qui détermineront un style d'écriture et un style musical.

- En fonction des différents choix, un context sera construit pour deonner une direction au llm à l'écriture de la musique et du prompt pour Suno.

- Utilisation de l'api deepseek avec résonnement pour les générations finales.

## Points clés :

Afin de construire l'application, une recherche appronfondit des meilleures méthodes de construction pour les prompt Suno est nécessaire.

Pour l'écriture musicale une recherche en technique et histoire musicale est nécessaire pour rendre l'écriture la plus naturelle et proche des style choisis possible.

Dans l'idée, le développement de cette app doit se faire avec une recherche appronfondit sur internet pour avoir un très grand corpus de data, puis d'écrire les règles qui détermineront le context pendant l'utilisation de l'app.

A la mise en prod de l'app les données techniques seront écrites en dur pour obtenir instantanément les contexts nécessaires en fonction de la demande.

Le client pourra écrire sa demande de musique et sélectionner les différentes caractéristiques, puis utiliser le bouton générer pour obtenir : le lyric (parfaitement structuré pour Suno en 2026), le prompt positif Suno, le prompt négatif court et les indications de réglages avancées configurer pour être au plus proche du style voulu.

L'interface devra être sobre, propre et intuitive.

Une zone principale sera consacrée à la création d'une nouvelle musique.

Une liste latérale avec filtres permettra d'afficher des génération précédente (enregistré en bdd) et/ou de réutiliser des réglages.

Possibilité de mettre en favoris des générations précédente ou celle en cours.

La BDD sera prisma sqlite.

Possibilité d'uploader un mp3 ou un wav en l'associant à une génération (le filtre pourra n'afficher que les générations ayant un fichier associé, limite l'upload à ces types de fichiers, ils seront uploader dans public).

Prévoir des informations statistiques pour plus tard (ex: nombre de mots, langue utilisée, ... toute stat jugée utile et intéressante).
