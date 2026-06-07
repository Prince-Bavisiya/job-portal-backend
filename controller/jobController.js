const connection = require("../config/db");


// CREATE JOB
const createJob = (req, res) => {

    const {
        title,
        company,
        location,
        salary
    } = req.body;

    const sql =
        "INSERT INTO jobs (title,company,location,salary) VALUES (?,?,?,?)";

    connection.query(
        sql,
        [title, company, location, salary],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Job Created Successfully",
                jobId: result.insertId
            });

        }
    );
};


// GET ALL JOBS
const getJobs = (req, res) => {

    const { search, page = 1, limit = 5 } = req.query;

    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM jobs";
    let values = [];

    if (search) {
        sql =
            "SELECT * FROM jobs WHERE title LIKE ? OR company LIKE ? LIMIT ? OFFSET ?";
        values = [
            `%${search}%`,
            `%${search}%`,
            Number(limit),
            Number(offset)
        ];
    } else {
        sql =
            "SELECT * FROM jobs LIMIT ? OFFSET ?";
        values = [
            Number(limit),
            Number(offset)
        ];
    }

    connection.query(
        sql,
        values,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                page: Number(page),
                limit: Number(limit),
                jobs: result
            });

        }
    );
};

const updateJob = (req, res) => {

    const { id } = req.params;

    const {
        title,
        company,
        location,
        salary
    } = req.body;

    const sql =
        "UPDATE jobs SET title=?, company=?, location=?, salary=? WHERE id=?";

    connection.query(
        sql,
        [title, company, location, salary, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Job Updated Successfully"
            });

        }
    );
};

const deleteJob = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM jobs WHERE id=?";

    connection.query(
        sql,
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Job Deleted Successfully"
            });

        }
    );
};


module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
};