# Movie API (IMDB Database)

This API provides access to a movie database sourced from IMDB. You can retrieve movie data and genres with various filters and parameters.

## Available Routes

### 1. `/api/movies`
- Returns a list of up to 12 movies with a count of the total.
- Accepts the following query parameters:
  - `title` (string): Filter movies by title.
  - `runtimeMin` (number): Minimum runtime of the movies.
  - `runtimeMax` (number): Maximum runtime of the movies.
  - `genres` (string[]): Filter movies by genres (array of genre names).
  - `sort` (string): Sort the movies by a specific field and order. Possible values:
    - `title ASC` or `title DESC`
    - `release_year ASC` or `release_year DESC`
    - `rating ASC` or `rating DESC`
    - `runtime ASC` or `runtime DESC`
  - `page` (number): The page number for pagination (pagination starts at 0).

### 2. `/api/genres`
- Returns all possible movie genres.
- No parameters required.

## Development Setup

1. Clone the repository.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the project in development mode:

   ```bash
   npm run dev
   ```

4. To build the project for production:

   ```bash
   npm run build
   ```

5. Start the built project:

   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License.

---

# API de films (Base de données IMDB)

Cette API permet d'accéder à une base de données de films provenant d'IMDB. Vous pouvez récupérer des informations sur les films et les genres avec différents filtres et paramètres.

## Routes disponibles

### 1. `/api/movies`
- Renvoie une liste de jusqu'à 12 films avec un nombre total.
- Accepte les paramètres suivants :
  - `title` (string): Filtrer les films par titre.
  - `runtimeMin` (number): Durée minimale des films.
  - `runtimeMax` (number): Durée maximale des films.
  - `genres` (string[]): Filtrer les films par genres (tableau de noms de genres).
  - `sort` (string): Trier les films par un champ spécifique et un ordre. Valeurs possibles :
    - `title ASC` ou `title DESC`
    - `release_year ASC` ou `release_year DESC`
    - `rating ASC` ou `rating DESC`
    - `runtime ASC` ou `runtime DESC`
  - `page` (number): Numéro de page pour la pagination (la pagination commence à 0).

### 2. `/api/genres`
- Renvoie tous les genres de films possibles.
- Aucun paramètre requis.

## Configuration de développement

1. Clonez le dépôt.
2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Lancez le projet en mode développement :

   ```bash
   npm run dev
   ```

4. Pour compiler le projet pour la production :

   ```bash
   npm run build
   ```

5. Démarrez le projet compilé :

   ```bash
   npm start
   ```

## Licence

Ce projet est sous licence MIT.

---

# API de Filmes (Base de Dados IMDB)

Essa API fornece acesso a um banco de dados de filmes retirados do IMDB. Você pode obter dados de filmes e gêneros com diversos filtros e parâmetros.

## Rotas Disponíveis

### 1. `/api/movies`
- Retorna uma lista de até 12 filmes com um contador do total.
- Aceita os seguintes parâmetros de consulta:
  - `title` (string): Filtra os filmes pelo título.
  - `runtimeMin` (number): Duração mínima dos filmes.
  - `runtimeMax` (number): Duração máxima dos filmes.
  - `genres` (string[]): Filtra os filmes pelos gêneros (array de nomes de gêneros).
  - `sort` (string): Ordena os filmes por um campo específico e ordem. Valores possíveis:
    - `title ASC` ou `title DESC`
    - `release_year ASC` ou `release_year DESC`
    - `rating ASC` ou `rating DESC`
    - `runtime ASC` ou `runtime DESC`
  - `page` (number): O número da página para paginação (a paginação começa em 0).

### 2. `/api/genres`
- Retorna todos os gêneros de filmes possíveis.
- Nenhum parâmetro necessário.

## Configuração de Desenvolvimento

1. Clone o repositório.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o projeto em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Para compilar o projeto para produção:

   ```bash
   npm run build
   ```

5. Inicie o projeto compilado:

   ```bash
   npm start
   ```

## Licença

Este projeto está licenciado sob a Licença MIT.