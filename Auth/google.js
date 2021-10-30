const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports=(app,passport)=>{
const express=require('express')
const router=express.Router();
const app1=express()
app1.use(express.json())
const knex=require('../database/db')
  var data={}
  passport.use(new GoogleStrategy({
    clientID:'614082293657-m82o107ki2e1i9j1tu5s6vnboelm7kt5.apps.googleusercontent.com',
    clientSecret:'X0Rk5VRxr9tYI7DNxIPZPqjP',
    callbackURL: "http://localhost:8013/google/callback",
    passReqToCallback:true
  },
  (reqest, accessToken, refreshToken, profile, done) => {
    // console.log(profile._json);
    data["Name"]=profile.displayName
    data["Image"]=profile._json.picture
    data["email"]=profile._json.email
    done(null, profile)
    console.log(data)
    
    // router.post('/',(req,res)=>{
      const data1={
        Name:profile.displayName,
        Email:profile._json.email,
        Image_url:profile._json.picture
      }
      knex('google').insert(data1).then((data)=>{
        console.log("inserted")
      })
    // })
}
));

  
passport.serializeUser((user, done) => {
  done(null, user);
});

app.get('/',(req,res)=>{
  res.send('<a href="/auth/google">Authentication With Google</a>')
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile','email']
}));

app.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send("<center><h1>Welcome To My Site "+data.Name+"</h1><img src="+data.Image+"></img></center>")
});
    
}