const jwt = require('jsonwebtoken');

const JsonToken = userId => {
  return jwt.sign({ id: userId }, process.env.MY_SECRET_KEY, {
    expiresIn: '15d',
  });
};

module.exports = JsonToken;

//here the token payload is encrypted by using the id, you can encrypte your token either by id+name or any combination..
//now whenever you decode the token, you will get value which you provided for encryption.
//i can only get id by decoding my token, and through Id i can access the user data.