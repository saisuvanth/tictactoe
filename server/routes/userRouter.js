const { Router } = require('express')
const { getGame, getGames, getProfile, createGame, updateGame } = require('../controllers/userController')
const { isAuth } = require('../middleware')
const userRouter = Router()


userRouter.use(isAuth);

userRouter.get('/profile', getProfile);


userRouter.get('/games', getGames);


userRouter.get('/game/:gameId', getGame);


userRouter.post('/create-game', createGame);


userRouter.put('/game/:gameId', updateGame);





module.exports = userRouter