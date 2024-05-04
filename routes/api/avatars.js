import express from "express"

const avatarRouter = express.Router()

avatarRouter.get('/avatars/:imgPath', (req, res) => {
    const { imgPath } = req.params;
    console.log(imgPath)
    res.render("avatars", { imgPath });

});


export default avatarRouter