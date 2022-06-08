const mongoose = require('mongoose');
// 'mongodb+srv://noteful-app:notefulclone123@noteful-app.fthcj.mongodb.net/test' /
mongoose.connect( 'mongodb+srv://Kaayching:Jspr1233@cluster0.w2p5d.mongodb.net/test',
    process.env.MONGO_URI || 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;