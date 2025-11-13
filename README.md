# Medicare+

**Medicare+** est une application web médicale interactive qui permet à la fois aux patients de gérer leurs rendez-vous et aux administrateurs de suivre les activités de la clinique à travers un tableau de bord simple et intuitif.

---

## Sommaire

1. [ Présentation du projet](#-présentation-du-projet)
2. [ Fonctionnalités principales](#%EF%B8%8F-fonctionnalités-principales)
3. [ User Stories](#-user-stories)
4. [ Dashboard (Espace Admin)](#-dashboard-espace-admin)
5. [ Structure du projet](#-structure-du-projet)
6. [ Technologies utilisées](#-technologies-utilisées)
7. [ Installation & Utilisation](#-installation--utilisation)
8. [ Auteurs](#-auteurs)
9. [ Notes supplémentaires](#-notes-supplémentaires)

---

## Présentation du projet

**Medicare+** est un projet front-end visant à digitaliser les services d'une clinique.  
Il permet aux visiteurs de :

- Trouver un médecin selon sa spécialité.
- Prendre rendez-vous en ligne.
- Suivre leurs données de santé.

Et aux administrateurs (ou secrétaires) de :

- Gérer les médecins, spécialités et disponibilités.
- Consulter, filtrer et valider les rendez-vous.
- Synchroniser toutes les données sans backend, via localStorage.

---

## Fonctionnalités principales

### Page d’accueil

- Carrousel automatique de **conseils santé** (JavaScript pur).
- **Mode clair/sombre** enregistré dans localStorage.
- **Recherche dynamique** d’articles ou de médecins en temps réel.

### Page “Médecins”

- Liste interactive avec **photo, spécialité et disponibilité**.
- **Filtrage par spécialité** (bonus).
- Ajout aux **favoris** avec persistance locale (bonus).

### Page “Rendez-vous”

- Formulaire dynamique avec **validation en direct**.
- Gestion interactive : **ajouter, modifier, supprimer** un rendez-vous.
- Sauvegarde automatique dans localStorage.

### Page “Suivi Santé” _(bonus)_

- Ajout de **mesures médicales** : poids, tension, glycémie.
- **Moyenne automatique** recalculée à chaque ajout.
- **Indicateur visuel** du niveau de santé (vert/orange/rouge).

---

## Dashboard (Espace Admin)

### Objectif

Offrir à la secrétaire un **outil de gestion complet** sans écrire de code.

### Fonctionnalités

- **Page de connexion locale.**
- **CRUD Médecins** : ajouter, modifier, supprimer.
- **CRUD Spécialités** : gérer les catégories médicales.
- **Gestion des disponibilités** : définir les créneaux horaires.
- **Vue globale** de tous les médecins et rendez-vous.
- **Filtrage** des rendez-vous par médecin, date ou statut.
- **Validation / Annulation / Reprogrammation** des rendez-vous.
- **Export CSV ou JSON** _(bonus)_.
- **Synchronisation** automatique avec les pages publiques via localStorage.

---

## Structure du projet

Medicare+
│
├── admin/ # Espace administrateur (dashboard)
│ ├── dashboard.html # Page principale du dashboard
│ ├── login.html # Page de connexion
│ ├── js/ # Scripts du dashboard
│ └── css/ # Styles du dashboard
│
├── data/
│ └── data.json # Données simulées (médecins, rendez-vous, spécialités)
│
├── public/ # Pages publiques du site
│ ├── index.html # Page d'accueil
│ ├── doctors.html # Page des médecins
│ ├── appointments.html # Page des rendez-vous
│ ├── health.html # Page du suivi santé
│ ├── js/ # Scripts publics
│ └── css/ # Feuilles de styles
│
└── README.md # Documentation du projet

### Technologies utilisées

## Technologie ## Rôle

HTML5 / CSS3 Structure et style du site
JavaScript Vanilla Logique dynamique et interactions
LocalStorage Persistance locale des données
JSON Format de stockage des données
Bootstrap Mise en page responsive
Font Awesome Icônes et symboles

### Notes supplémentaires

-Les données sont locales : aucune base de données réelle.

-Le projet peut facilement évoluer vers une version connectée à une API REST.

-Chaque fonctionnalité est codée sans dépendances externes, pour renforcer la maîtrise du JavaScript natif..
