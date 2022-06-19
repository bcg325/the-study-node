const mongoose = require("mongoose");
const User = mongoose.model("User");

const getTimerSettings = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not logged in");
  }
  if (user.timerSettings) {
    res.status(200).json({ timerSettings: user.timerSettings });
  } else {
    res.status(200).json({ timerSettings: null });
  }

  res.status(401);
};
const setTimerSettings = async (req, res) => {
  const { timerSettings } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not logged in");
  }

  try {
    user.timerSettings = JSON.stringify(timerSettings);
    await user.save();
    res.status(200).json({ timerSettings: timerSettings });
  } catch (err) {
    res.status(401);
    throw new Error("Failed to save timer settings");
  }

  res.status(401);
};

module.exports = {
  getTimerSettings,
  setTimerSettings,
};
