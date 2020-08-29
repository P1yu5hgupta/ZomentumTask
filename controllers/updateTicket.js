exports.updateTicket = function(req,res){
    // var user = new User;
    // user.username= 'piyushhhhh';
    // user.phone = 4567890;
    // user.save();
    return res.json({username: 'piyush', phone: req.body.phone,timing: req.body.timing});
};
