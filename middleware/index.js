var Campground  =   require("../models/campground");
var Comment  =   require("../models/comment");

//All the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){                  //Is user logged in
        Campground.findById(req.params.id, function(err, foundCampground){  
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //Does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){                  //Is user logged in
        Comment.findById(req.params.comment_id, function(err, foundComment){  
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //Does user own comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");    //Call it before but gets rendered after the next
    res.redirect("/login");
};

module.exports = middlewareObj;