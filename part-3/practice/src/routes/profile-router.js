const router = require('express').Router();
const {
  addProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/profile-controller');

router.get('/get-all', getAllUserProfiles); // admin possible
router.get('/', getUserProfile);
router.post('/add', addProfile);
router.put('/update:id', updateUserProfile);
router.delete('/delete:id', deleteUserProfile);

module.exports = router;
