const db = require("../Db");

const handler1 = (req,res) => {
    // console.log(req.body)
    const {name,email,password,job_title,addressess} = req.body;

    if(!name ||!email ||!password ||!job_title ||!addressess) {
        res.status(400).json({
            msg: "Bad request!!",
        })
    }
    
    const query = `INSERT INTO users(name,email,password,job_title) values('${name}','${email}','${password}','${job_title}')`;
    db.query(query,(err,result) => {
        if(err) {
            return res.status(500).json({
                msg: "Error to fetch data!!",
            })
        }else{
            const userId = result.insertId;
            const {address,city,country,state} = addressess;
            if(!address ||!city ||!country ||!state) {
                res.status(400).json({
                    msg: "Bad request!!",
                })
            }
            // console.log(address,city,country,state);
            const query1 = "INSERT INTO user_addressess(id,address,city,country,state) values(?,?,?,?,?)";
           db.query(query1,[userId,address,city,country,state],(err1,result1) => {
               if(err1) {
                return res.status(500).json({
                    msg: "Error to fetch data!!",
                })
                }else {
                    res.status(201).json({
                    msg: "user is created!!",
                    userId: result.insertId,
            });
        }
    })
        }
    });
    
}

const handler2 = (req,res) => {
    const Id = Number(req.params.id);

    query = `DELETE FROM users WHERE id = ${Id}`;
    db.query(query,(err,result) => {
        if(err) {
            return res.status(500).json({
                msg: "Error to fetch data!!",
            })
        }else{
            if(result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "user not found!!"
                })
            }
            return res.status(200).json({
                msg: "User is successfully deleted!!",
                rows: result.affectedRows,
          })
        }
    })

}

const handler3 = (req,res) => {
    const Id = Number(req.params.id);
    const body = req.body;
    // console.log(body);
    query = `UPDATE users SET ? WHERE id = ${Id}`;

    db.query(query,[body],(err,result) => {
        if(err) {
            return res.status(500).json({
                msg: "Error to fetch data!!",
            })
        }else{
            if(result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "user not found!!"
                })
            }
            return res.status(200).json({
              msg: "user update successfully!!",
              rows: result.affectedRows
            });
        }
    })
}

const handler4 = (req,res) => {
    const Id = Number(req.params.id);
    const body = req.body.address;
    
    const query = `UPDATE user_addressess SET ? WHERE id = ${Id}`;
    db.query(query,[body],(err,result) => {
        if(err) {
            return res.status(500).json({
                msg: "Error to fetch data!!",
            })
        }else{
            if(result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "user not found!!"
                })
            }
            return res.status(200).json({
                msg: "address update successfully!!"
            })
        }
    })
};

const handler5 = (req,res) => {
    const Id = Number(req.params.id);
    const query = "SELECT * FROM users u INNER JOIN user_addressess a ON u.id = a.id";
    db.query(query,(err,result) => {
        if(err) {
            console.log(err)
        }else {
            console.log(result);
            res.json(result);
        }
    })
}


module.exports = {
    handler1,
    handler2,
    handler3,
    handler4,
    handler5
}