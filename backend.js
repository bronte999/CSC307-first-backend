const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 };

app.use(cors());
app.use(express.json());


app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        users['users_list'].splice(users['users_list'].indexOf(result),1);
        res.send(users);
    }
});

app.get('/users', (req, res) => {
    const name = req.query.name; //or req.params.id
    const job = req.query.job;
    
    if (name != undefined && job === undefined){
        let result = findUserByName(name);
        if (result === undefined || result.length == 0)
            res.status(404).send('Resource not found.');
        else {
            result = {users_list: result};
            res.send(result);
        }
    }
    if(name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        if (result === undefined || result.length == 0)
            res.status(404).send('Resource not found.');
        else {
            result = {users_list: result};
            res.send(result);
        }
    }
    if(name === undefined && job != undefined){
        let result = findUserByJob(job);
        if (result === undefined || result.length == 0)
            res.status(404).send('Resource not found.');
        else {
            result = {users_list: result};
            res.send(result);
        }
    }
    else{
        let result = users['users_list'];
        if (result === undefined || result.length == 0)
            res.status(404).send('Resource not found.');
        else {
            result = {users_list: result};
            res.send(result);
    }
    }
})


function findUserById(id) {
    return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

function findUserByNameAndJob(name, job) { 
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}

/*const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}*/

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      



