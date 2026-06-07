const connection = require("../config/db");

const applyJob = (req, res) => {

    const user_id = req.user.id;

    const { jobId } = req.params;

    const checkSql =
        "SELECT * FROM applications WHERE user_id = ? AND job_id = ?";

    connection.query(
        checkSql,
        [user_id, jobId],
        (err, result) => {

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "You have already applied for this job"
                });
            }

            const sql =
                "INSERT INTO applications (user_id, job_id) VALUES (?, ?)";

            connection.query(
                sql,
                [user_id, jobId],
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "Job Applied Successfully"
                    });
                }
            );
        }
    );

    const sql =
        "INSERT INTO applications (user_id, job_id) VALUES (?, ?)";

    connection.query(
        sql,
        [user_id, jobId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Job Applied Successfully"
            });
        }
    );
};

const getApplicants = (req, res) => {

    const { jobId } = req.params;

    const sql = `
        SELECT users.id, users.name, users.email
        FROM applications
        JOIN users ON applications.user_id = users.id
        WHERE applications.job_id = ?
    `;

    connection.query(
        sql,
        [jobId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                applicants: result
            });

        }
    );
};

const getMyApplications = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT jobs.*
        FROM applications
        JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.user_id = ?
    `;

    connection.query(
        sql,
        [userId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                jobs: result
            });

        }
    );
};

const updateApplicationStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const sql =
        "UPDATE applications SET status = ? WHERE id = ?";

    connection.query(
        sql,
        [status, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Application Status Updated"
            });

        }
    );
};

module.exports = {
    applyJob,
    getApplicants,
    getMyApplications,
    updateApplicationStatus
}
