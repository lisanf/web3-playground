require('dotenv').config();
const axios = require('axios');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');


const endpoints = {
  welcome(req, res) {
    const responseString = "Hello Web3! 🦄";
    res.send(responseString);
  },

  async getBalanceWei(req, res) {
    // Obtener la dirección de la billetera desde los parámetros de la solicitud
    const { address } = req.params;

    const apiKey = process.env.INFURA_API_KEY;
    const endpoint = `https://mainnet.infura.io/v3/${apiKey}`;

    try {
      const response = await axios.post(endpoint, {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const weiBalance = response.data.result;

      console.log({ balance: weiBalance, unit: 'wei' });
      res.json({ balance: weiBalance, unit: 'wei' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  },

  async getBalanceEther(req, res) {
    // Obtener la dirección de la billetera desde los parámetros de la solicitud
    const { address } = req.params;

    const apiKey = process.env.INFURA_API_KEY;
    const endpoint = `https://mainnet.infura.io/v3/${apiKey}`;

    try {
      const response = await axios.post(endpoint, {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const weiBalance = response.data.result;
      const web3 = new Web3();
      const ethBalance = web3.utils.fromWei(weiBalance, 'ether');

      console.log({ balance: ethBalance, unit: 'ether' });
      res.json({ balance: ethBalance, unit: 'ether' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  },

  async getTokenBalances(req, res) {
    const { address } = req.params;
  
    const apiKey = process.env.INFURA_API_KEY;
    const endpoint = `https://mainnet.infura.io/v3/${apiKey}`;
    const web3 = new Web3(endpoint);
  
    const tokenDataPath = path.join(__dirname, '..', 'database', 'tokenData.json');
  
    try {
      // Cargar el archivo tokenData.json
      const tokenData = JSON.parse(fs.readFileSync(tokenDataPath, 'utf-8'));
  
      const tokenBalances = {};
  
      for (const token of tokenData) {
        const { name, contractAddress, abi } = token;
  
        // Verificar si es el token ETH
        if (name === 'ETH') {
          const weiBalance = await web3.eth.getBalance(address);
          const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
          tokenBalances[name] = ethBalance;
        } else {
          const contract = new web3.eth.Contract(abi, contractAddress);
          const balance = await contract.methods.balanceOf(address).call();
          tokenBalances[name] = balance;
        }
      }
  
      res.json({ balances: tokenBalances });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }            

};

module.exports = endpoints;
