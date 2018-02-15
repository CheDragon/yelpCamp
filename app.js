var express         =  require("express"),
    app             =  express(),
    bodyParser      =  require("body-parser"),
    mongoose        =  require("mongoose"),
    flash           =  require("connect-flash"),
    passport        =  require("passport"),
    LocalStrategy   =  require("passport-local"),
    methodOverride  =  require("method-override"),
    Campground      =  require("./models/campground"),
    Comment         =  require("./models/comment"),
    User            =  require("./models/user"),
    seedDB          =  require("./seeds");
    
    //Requiring routes
var indexRoutes         = require("./routes/index"),
    commentRoutes       = require("./routes/comments"),
    campgroundsRoutes   = require("./routes/campgrounds");
    
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });  

//mongoose.connect("mongodb://rene:assassin@ds237748.mlab.com:37748/yelpcamp", { useMongoClient: true });  
//mongoose.connect("mongodb://localhost/yelp_camp_price", { useMongoClient: true });  


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();     //Seed the DB


//Passport configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dogs!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){       //Middleware Anything in this function will be available in our template
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();                             //Since it is a middleware it needs us to move on
});

//Using the routes in the router
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started!");
});