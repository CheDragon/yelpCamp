var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:           "Cloud's Rest",
        image:          "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg",
        description:    "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. "
    },
    {   
        name:           "Desert Ground",
        image:          "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg",
        description:    "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. "
    },
    {
        name:           "Green Canyon",
        image:          "https://farm4.staticflickr.com/3541/3802455097_85490befa2.jpg",
        description:    "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. "
    }
];


function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
         if(err){    
          console.log(err);
         } else {        
          console.log("removed campgrounds!");
           
            //Add a few campgrounds
             data.forEach(function(seed){
                 Campground.create(seed, function(err, campground){
                     if(err){
                      console.log(err);
                     } else {
                        console.log("Added campground");
                        //Create a comment
                        Comment.create(
                            {
                                text:   "This place is great, wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                     }
                });
             });
        }
    });
}

module.exports = seedDB;


