import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/about', (req, res) => {
    res.send('You Successful to get about page')
})

export default router