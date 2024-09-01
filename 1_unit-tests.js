const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
let solver=new Solver();

suite('Unit Tests', () => {
    const validPuzzle='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const invalidCharPuzzle = "..9..5.1.85.4....2432...a..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
const invalidLenPuzzle = "..9..5.1.85.4....2432.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."

    test('Logic handles a valid puzzle string of 81 characters',()=>{
        assert.equal(solver.validate(validPuzzle),'valid','Valid Puzzle return "Valid"')
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)',()=>{
        assert.equal(solver.validate(invalidCharPuzzle).error,'Invalid characters in puzzle','invalid length Puzzle return "Valid"')
    });

});


/*


Logic handles a puzzle string that is not 81 characters in length
Logic handles a valid row placement
Logic handles an invalid row placement
Logic handles a valid column placement
Logic handles an invalid column placement
Logic handles a valid region (3x3 grid) placement
Logic handles an invalid region (3x3 grid) placement
Valid puzzle strings pass the solver
Invalid puzzle strings fail the solver
Solver returns the expected solution for an incomplete puzzle
*/