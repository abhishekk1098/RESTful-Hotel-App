var express = require("express");
var router  = express.Router();
var Hotel = require("../models/hotel");

// INDEX ROUTE
router.get("/",function(req,res){
    // find hotel
    Hotel.find({},function(err,allHotels){
        if(err){
            console.log(err);
        } else {
            res.render("index",{hotels : allHotels});
        }
    });
});

// NEW ROUTE
router.get("/new",function(req,res){
    res.render("new");
});

// CREATE ROUTE
router.post("/",function(req,res){
    req.body.hotel.body = req.sanitize(req.body.hotel.body);
    // create hotel
    console.log(req.body.hotel.houserules);
    Hotel.create(req.body.hotel,function(err,newHotel){
        if(err){
            res.render("new");
        } else {
            // redirect to index
            res.redirect("/hotels");
        }
    });
})

// SHOW ROUTE
router.get("/:id",function(req,res){
    // find hotel
    Hotel.findById(req.params.id,function(err,foundHotel){
        if(err){
            res.redirect("/hotels");
        } else {
            res.render("show",{hotel : foundHotel});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit",function(req,res){
    Hotel.findById(req.params.id,function(err,foundHotel){
        if(err){
            res.redirect("/hotels");
        } else {
            res.render("edit",{hotel : foundHotel});
        }
    });
});

// UPDATE ROUTE
router.put("/:id",function(req,res){
    req.body.hotel.body = req.sanitize(req.body.hotel.body);
    Hotel.findByIdAndUpdate(req.params.id,req.body.hotel,function(err,updatedHotel){
        if(err){
            res.redirect("/hotels");
        } else {
            res.redirect("/hotels/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:id",function(req,res){
    Hotel.findByIdAndDelete(req.params.id,function(err,deletedHotel){
        if(err){
            res.redirect("/hotels/"+req.params.id);
        } else {
            res.redirect("/hotels");
        }
    });
});

module.exports = router;