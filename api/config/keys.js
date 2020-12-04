const MongoDB_URI = "mongodb+srv://cse416.pbdd5.mongodb.net/CSE416";
const MongoDB_Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  user: 'admin',
  pass: '8N79Ytxy20PxaFY8'
};
const Passport_Secret = "secret";
const Twilio_Key =
  "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";
const Spotify_Client_ID = "f052d98613e44dd1bcff5da4fa1b2c0a";
const Spotify_Client_Secret = "3f079d1cede8444a88627e4dfa2ab161";
const Spotify_OAuth_Token = "BQBtCMnn5uL_pvU5HfbCrLPiEVCYMpOVe2tnKW2ca7qdjg5ce1uZb4nMruMz8vitBrlrlvJDYfLSrvUmepwAMbkikKYn7Fwlj1T0yFo-Hp8otYUSU4gQRFu2W0g13rxkJreYHhhZmwZOPFk";

module.exports = {
  MongoDB_URI: MongoDB_URI,
  MongoDB_Options: MongoDB_Options,
  Passport_Secret: Passport_Secret,
  Twilio_Key: Twilio_Key,
  Spotify_Client_ID: Spotify_Client_ID,
  Spotify_Client_Secret: Spotify_Client_Secret,
  Spotify_OAuth_Token: Spotify_OAuth_Token,
};
