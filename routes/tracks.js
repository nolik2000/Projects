var express = require('express');
var router = express.Router();


var Track = require('../models/track');

// router.get('/tracks', function (req, res) {
//     res.render('index');
// });

 router.get('/', function (req, res) {
     Track.getAllTracks((err, tracks)=> {
         if(err) return err;

         res.json(tracks);
     })
 });

router.post('/', function (req, res, next) {

    if (req.session) {
        console.log(req.session);
        next();
    } else {
        res.send(403);
    }
}, function (req, res) {
    var sampleFile = req.files.sampleFile;
    var name = req.body.name;
    var newTrack;
    sampleFile.mv('/MELOMANIAC/public/music/' + name + '.mp3', function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            newTrack = new Track({
                sampleFile: 'music/' + name + '.mp3',
                name: name,
                postedBy: req.session.passport.user
            });
            Track.createTrack(newTrack, function (err, track) {
                if (err) throw err;
                console.log(track);
                res.render('index', {
                    sampleFile: sampleFile,
                    name: name
                });
            });


        }
    });


});

module.exports = router;

