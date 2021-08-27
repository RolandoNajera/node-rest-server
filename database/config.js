const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log( 'Database online' );

    } catch ( err ) {
        console.log( err );
    }
};

module.exports = {
    dbConnection
}