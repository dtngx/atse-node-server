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
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}


//   const user = users.find(u => u.username === username && u.password === password);

//  if (!user) throw 'Username or password is incorrect';

// create a jwt token that is valid for 7 days

//   const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

//   return {
//      ...omitPassword(user),
//      token
//};

//async function register({ username }) {
//    const user = users.find(u => u.username === username);
//    var message = {
//        message: "processing..."
//    }

//    if (user) throw "User already exists";

//    message = {
//        message: "success"
//    }
//    return message;
//}


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
    return await db.Jobs.findAll();
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
