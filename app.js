// IMPORT PACKAGES
var expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();


// SETUP APP
mongoose.connect("mongodb://localhost:27017/hotel_app",{useNewUrlParser : true , useUnifiedTopology : true , useFindAndModify: false});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// STATIC FOLDERS
app.use(express.static("public"));
app.use(express.static("utilities"));

// IMPORT MODELS
var Hotel = require("./models/hotel");

// IMPORT ROUTES
var hotelRoutes = require("./routes/hotels");

// HOME PAGE ROUTE
app.get("/",function(req,res){
    res.render("home");
});

// REFERING HOTEL ROUTES
app.use("/hotels", hotelRoutes);


app.listen(3000,function(){
    console.log("Server Started");
});



