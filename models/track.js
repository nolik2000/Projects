var mongoose = require('mongoose');

// Track Schema
var TrackSchema = mongoose.Schema({
    sampleFile: {
        type: String,
        index:true,

    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    }
});

var Track = module.exports = mongoose.model('Track', TrackSchema);

module.exports.createTrack = function(newTrack, callback){
     newTrack.save(callback);
}


module.exports.getAllTracks = function(callback){
     Track.find({}, callback);
 }






