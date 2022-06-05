const express = require("express");
const router = express.Router();
const passport = require("passport");

//route which redirects the user to google
router.get("/google", passport.authenticate("google", { scope: ['profile'] }));

//popup where authentication is done
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/jim",
  }),
  (req, res) => {
    res.redirect("/success");
    
  }
);

//logout route
router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;