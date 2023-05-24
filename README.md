## Web3 Playgroud 🦄


### Endpoints

- `GET /`: Welcome endpoint to confirm API availability.
- `GET /balance-wei/:address`: Retrieve Ethereum balance in Wei units.
- `GET /balance-ether/:address`: Retrieve Ethereum balance in Ether units.
- `GET /balance-tokens/:address`: Retrieve balances of popular ERC-20 tokens.

The base URL for the API is `/api`.

### Getting Started

To run the Ethereum Balance API:

1. Create a `.env` file in the project directory with the following variables:

```markdown
PORT=3000
DB_HOST=localhost
INFURA_API_KEY=YOUR_API_KEY

2. Install project dependencies:
```bash
npm install

3. Start the server:
```bash
npm start

4. Make sure to replace YOUR_API_KEY in the .env file with your actual Infura API key.
