const db = require('_helpers/db');


module.exports = {
    getAll,
    create
};


async function getAll() {
    return await db.Job.findAll();
}

async function create(params) {

    // save Job
    await db.Job.create(params);
}
