//require global files
const moment = require('moment');

//require local files
const User = require('../models/user');
const Habit = require('../models/habit');


//exporting user profile
module.exports.profile = function(req,res){
    
    Habit.find({}).populate("user").exec(function(err, habit){
        return res.render('user_profile', {
            title: "HabitTracker | Profile",
            habit:  habit
        });
    })
}

//controller for viewing all the habits of a user
module.exports.viewAllHabit = function(req,res){
    
    Habit.find({}).populate("user").exec(function(err, habit){
        return res.render('list', {
            title: "HabitTracker | Profile",
            habit:  habit,
            moment : moment
        });
    })
}

//signing up a user
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    else{
        return res.render('user_sign_up',{
            title:"Habit Tracker | Sign Up"
        })
    }
}

//signing a user
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title : "Habit Tracker | Sign In"
    })
}

//creating user
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirmpassword){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err) {console.log("eror in finding the user in signup"); return; }

        if(!user){
            User.create(req.body,function(err,user){
                if(err) {console.log("eror in creating user in signup"); return; } 

                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('/users/sign-up');
        }
    })
    
}


//user session creation and desturction
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/')
}
