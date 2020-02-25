const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:query', (req, res) => {

    let userSearchInput = req.params.query;

    const api_token = process.env.IEX_API_TOKEN;

    let BASE_URL = 'https://cloud.iexapis.com/stable/stock/';

    let FETCH_URL = BASE_URL + userSearchInput + '/quote?' 
    + 'token=' + api_token;

    axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log('error ', error);
    })
   
});


module.exports = router;

