import promisePool from '../../utils/database.js';

async function listAllUsers() {
  const [rows] = await promisePool.query(
    'SELECT user_id, name, username, email, role FROM wsk_users'
  );

  return rows;
}

async function findUserById(id) {
  const [rows] = await promisePool.execute(
    'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

async function addUser(user) {
  const {name, username, email, password} = user;

  const sql =
    'INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)';

  const params = [name, username, email, password, 'user'];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return {user_id: result.insertId};
}

async function modifyUser(id, user) {
  const sql =
    'UPDATE wsk_users SET name = ?, username = ?, email = ?, role = ? WHERE user_id = ?';

  const params = [
    user.name,
    user.username,
    user.email,
    user.role || 'user',
    id,
  ];

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}

// Delete user and all associated cats
async function removeUser(id) {
  const connection = await promisePool.getConnection();

  // Start a transaction to ensure both deletions succeed or fail together
  try {
    await connection.beginTransaction();

    // Delete all cats associated with the user
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);

    // Delete the user
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    // Commit the transaction
    await connection.commit();

    if (result.affectedRows === 0) {
      return false;
    }

    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
