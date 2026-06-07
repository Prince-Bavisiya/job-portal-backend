const express = require("express");

const { auth, isAdmin } = require("../middleware/auth");

const {
    applyJob,
    getApplicants,
    getMyApplications,
    updateApplicationStatus
} = require("../controller/applicationController");

const router = express.Router();

router.post("/apply/:jobId", auth, applyJob);

router.get("/applicants/:jobId", auth, getApplicants);

router.get("/my-applications", auth, getMyApplications);

router.put("/application/status/:id",auth,isAdmin,updateApplicationStatus);

module.exports = router;