# Utilisation de l'image officielle Node.js comme image de base
FROM node:16

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de l'application dans le conteneur
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application va écouter
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
