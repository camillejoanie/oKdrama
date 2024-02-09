# OKDRAMAS

## Review your favorite Korean Dramas

Welcome to oKdramas, a full stack web application created for users to share their thoughts on their favorite Korean television show! Feel free to roam the site and utilize full functionality through creating your own user or logging in as Demo-User.

https://okdramas.onrender.com/

## Getting Started

1. Install dependencies

```
pipenv install -r requirements.txt
```

```bash
pipenv install Flask
```

```bash
pipenv install python-dotenv
```

```bash
pipenv install Jinja2
```

```bash
pipenv install Flask-WTF
```

```bash
pipenv install SQLAlchemy Flask-SQLAlchemy
```

```bash
pipenv install alembic Flask-Migrate
```

2. Create a .env file based on the example with proper settings for your development environment

3. Make sure the SQLite3 database connection URL is in the .env file

4. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```
pipenv shell
flask db upgrade
flask seed all
flask run
```

To run the React App in development, checkout the README inside the react-app directory.

## Get in Touch with the Developer:

Camille Huang: https://www.linkedin.com/in/camillejoanie/
