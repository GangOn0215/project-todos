const { router } = require('../../common');
const login      = require('./login');
const logout     = require('./logout');
const register   = require('./register');

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);

module.exports = router;