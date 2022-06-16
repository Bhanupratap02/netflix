const router = require("express").Router();
const Movie = require("../models/Movie")
const verify = require("../verifyToken")

//CREATE
router.post("/",verify,async (req,res)=>{
   if(req.user.isAdmin){
       const newMovie = new Movie(req.body);
       try {
        const savedMovie = await newMovie.save();
      return   res.status(201).json(savedMovie);
       } catch (error) {
         console.log(error);
   return   res.status(500).json(error);
    
       }
   } else {
      return  res.status(403).json("You are not allowed!")
   }
});

// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
          $set:req.body,
      },
      {
          new:true
      })
     return res.status(201).json(updatedMovie);
    } catch (error) {
      console.log(error);
   return   res.status(500).json(error);
     
    }
  } else {
   return  res.status(403).json("You are not allowed!");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req?.user?.isAdmin) {
   
    try {
      await Movie.findByIdAndDelete(req.params.id);
      return  res.status(201).json("the Movie has been deleted...");
    } catch (error) {
      console.log(error);
     return  res.status(500).json(error);
      
    }
  } else {
 return   res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/find/:id",verify,async (req,res)=>{
    try {
           const movie = await Movie.findById(req.params.id);
       return  res.status(200).json(movie);
    } catch (error) {
       console.log(error);
       return  res.status(500).json(error);
        
    }
})


// GET RANDOM
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;

  try {
   if (type === "series") {
     movie = await Movie.aggregate([
       { $sample: { size: 3 } },
       { $match: { isSeries: "true" } },
     ]);
   } else {
     movie = await Movie.aggregate([
       { $sample: { size: 2 } },
       { $match: { isSeries: "false" } },
     ]);
   }
return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
   return  res.status(500).json(error);
    
  }
});

// GET ALL 
 router.get("/",verify,async (req,res)=>{
    const query = req.query.new;
      if (req?.user?.isAdmin) {
        try {
          const movies = query ? await Movie.find().sort({ _id: -1 }).limit(5) : await Movie.find();
         return  res.status(200).json(movies.reverse());
        } catch (error) {
          console.log(error);
       return  res.status(500).json(error);
        
        }
      } else {
      return   res.status(403).json("You are not allowed!");
      }
 })
module.exports = router;
