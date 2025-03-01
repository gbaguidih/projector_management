# projector_management

Membre du groupe:
1- Hillary : Etudiant 1
2- Fidélia : Etudiant 2
3- Bruno : Etudiant 3


Démarage du server --->  node server 


# Projector Management System

## Description

This is a Node.js/Express API for managing projectors and reservations. It provides CRUD operations for projectors with JWT authentication protection on modifying endpoints.

## Technologies Used

- Node.js
- Express
- SQLite
- JWT (JSON Web Tokens)

## Installation

1. Clone the repository
2. Install dependencies:
   bash
   npm install
   l
3. Create .env file with:

   JWT_SECRET=your_secret_key

4. Initialize database:
   bash
   node config/init_db.js
5. Start the server:
   bash
   npm start

## API Endpoints

### Projectors

- GET /projectors - Get all working projectors
- POST /projectors - Add new projector (requires authentication)
- PUT /projectors/:id - Update projector (requires authentication)
- DELETE /projectors/:id - Delete projector (requires authentication)

## Authentication

Authentication is handled using JWT tokens. To access protected routes:

1. Obtain token from login endpoint
2. Include token in Authorization header:

   Authorization: Bearer <token>

## Example Requests

### Get Projectors

bash
curl -X GET http://localhost:3000/projectors

### Add Projector

bash
curl -X POST http://localhost:3000/projectors \
 -H "Authorization: Bearer <token>" \
 -H "Content-Type: application/json" \
 -d '{"name": "Projector 1", "status": "working"}'

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
