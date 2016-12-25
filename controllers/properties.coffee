express = require 'express'
router = express.Router()
auth = require '../services/auth'
Property = require '../models/Property'
Client = require '../models/Client'
config = require '../config'

# GET ALL PROPERTIES
router.get '/', auth.isAuthenticated, (req, res) ->
  Property.find  (err, propertysFound) ->
    return res.with(res.type.dbError, err) if err
    res.with(propertysFound)

# GET SPECIFIC PROPERTY
router.get '/:id', auth.isAuthenticated, (req, res) ->
  Property.findOne {'_id': req.params.id}, (err, propertyFound) ->
    return res.with(res.type.dbError, err) if err
    return res.with(propertyFound) if propertyFound
    res.with(res.type.itemNotFound)

# ADD NEW PROPERTY
router.post '/', auth.isAuthenticated, (req, res) ->
  Client.findOne {'_id': req.body.client}, (err, clientFound) ->
    return res.with(res.type.itemNotFound) unless clientFound?

    property = new Property(req.body)
    property.created = new Date()
    property.save (err, propertySaved) ->
      return res.with(res.type.dbError, err) if err
      res.with(propertySaved)

# UPDATE EXISTENT PROPERTY
router.put '/:id', auth.isAuthenticated, (req, res) ->
  Client.findOne {'_id': req.body.client}, (err, clientFound) ->
    return res.with(res.type.itemNotFound) unless clientFound?

    Property.findOne {'_id': req.params.id}, (err, propertyFound) ->
      return res.with(res.type.dbError, err) if err
      return res.with(res.type.itemNotFound) unless propertyFound?

      property = new Property(req.body)
      Property.findOneAndUpdate({_id: req.params.id}, {$set: property.forUpdate()}, {new: true}).populate('client').exec (err, propertyUpdated) ->
        return res.with(res.type.dbError, err) if err
        res.with(propertyUpdated)

# DELETE PROPERTY
router.delete '/:id', auth.isAuthenticated, (req, res) ->
  Property.findOneAndRemove {'_id': req.params.id}, (err) ->
    return res.with(res.type.dbError, err) if err
    res.with(res.type.deleteSuccess)

module.exports = router