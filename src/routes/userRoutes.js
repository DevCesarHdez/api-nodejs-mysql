const { Router } = require('express');
const user = require('../models/user');
const router = Router();

router.get('/', (req, res) => {
  user.getUsers((err, rows) => {
    res.json(rows).status(200)
  })
})

router.post('/', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = {
    id: null,
    username,
    email,
    password
  }

  user.insertUser(newUser, (err, data) => {
    console.log(data);
    if (data && data.InsertId) {
      res.status(200).json({
        success: true,
        data,
        msg: "User created"
      })
    }
  });

});

router.put('/:id', (req, res) => {
  const { username, email, password } = req.body;
  const { id } = req.params;
  const userData = {
    id,
    username,
    email,
    password
  }
  user.updateUser(userData, (err, data) => {
    if (data.success) {
      res.status(200).json(data)
    }
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  user.deleteUser( id, (err, data) => {
    if (data.success) {
      res.status(200).json({
        data
      })
    }else {
      res.status(400).json({
        err
      })
    }
  })
});

module.exports = router;
