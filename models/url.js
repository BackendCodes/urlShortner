const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("url", urlSchema);
