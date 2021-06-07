const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGOPEN OPEN OPEN");
  })
  .catch((err) => {
    console.log("oh no MONGO error");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });
  u.addresses.push({
    street: "123 Sesame Street",
    city: "New York",
    state: "New York",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "46 Pinoy Palace",
    city: "New York",
    state: "New York",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

addAddress("60be1cb533f93b00c45e78e6");

makeUser();
