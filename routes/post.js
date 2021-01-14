const { rejects } = require('assert');
const express = require('express');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const filePath = path.join(__dirname, '../', 'data', 'posts.json');
const router = express.Router();

router.get('/posts', (req, res) => {
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, async (err, fileContent) => {
            let post = []
            if (!err) {
                post = await JSON.parse(fileContent)
                res.status(200).send({ data: post, message: "Found" })

            } else {
                res.status(404).send({ data: [], message: "Not Found" })
            }
        })
    } else {
        res.status(404).send({ data: [], message: "Not Found" })
    }
})

router.post('/posts', (req, res) => {
    fs.readFile(filePath, (err, fileContent) => {
        var post = []
        if (!err) {
            post = JSON.parse(fileContent)
        }
        post.push({ x: req.body.x, y: req.body.y, message: req.body.message, name: req.body.name })

        fs.writeFile(filePath, JSON.stringify(post, null, 2), (err) => {
            if (!err) {
                res.status(200).send({ message: "Sucess" })
            }
        })
    })
})

module.exports = router