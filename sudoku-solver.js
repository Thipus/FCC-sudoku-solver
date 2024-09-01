const { clear } = require("@babel/register/lib/cache");
import { solveString, printBoard } from 'sudoku-dlx'
 

class SudokuSolver {
  
  validate(puzzleString) {
    try{
    if(puzzleString==""||puzzleString==undefined){
      return ({ error: 'Required field missing'})
    }else if(puzzleString.length!=81){
      return ({ error: 'Expected puzzle to be 81 characters long' })
    }else{
      //verifier si le contenu du string est bien que chiffre ou .
      //^(?!.*(word1|word2|word3)) ==> /^(?!.*(^[\d.]+$))/
      //[^\d.]*
      let regexCheck=/[^\d.]+/;
      const resultRegexCheck=puzzleString.match(regexCheck);    
      if(resultRegexCheck!==null){
        return ({ error: 'Invalid characters in puzzle'});
      }else{
        return ('valid');
      }
    }
  }catch(err){
    return ({ error: 'Puzzle cannot be solved' });
  }
 }
  solve(puzzleString) {
    let solvableCheck = false;
    const resultSolve=solveString(puzzleString);
    if (resultSolve.length>0){
      solvableCheck=true;
    }else{
      solvableCheck=false
    }
    if(solvableCheck!=true){
      return ({ error: 'Puzzle cannot be solved' })
    }else{
      
      const resultToArray= printBoard(resultSolve[0]).split("");
      
      const resultToArryFiltered=resultToArray.filter((item)=>{
        
        if(item.match(/[0-9]/)!=null){
          return item
        }
      });
      const resultToString=resultToArryFiltered.join("");
      console.log(resultToString)
      return ({solution:resultToString});
    }
    
  }

  checkRowPlacement(puzzleString, entryRow, entryCol, entryValue) {

    var arrayOfPuzzle=this.split(puzzleString);
    const arrayDecomposed=this.subdivide(arrayOfPuzzle);
	  var validity='KO';
    const rowToSearchIn=arrayDecomposed[0].find(item=>item.name==entryRow).row;
    for(let i=0;i<9;i++){
      if(i!=entryCol-1){
        if(rowToSearchIn[i]==entryValue){
          validity='KO'
          break;
        }else{
          validity='OK';
        }
      }
    }
    console.log('row val ? : '+validity);
    return validity
  }

  checkColPlacement(puzzleString, entryRow, entryCol, entryValue) {
    var arrayOfPuzzle=this.split(puzzleString);
    const arrayDecomposed=this.subdivide(arrayOfPuzzle);
	  var validity='KO';
    const colToSearchIn=arrayDecomposed[1].find(item=>item.name==entryCol).col;
    for(let i=0;i<9;i++){
      let currentRow='A';
      if(i==1){
        currentRow='B';
      }else if(i==2){
        currentRow='C';
      }else if(i==3){
        currentRow='D';
      }else if(i==4){
        currentRow='E';
      }else if(i==5){
        currentRow='F';
      }else if(i==6){
        currentRow='G';
      }else if(i==7){
        currentRow='H';
      }else if(i==8){
        currentRow='I';
      }
      if(currentRow!=entryRow){
        if(colToSearchIn[i]==entryValue){
          validity='KO';
          break;
        }else{
          validity='OK';
        }
      }
    }
    console.log('col val ? : '+validity);
    return validity
  }

  checkRegionPlacement(puzzleString, entryRow, entryCol, entryValue,entryCoordinate) {
    var arrayOfPuzzle=this.split(puzzleString);
    const arrayDecomposed=this.subdivide(arrayOfPuzzle);
	  var validity='KO';
    const gridNumberEntryFunction=function(){
      switch(entryCoordinate){
        case 'A1':
        case 'A2':
        case 'A3':
        case 'B1':
        case 'B2':
        case 'B3':
        case 'C1':
        case 'C2':
        case 'C3':
          return 1;
        case 'A4':
        case 'A5':
        case 'A6':
        case 'B4':
        case 'B5':
        case 'B6':
        case 'C4':
        case 'C5':
        case 'C6':
          return 2;
        case 'A7':
        case 'A8':
        case 'A9':
        case 'B7':
        case 'B8':
        case 'B9':
        case 'C7':
        case 'C8':
        case 'C9':
          return 3;
        case 'D1':
        case 'D2':
        case 'D3':
        case 'E1':
        case 'E2':
        case 'E3':
        case 'F1':
        case 'F2':
        case 'F3':
          return 4;
        case 'D4':
        case 'D5':
        case 'D6':
        case 'E4':
        case 'E5':
        case 'E6':
        case 'F4':
        case 'F5':
        case 'F6':
          return 5;  
        case 'D7':
        case 'D8':
        case 'D9':
        case 'E7':
        case 'E8':
        case 'E9':
        case 'F7':
        case 'F8':
        case 'F9':
          return 6;
        case 'G1':
        case 'G2':
        case 'G3':
        case 'H1':
        case 'H2':
        case 'H3':
        case 'I1':
        case 'I2':
        case 'I3':
          return 7;
        case 'G4':
        case 'G5':
        case 'G6':
        case 'H4':
        case 'H5':
        case 'H6':
        case 'I4':
        case 'I5':
        case 'I6':
          return 8;
        case 'G7':
        case 'G8':
        case 'G9':
        case 'H7':
        case 'H8':
        case 'H9':
        case 'I7':
        case 'I8':
        case 'I9':
          return 9;           
      };
    };
    const gridNumberEntry=gridNumberEntryFunction();

    const gridElementNumberFunction=(function(){
      switch(entryCoordinate){
        case 'A1':
        case 'A4':
        case 'A7':
        case 'D1':
        case 'D4':
        case 'D7':
        case 'G1':
        case 'G4':
        case 'G7':
          return 1;
        case 'A2':
        case 'A5':
        case 'A8':
        case 'D2':
        case 'D5':
        case 'D8':
        case 'G2':
        case 'G5':
        case 'G8':
          return 2;
        case 'A3':
        case 'A6':
        case 'A9':
        case 'D3':
        case 'D6':
        case 'D9':
        case 'G3':
        case 'G6':
        case 'G9':
          return 3;
        case 'B1':
        case 'B4':
        case 'B7':
        case 'E1':
        case 'E4':
        case 'E7':
        case 'H1':
        case 'H4':
        case 'H7':
          return 4;
        case 'B2':
        case 'B5':
        case 'B8':
        case 'E2':
        case 'E5':
        case 'E8':
        case 'H2':
        case 'H5':
        case 'H8':
          return 5;
        case 'B3':
        case 'B6':
        case 'B9':
        case 'E3':
        case 'E6':
        case 'E9':
        case 'H3':
        case 'H6':
        case 'H9':
          return 6;        
        case 'C1':
        case 'C4':
        case 'C7':
        case 'F1':
        case 'F4':
        case 'F7':
        case 'I1':
        case 'I4':
        case 'I7':
          return 7;
        case 'C2':
        case 'C5':
        case 'C8':
        case 'F2':
        case 'F5':
        case 'F8':
        case 'I2':
        case 'I5':
        case 'I8':
          return 8;
        case 'C3':
        case 'C6':
        case 'C9':
        case 'F3':
        case 'F6':
        case 'F9':
        case 'I3':
        case 'I6':
        case 'I9':
          return 9;
      }
    });
    const gridElementNumber=gridElementNumberFunction();
    const gridToSearchIn=arrayDecomposed[2].find(item=>item.name==gridNumberEntry).grid;
    for(let i=1;i<10;i++){
      if(i!=gridElementNumber){
        if(gridToSearchIn[i-1]==entryValue){
          validity='KO'
          break;
        }else{
          validity='OK';
        }
      }
    }
    console.log('grid val ? : '+validity);
    return validity

  }
  




  checkGlobal(puzzleString,entryCoordinate,entryValue){
    if(puzzleString.length!=81){
      return ({ error: 'Expected puzzle to be 81 characters long' })
    }else{
      //verifier si le contenu du string est bien que chiffre ou .
      //^(?!.*(word1|word2|word3)) ==> /^(?!.*(^[\d.]+$))/
      //[^\d.]*
      let regexCheck=/[^\d.]+/;
      const resultRegexCheck=puzzleString.match(regexCheck);    
      if(resultRegexCheck!==null){
        return ({ error: 'Invalid characters in puzzle'});
      }else{
        //continue
        if(entryCoordinate.length!=2){      
          return ({ error: 'Invalid coordinate'});
        }
        //split coordinate into column and row
        var entryRow=entryCoordinate.slice(0,1);
        var entryCol=entryCoordinate.slice(1,2);      
        if(entryRow.match(/[A-I]/)!=null && entryCol.match(/[1-9]/)!=null){
          //continue
          //check Value
          if(entryValue.match(/[1-9]/)!=null&&entryValue.length==1){
            
            //continue here
            //go to checkRowPlacement then checkCol inside the first then CheckGrid 
            const resultRowPlacement=this.checkRowPlacement(puzzleString,entryRow,entryCol,entryValue);
            const resultColPlacement=this.checkColPlacement(puzzleString,entryRow,entryCol,entryValue);
            const resultGridPlacement=this.checkRegionPlacement(puzzleString,entryRow,entryCol,entryValue,entryCoordinate);
            var conflictPlacement=[];
            var validityPlacement=false;
            
            if (resultRowPlacement!='OK'){
              conflictPlacement.push('row');
            }           
            if (resultColPlacement!='OK'){
              conflictPlacement.push('column');
            }
            if(resultGridPlacement!='OK'){
              conflictPlacement.push('region');
            }
            if(resultColPlacement=='OK'&&resultGridPlacement=='OK'&&resultRowPlacement=='OK'){
              validityPlacement=true
            }
 
            if(validityPlacement!=true){
              return({valid:false,conflict:conflictPlacement});
            }else{
              return({valid:true});
            }
                          
          }else{
            return ({ error: 'Invalid value' });
          }
        }else{
          return ({ error: 'Invalid coordinate'});
        }
      }
    }
  }


  split(puzzleString){
    return puzzleString.split("")
    
  }

subdivide(ArrayPuzzle){

	const allRows=[{name:'A',row:ArrayPuzzle.slice(0,8)},{name:'B',row:ArrayPuzzle.slice(9,17)},{name:'C',row:ArrayPuzzle.slice(18,26)},{name:'D',row:ArrayPuzzle.slice(27,35)},{name:'E',row:ArrayPuzzle.slice(36,44)},{name:'F',row:ArrayPuzzle.slice(45,53)},{name:'G',row:ArrayPuzzle.slice(54,62)},{name:'H',row:ArrayPuzzle.slice(63,71)},{name:'I',row:ArrayPuzzle.slice(72,80)}];
  const colAll=[];
	for(let i=0;i<8;i++){
		colAll.push([ArrayPuzzle[i],ArrayPuzzle[i+9],ArrayPuzzle[i+18],ArrayPuzzle[i+27],ArrayPuzzle[i+36],ArrayPuzzle[i+45],ArrayPuzzle[i+54],ArrayPuzzle[i+63],ArrayPuzzle[i+72]]);
	};
	const allCols=[{name:'1',col:colAll[0]},{name:'2',col:colAll[1]},{name:'3',col:colAll[2]},{name:'4',col:colAll[3]},{name:'5',col:colAll[4]},{name:'6',col:colAll[5]},{name:'7',col:colAll[6]},{name:'8',col:colAll[7]},{name:'9',col:colAll[8]}];
	const grid123=[];
	const grid456=[];
	const grid789=[];
  let j=0;
  let k=0;
	for(let i=0;i<7;i++){
    if(i==0||i==3||i==6){
		j=27+i;
		k=54+i;
		grid123.push([ArrayPuzzle[i],ArrayPuzzle[i+1],ArrayPuzzle[i+2],ArrayPuzzle[i+9],ArrayPuzzle[i+10],ArrayPuzzle[i+11],ArrayPuzzle[i+18],ArrayPuzzle[i+19],ArrayPuzzle[i+20]]);

		grid456.push([ArrayPuzzle[j],ArrayPuzzle[j+1],ArrayPuzzle[j+2],ArrayPuzzle[j+9],ArrayPuzzle[j+10],ArrayPuzzle[j+11],ArrayPuzzle[j+18],ArrayPuzzle[j+19],ArrayPuzzle[j+20]]);

		grid789.push([ArrayPuzzle[k],ArrayPuzzle[k+1],ArrayPuzzle[k+2],ArrayPuzzle[k+9],ArrayPuzzle[k+10],ArrayPuzzle[k+11],ArrayPuzzle[k+18],ArrayPuzzle[k+19],ArrayPuzzle[k+20]]);
    }
	};
	const allGrids=[{name:'1',grid:grid123[0]},{name:'2',grid:grid123[1]},{name:'3',grid:grid123[2]},{name:'4',grid:grid456[0]},{name:'5',grid:grid456[1]},{name:'6',grid:grid456[2]},{name:'7',grid:grid789[0]},{name:'8',grid:grid789[1]},{name:'9',grid:grid789[2]}];
	return ([allRows,allCols,allGrids]);	
}
}
module.exports = SudokuSolver;

