const router = require('express').Router();
const passport = require('passport');


router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.json(err);
        req.logIn(user,(err)=>{
            if(err) return res.json(err);
            return res.json({message:"Login Success",data:user,status:true})
        })
    })(req,res,next)

});
let validate = (req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.json(null);
    }
}
router.get('/login',validate,(req,res)=>{
    res.json(req.user);
});
router.get('/logout',(req,res)=>{
    if(req.user){
        req.logOut();
        res.send({message:"succesfully Logout",status:true});
    }else{
        res.json({message:"Already Logout",status:false});
    }
})

module.exports = router;