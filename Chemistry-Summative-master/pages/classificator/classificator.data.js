/* Chemistry JS Chemical Compiund Classificator
 * Author: Yannick Abouem
 * Date: *insert end date here*
 * ============================================================================
 * Description
 * ============================================================================
 * This program analizes and sorts, based on the name, a chemical compound by
 * deviding the name in substring and recognizing which elements is made of,
 * if it is an ion, if it is a biomolecule and which functional group contains.
 * This program works only with IUPAC naming, i.e. polyethanoate instead of 
 * poliyvinil, common names are not supported since they are inconsistant and
 * they do not reveal the composition of a compound.
 * ============================================================================
 */

let molecule = document.getElementById("chemComp");
const list1 = ['bromo', 'butoxy', 'butyl', 'cloro', 'ethoxy', 'ethyl', 'fluoro', 'hydroxy', 'iodio', 'methoxy', 'metyl', 'phenyl'];
const list2 = ['di', 'tri'];
const forbiddenChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '-'];

String.prototype.removeForbiddenChars = function(){
  let test = false;
  do{
    for(let i of forbiddenChars){
      if(this.charAt(0) === i){
        this = this.substring(1);
        test = true;
      }
      else
        test = test || false;
    }
  }while(test);
}

function loop(){
  let test = false;
  do{
    molecule.forbiddenChars();
    for(let j of list2){
      if(molecule.search(j) == 0){
        molecule = molecule.substring(molecule.search(j), molecule.search(j) + j.length);
      }
    }
    for(let i of list1){
      if(molecule.search(i) == 0){
        molecule = molecule.substring(molecule.search(i), molecule.search(i) + i.length);
        test = true;
        break;
      }
      else
        test = test || false;
    }
  }while(test)
}