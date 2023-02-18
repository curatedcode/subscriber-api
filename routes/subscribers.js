const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
})

router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/:subscriber_id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

router.patch('/:subscriber_id', getSubscriber, async (req, res) => {
  if (req.body.name != null){
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscriberToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:subscriber_id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


async function getSubscriber(req, res, next){
  let subscriber 
  try {
    subscriber = await Subscriber.findById(req.params.subscriber_id)
    if(subscriber == null){
      return res.status(404).json({ message: "Cannot find subscriber" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router