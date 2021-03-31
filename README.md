<!-- PROJECT LOGO -->
[![Notes App](/images/preview.png)](https://google-keep-clone-ashen.vercel.app)<br />
<br />
<p align="center">
    <h2 align="center">Meep</h1>

  <h3 align="center">A Full Stack PERN Google Keep clone</h3>

  <p align="center">
    <a href="https://google-keep-clone-ashen.vercel.app"><strong>Visit the website »</strong></a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project


### Built With

- [Sequelize](https://sequelize.org/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://material-ui.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

To run this you need to have [Node.js](https://node.js.org/), [NPM](https://www.npmjs.com/) (comes with node.js) and [PostgreSQL](https://www.postgresql.org/) installed.

### Setup

After cloning the repo:

### To get the server up and running you need to:

1. Navigate into the `server` folder and run:

```sh
npm install
```

2. Create an `.env` file and inside of it write:

```
DB_NAME = {{YOUR_DATABASE_NAME_HERE}}
DB_USERNAME = {{YOUR_POSTGRESQL_USERNAME_HERE}}
DB_PASSWORD = {{YOUR_POSTGRESQL_PASSWORD_HERE}}
```

3. After that to start the server you need to run, in the `server` folder,

```sh
npm run dev
```

---

### To get the React front end up and running you need to:

1. Navigate into the `front-end` folder and run:

```sh
npm install
npm start
```

<!-- ROADMAP -->

## Roadmap

General:

- [x] dark theme / light theme
- [x] can log in
- [ ] can log out
- [ ] working searchbar
- [ ] settings menu
- [ ] can change note layout to `list` or `grid`
- [ ] export all notes as `.txt`
- [ ] select multiple notes and delete, add labels, etc. to selected
- [ ] can click and drag to select multiple notes
- [ ] drag and drop notes

Drawer on the left:

- [x] exists
- [x] menu button on navbar to toggle expanded drawer
- [x] notes button
- [x] archived notes button
- [ ] reminder notes button
- [ ] a button for every label

Can add and delete:

- [x] notes
- [x] labels
- [ ] reminders

Note:

- [x] can edit note's title & content
- [x] can pin a note
- [x] can archive a note
- [x] can change note's color
- [ ] can make copy of note
- [ ] undo / redo buttons when editing note
- [ ] can add / remove list items
- [ ] can add / remove a reminder
- [ ] can add / remove a collaborator
- [ ] can add / remove an image
- [ ] can add / remove a drawing

<!-- LICENSE -->

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Lucas Mercado - lucasmercado101@gmail.com - https://lucasmercado101.github.io/

Project Link: https://github.com/Lucasmercado101/google-keep-clone

Site Link: https://google-keep-clone-ashen.vercel.app

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [MobX](https://mobx.js.org/)
- [React Query](https://react-query.tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Jest](https://jestjs.io/)
- [Axios](https://github.com/axios/axios)
- [React Masonry CSS](https://www.npmjs.com/package/react-masonry-css)
