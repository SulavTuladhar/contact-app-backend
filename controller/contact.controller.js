const router = require('express').Router();
const contactModel = require('./../models/contact.model');
const uploader = require('./../middlewares/uploader');
const fs = require('fs');
const path = require('path');

function MAP_CONTACT_REQUIEST(newContact, contactData){
    if(contactData.name)
        newContact.name = contactData.name;
    if(contactData.phoneNumber)
        newContact.phoneNumber = contactData.phoneNumber;
    if(contactData.image)
        newContact.image = contactData.image;
    return newContact;
}

router.route('/')
    .get(function(req,res,next){
        var condition = {};
        contactModel.find(condition)
            .sort({
                _id: -1
            })
            .exec(function(err,users){
                if(err){
                    return next(err)
                }
                res.json(users)
            })
    })
    .post(uploader.single('image'), function(req,res,next){
        if(req.fileTypeError){
            console.log('yo error ma aayo');
            return next({
                msg: 'Invalid file format',
                status: 414
            })
        }
        console.log('req >>', req.body);
        console.log('req >>', req.file);
        if(req.file){
            req.body.image = req.file.filename;
        }
        var newContact = new contactModel({});
        var mappedContact =  MAP_CONTACT_REQUIEST(newContact, req.body);
        console.log('mapped contact >>', mappedContact);
        mappedContact.save(function(err,saved){
            if(err){
                console.log('this error ');
                return next(err);
            }
            res.json(saved);
        })
    })

router.route('/:id')
    .get(function(req,res,next){
        const id = req.params.id;
        contactModel.findById(id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            res.json(user)
        })
    })

    .put(uploader.single('image'), function(req,res,next){
        const id = req.params.id;
        const data = req.body;
        if(req.fileTypeError){
            return next({
                msg: 'Invalid File Format',
                status: 414
            })
        }
        if(req.file){
            data.image = req.file.filename;
        }
        contactModel.findById(id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            var oldImage = user.image;
            var mappedUpdatedContact = MAP_CONTACT_REQUIEST(user, data)
            
            mappedUpdatedContact.save(function(err,updated){
                if(err){
                    return next(err);
                }
                if(req.file){
                    fs.unlink(path.join(process.cwd(),'uploads/images/' + oldImage), function(err,removed){
                        if(err){
                            console.log('Error while removing ', err);
                        }else{
                            console.log('Sucessfully removed old image');
                        }
                    })
                }
                res.json(updated)
            })
        })  
    })

    .delete(function(req,res,next){
        const id = req.params.id;
        contactModel.findById(id,function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            var oldImage = user.image;
            user.remove(function(err,removed){
                if(err){
                    return next(err);
                }
                fs.unlink(path.join(process.cwd(),'uploads/images/' + oldImage), function(err,removed){
                    if(err){
                        console.log('Error while removing ', err);
                    }else{
                        console.log('Sucessfully removed old image');
                    }
                })
                res.json(removed)
            })
        })
    })

module.exports = router;