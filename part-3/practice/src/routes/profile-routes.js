const router = require('express').Router();

router.get('/get-all', getAllUserProfiles); // admin possible
router.get('/', getUserProfile);
router.post('/add', addProfile);
router.put('/update:id', updateUserProfile);
router.delete('/delete:id', deleteUserProfile);

module.exports = router;
