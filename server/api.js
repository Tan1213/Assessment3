// Introducing mysql Database
const mySql = require('mysql');

// Connect to the mysql database, database info
let mysqlConnect = mySql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'crowdfunding_db',
    user: 'root',
    password: '123456',
})
mysqlConnect.connect();

const EXPRESS = require('express');
const router = EXPRESS.Router();

// sql statement
const organizerSQL = `select organizer from fundraiser`;
const citySQL = `select city from fundraiser`;
const categorySQL = `select * from category`;
const searchSQL = `select c.name, f.* from category c join fundraiser f on f.category_id = c.category_id where (f.organizer = ? or ? is null) and (f.city = ? or ? is null) and (f.category_id = ? or ? is null) and (f.active = 1)`;
const detailSQL = `select c.name, f.* from category c join fundraiser f on f.category_id = c.category_id where f.fundraiser_id = ?`;
const donationSQL = `insert into donation (date, amount, giver, fundraiser_id) values(?,?,?,?)`;
const updateCurrentFundingSQL = `UPDATE fundraiser SET current_funding = current_funding + ? WHERE fundraiser.fundraiser_id = ?`;
const getDonationListSQL =  `select * from donation d WHERE (d.fundraiser_id = ?)`;
const searchAllDataSQL = `select f.*, c.name AS category_name
                                FROM fundraiser f
                                JOIN category c ON f.category_id = c.category_id
                                WHERE (f.category_id = ? OR ? IS NULL) AND (f.organizer = ? OR ? IS NULL) AND (f.city = ? OR ? IS NULL) AND (f.active = ? OR ? IS NULL)`;
const addFundraiserSQL = `insert into fundraiser (CAPTION, ORGANIZER, CITY, TARGET_FUNDING, CURRENT_FUNDING, CATEGORY_ID, ACTIVE) values(?,?,?,?,?,?,?)`;
const updateFundraiserSQL = `UPDATE fundraiser SET CAPTION = ?, ORGANIZER = ?, CITY = ?, TARGET_FUNDING = ?, CATEGORY_ID = ?, ACTIVE = ? WHERE fundraiser.FUNDRAISER_ID = ?`;
const deleteFundraiserSQL = `DELETE FROM fundraiser WHERE fundraiser.fundraiser_id = ?`
function formatDate(d) {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
}

// get fundraiser data
router    // get category
    .get('/getCategory', (request, response) => {
        mysqlConnect.query(categorySQL, function(err, data) {
            response.send(data)
        });
    })
    // get city
    .get('/getCity', (request, response) => {
        mysqlConnect.query(citySQL, function(err, data) {
            response.send(data)
        });
    })
    // get organizer
    .get('/getOrganizer', (request, response) => {
        mysqlConnect.query(organizerSQL, function(err, data) {
            response.send(data)
        });
    })
    .get('/getFundraiser', (request, response) => {
        const query = request.query;
        query.category_id = query.category_id || null;
        query.organizer = query.organizer || null;
        query.city = query.city || null;
        const queryArr = [query.organizer, query.organizer, query.city, query.city, query.category_id, query.category_id];
        mysqlConnect.query(searchSQL, queryArr, function(err, data) {
            response.send(data)
        });
    })
    // get detail
    .get('/getDetail', (request, response) => {
        const query = request.query;
        const queryArr = [query.fundraiser_id];
        mysqlConnect.query(detailSQL, queryArr, function(err, data) {
            mysqlConnect.query(getDonationListSQL, [query.fundraiser_id], function(err, list) {
                const a = {
                    ...data[0],
                    donationList: []
                }
                if (list) {
                    list.forEach(item => {
                        item.date = formatDate(item.date);
                    });
                    list.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date);
                    });
                    a.donationList = list;
                }
                response.send(a);
            });
        });
    })
    .post('/donation', (req, res) => {
        const params = req.body;
        for (const key in params) {
            params[key] = params[key] || '';
        }
        params.date = formatDate(new Date());
        mysqlConnect.query(donationSQL, [params.date, params.amount, params.giver, params.fundraiser_id], function(err, result) {
            mysqlConnect.query(updateCurrentFundingSQL, [params.amount, params.fundraiser_id], function(err, result) {
                res.send(result[0]);
            });
        });
    })
    // admin: Get all the data in the Fundraiser
    .get('/getAllDataList', (req, res) => {
        const params = req.query;
        for (const key in params) {
            params[key] = params[key] || null;
        }
        console.log(params);
        mysqlConnect.query(searchAllDataSQL, [params.category_id, params.category_id, params.organizer, params.organizer, params.city, params.city, params.active, params.active], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                result = result.filter(o => o.caption.toLowerCase().includes(params.caption?.toLowerCase() || ''));
                result.reverse();
                res.send(result)
            }
        });
    })
    // admin: add Fundraiser
    .post('/addFundraiser', (req, res) => {
        const params = req.body;
        for (const key in params) {
            params[key] = !!params[key] || params[key] == 0 ? params[key] : '';
        }
        params.current_funding = 0.00;
        mysqlConnect.query(addFundraiserSQL, [params.caption, params.organizer, params.city, params.target_funding,params.current_funding,  params.category_id, params.active], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result);
            }
        });
    })
    // admin: update Fundraiser
    .put('/updateFundraiser/:id', (req, res) => {
        const params = req.body;
        for (const key in params) {
            params[key] = !!params[key] || params[key] == 0 ? params[key] : '';
        }
        const id = req.url.slice(req.url.lastIndexOf('/') + 1);
        mysqlConnect.query(updateFundraiserSQL, [params.caption, params.organizer, params.city, params.target_funding,  params.category_id, params.active, id], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result);
            }
        });
    })
    // admin: delete Fundraiser
    .delete('/deleteFundraiser/:id', (req, res) => {
        const id = req.url.slice(req.url.lastIndexOf('/') + 1);
        mysqlConnect.query(deleteFundraiserSQL, [id], function(err, result) {
            if (err) {
                console.log('错误', err)
            }
            if (result) {
                console.log('成功的结果', result)
                res.send(result);
            }
        });
    })
module.exports = router