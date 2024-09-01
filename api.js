'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solvePressed=false;
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let entryPuzzle=req.body.puzzle;
      let entryCoordinate=req.body.coordinate;
      let entryValue=req.body.value;
      console.log('data : '+entryPuzzle,entryCoordinate,entryValue);
      if (entryPuzzle==undefined || entryCoordinate==undefined || entryValue==undefined || entryPuzzle=="" || entryCoordinate=="" || entryValue==""){
        res.send({error: 'Required field(s) missing'});
      }else{
        res.send(solver.checkGlobal(entryPuzzle,entryCoordinate,entryValue));
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let entryPuzzle=req.body.puzzle;
      if(solvePressed===false){
        const validationP=solver.validate(entryPuzzle);

        if(validationP==='valid'){

          res.send(solver.solve(entryPuzzle));
        }else{
          try{                 
          res.send(validationP);   
          }catch(err){
            console.log(err)
          }
        }
      }else{
        res.send('Solved already')
      }   
    });
};