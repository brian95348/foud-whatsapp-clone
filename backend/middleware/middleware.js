
const errorHandler = (err, req, res, next) => {
    return res.status(500).json({err})
}

// const notFound = (req,res) => res.status(404).send('Route not found')

module.exports = {errorHandler}