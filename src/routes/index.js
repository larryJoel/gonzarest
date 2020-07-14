const { Router }= require('express');
const router = Router();
const path = require('path');
const { unlink } = require('fs-extra');
const Image = require('../models/image');
const image = require('../models/image');

//rutas
router.get('/', async(req, res)=>{
    const images = await image.find();
    res.render('index',{ images})
});

router.get('/upload', (req, res)=>{
    res.render('upload');
});

router.post('/upload',async (req,res)=>{
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/'+req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    await image.save();
    res.redirect('/');
});

router.get('/image/:id', async(req, res)=>{
    const imagen = await image.findById(req.params.id);
    console.log(imagen);
    res.render('profile', {imagen})
})

router.get('/image/:id/delete',async(req,res)=>{
    const {id}= req.params;
    const imagen = await image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public'+ imagen.path));
    res.redirect('/')
});

module.exports = router;