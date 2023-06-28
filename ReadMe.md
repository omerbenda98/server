# Getting Started with node server App

## Installation

Install the node_modules

```
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.
- Runs production enviorment using mongos ATLAS.
- Connection string: "mongodb+srv://admin:Aa123456!@cluster0.u45jsdg.mongodb.net/"

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits

The print at the terminal will be blue with the message:

`server run on: http://localhost:8181/`

And if there are no login errors you should see the message painted in cyan color:

`connected to MongoDb!`

### Available Routes

#### Register a new user

```
  POST /api/auth/register
```

request:

- firstName:
  -- string
  -- required
  -- min 2
  -- max 256
- middleName:
  -- string
  -- max 256
- lastName:
  -- string
  -- required
  -- min 2
  -- max 256
- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- required
  -- must be email
- password:
  -- string
  -- required
- imageUrl:
  -- string
  -- must be url
- imageAlt:
  -- string
  -- min 2
  -- max 256

* state:
  -- string
  -- max 256
* country:
  -- string
  -- required
  -- min 2
  -- max 256
* city:
  -- string
  -- required
  -- min 2
  -- max 256
* street:
  -- string
  -- required
  -- min 2
  -- max 256
* houseNumber:
  -- number
  -- required
  -- min 1
* zipCode:
  -- number
  -- min 4

- isBusiness:
  -- boolean
  -- true/false

#### Login a user

```
  POST /api/auth/login
```

- returns token

#### get all users

```
  GET /api/users
```

- must provide token
- must be admin

#### get specific user

```
  GET /api/users/:id
```

- must provide token
- must be admin or registered user

#### For User information update

```
  PUT /api/users/:id
```

- must provide token
- must be registered user

#### For changing isBusiness status

```
  PATCH /api/users/:id
```

- must provide token
- must be registered user

#### For deleting a user

```
  DELETE /api/users/:id
```

- must provide token
- must be registered user or admin

#### To get all cards

```
  GET /api/cards

```

#### To get a specific card

```
  GET /api/cards/:id
```

#### To receive all cards of the registered user

```
  GET /api/cards/my-cards
```

- must provide token

#### To create a new card

```
  POST /api/cards
```

request:

- must provide token
- must registered as Business user

request:

- title:
  -- string
  -- required
  -- min 2
  -- max 256
- subTitle:
  -- string
  -- required
  -- min 2
  -- max 256
- description:
  -- string
  -- required
  -- min 2
  -- max 1024
- state:
  -- string
  -- max 256
- country:
  -- string
  -- required
  -- min 2
  -- max 256
- city:
  -- string
  -- required
  -- min 2
  -- max 256
- street:
  -- string
  -- required
  -- min 2
  -- max 256
- houseNumber:
  -- number
  -- required
  -- min 1
- zipCode:
  -- number
  -- min 4
- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- required
  -- must be email
- web:
  -- string
  -- must be url
- url:
  -- string
  -- must be url
- alt:
  -- string
  -- min 2
  -- max 256

#### To edit a card

```
  PUT /api/cards/:id
```

- must provide token of the user which created the card

#### To add a like to a card

```
  PATCH /api/cards/:id
```

- must provide token

#### To delete a business card

```
  DELETE /api/cards/:id
```

- must provide token of the user which created the card or must be admin
