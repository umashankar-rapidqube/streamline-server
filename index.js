var express = require("express");
var morgan = require("morgan");
var passport = require("passport");
var BearerStrategy = require('passport-azure-ad').BearerStrategy;

var options = {
    identityMetadata: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration/",
    clientID: "e1f1830e-d3d7-451a-a213-54f9c8f02d67",
    validateIssuer: false,
    loggingLevel: 'warn',
    passReqToCallback: false
};

// Check for client id placeholder
if (options.clientID === 'YOUR_CLIENT_ID') {
    console.error("Please update 'options' with the client id (application id) of your application");
    return;
}

var bearerStrategy = new BearerStrategy(options,
    function (token, done) {
        // Send user info using the second argument
        done(null, {}, token);
    }
);

var app = express();
app.use(morgan('dev'));

app.use(passport.initialize());
passport.use(bearerStrategy);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/hello",
    passport.authenticate('oauth-bearer', {session: false}),
    function (req, res) {
        var claims = req.authInfo;
        console.log('User info: ', req.user);
        console.log('Validated claims: ', claims);
        
        res.status(200).json({'name': claims['name']});
    }
);



/**************************************APIs*******************************************/

  app.get('/', (req, res) =>   
  res.send('Hello World!'))

  app.get('/api/issues',passport.authenticate('oauth-bearer', {session: false}), async (req, res) => {
    const data = await issues.issues();
    res.status(200).send(data);    
  } 
  );

  app.get('/api/leaves', passport.authenticate('oauth-bearer', {session: false}), async (req, res) => {
    const data = await leaves.leaves();
    res.status(200).send(data);    
  } 
  );

  
/**************************************APIs - end*******************************************/

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});