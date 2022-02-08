const { router } = require('../../common');
const daily      = require('./daily');
// const weekly     = require('./weekly');

router.use('/daily', daily);
// router.use('/weekly', weekly);

module.exports = router;