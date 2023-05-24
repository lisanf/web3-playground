const express = require('express');
const endpoints = require('../controllers/apiWeb3');

const router = express.Router();

router.get('/', endpoints.welcome);
router.get('/balance-wei/:address', endpoints.getBalanceWei);
router.get('/balance-ether/:address', endpoints.getBalanceEther);
router.get('/balance-tokens/:address', endpoints.getTokenBalances);



module.exports = router;
