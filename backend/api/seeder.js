/** @format */
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const users =  require("./data/users")
const movies = require("./data/movies")
const lists = require("./data/lists")
const User = require("./models/User")
const Movie = require("./models/Movie")
const List = require("./models/List")

dotenv.config()
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () =>{
    try {
      await User.deleteMany();
      await Movie.deleteMany();
      await List.deleteMany();

      await Movie.create(movies);
      await List.insertMany(lists);
       await User.insertMany(users);
      console.log("Data Imported");
      process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
const destroyData = async () => {
  try {
  
    await User.deleteMany();
    await Movie.deleteMany();
    await List.deleteMany();
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
  if (process.argv[2] === "-i") {
    importData();
  } else if (process.argv[2] === "-d") {
    destroyData();
  }

  module.exports = movies