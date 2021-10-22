# Groupomania. 
Construction d'un réseau social interne pour les employés de Groupomania leur permettant de poster des messages, des images et de pouvoir réagir aux differents posts.

# Objectif 
* Création d'un compte et connection
* Les employés connectés ont accès aux differents posts et peuvent les commenter
* Les employés peuvent modifier leur compte et le supprimer.
* Les administrateurs peuvent supprimer les posts, les commentaires ou les comptes des employés.

# Technologies
* node.js
* mySql
* vue.js
* css

# Setup

```
npm install
```

### front

```
npm run serve
```

### back

```
nodemon server
```


vous pouvet créer un fichier .env comme suit avec vos propre valeurs

```
DB_NAME=groupomania

DB_USER=root

DB_PASS=root

DB_HOST='localhost'

DB_PORT='8889'

DB_SECRET_TOKEN= 'TOKEN'
```
