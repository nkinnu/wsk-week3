import promisePool from '../../utils/database.js';

async function listAllCats() {
  const sql = `
    SELECt c.*, u.name AS owner_name
    FROM wsk_cats AS c
    JOIN wsk_users AS u ON c.owner = u.user_id
  `;

  const [rows] = await promisePool.query(sql);

  return rows;
}

async function findCatById(id) {
  const sql = `
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats AS c
    JOIN wsk_users AS u ON c.owner = u.user_id
    WHERE c.cat_id = ?
  `;

  const [rows] = await promisePool.execute(sql, [id]);

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

async function addCat(cat) {
  const {cat_name, weight, owner, filename, birthdate} = cat;

  const sql =
    'INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)';

  const params = [cat_name, weight, owner, filename, birthdate];

  const [result] = await promisePool.execute(sql, params);

  console.log('insert query result', result);

  if (result.affectedRows === 0) {
    return false;
  }

  return {cat_id: result.insertId};
}

async function modifyCat(id, cat, user) {
  let sql =
    'UPDATE wsk_cats SET cat_name = ?, weight = ?, birthdate = ? WHERE cat_id = ?';

  const params = [cat.cat_name, cat.weight, cat.birthdate, id];

  if (user.role !== 'admin') {
    sql += ' AND owner = ?';
    params.push(user.user_id);
  }

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}

async function removeCat(id, user) {
  let sql = 'DELETE FROM wsk_cats WHERE cat_id = ?';

  const params = [id];

  if (user.role !== 'admin') {
    sql += ' AND owner = ?';
    params.push(user.user_id);
  }

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}

async function listCatsByUserId(id) {
  const sql = `
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats AS c
    JOIN wsk_users AS u ON c.owner = u.user_id
    WHERE c.owner = ?
  `;

  const [rows] = await promisePool.execute(sql, [id]);

  return rows;
}

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  listCatsByUserId,
};
