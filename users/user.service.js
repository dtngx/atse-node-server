const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');
const bcrypt = require('bcryptjs');

module.exports = {
    authenticate,
    create,
    delete: _delete,
    getAll
};

async function authenticate({ username, password }) {

    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.hash))) 
        throw "incorrect username or password"
        
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return { ...omitHash(user.get()), token };
    
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}


async function getAll() {
    return await db.User.findAll();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
