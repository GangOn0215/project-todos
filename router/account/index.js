const { router } = require('../../common');
const login      = require('./login');
const register   = require('./register');

router.use('/login', login);
router.use('/register', register);

module.exports = router;