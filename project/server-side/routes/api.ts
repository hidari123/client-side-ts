var express = require('express')
var router = express.Router()
import controllerApi = require('../controller/api')

router.post('/file_upload', async function (req, res) {
    try {
        await controllerApi.upload(req)
        res.send('success')
    } catch (err) {
        res.send('error')
    }
})

module.exports = router