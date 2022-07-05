const express =  require('express');
const cors = require('cors');
const admin = require('firebase-admin');



var serviceAccount = require("./config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true

    }

app.use(cors(corsOptions))
app.use(express.json());





const checkAuthStatus = (req, res, next) => {
    //console.log(req)
    if (req.headers.authorization) {
        console.log(req.headers.authorization)


        admin.auth().verifyIdToken(req.headers.authorization)
          .then((decodedToken) => {
            console.log(decodedToken)
          })

        res.status(200).json({
          "message": "User is Authorized"
        })
      } else {

        res.status(401).json({
          "message": "User is Unauthorized"
        })
      }
}



app.use('/api/v1/test', checkAuthStatus);


module.exports = app;