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
const Spotify_OAuth_Token = "BQCJSVd6r7p7NFmRzdXbFzbj6R1rOxIG367So6zFsAm5m3QuyNni-RgeHP_JEG2xg0EKVvNxaJu7gQPrKeSKqhOGTBooIzN0CKHT1ciX5uxmuuArrfcmMij4jUw7XFOazYAgNmuTzSCuyWe5sqhdoey4rdgpulsTmQlMFigmdvbp";
const Spotify_Refresh = "AQC_By2gr1OZg4DOIukBgZ3_2h71d2AOrYXo7QnLkw9AzmtRuuenvjmj2Qq2ubqiFQygQQVW6vKteqbndDoxBUvBO_pkSXmsQBuYSVyCRSQM0Sl4mIWdWQM7xlZ_Y8Q53tA";
const encoded = Buffer.from(Spotify_Client_ID + ':' + Spotify_Client_Secret).toString('base64');
console.log(encoded);

module.exports = {
  MongoDB_URI: MongoDB_URI,
  MongoDB_Options: MongoDB_Options,
  Passport_Secret: Passport_Secret,
  Twilio_Key: Twilio_Key,
  Spotify_Client_ID: Spotify_Client_ID,
  Spotify_Client_Secret: Spotify_Client_Secret,
  Spotify_OAuth_Token: Spotify_OAuth_Token,
  encoded: encoded
};
