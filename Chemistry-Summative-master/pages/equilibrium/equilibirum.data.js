/* ChemistryJs Equilibrium Calculatro tool
 * Autho: Yannick Abouem
 * Date: 6/1/2019
 * ========================================================================
 * Description
 * ========================================================================
 * The following program will, given a reaction and the solution, calculate
 * the equilibrium constant.
 * ========================================================================
*/

function equilibrium(){
    try {

        let coefficent1 = document.getElementById("coefficen1").value;
        let concentration1 = document.getElementById("concentration1").value;
        let coefficent2 = document.getElementById("coefficen2").value;
        let concentration2 = document.getElementById("concentration2").value;
        let coefficent3 = document.getElementById("coefficen3").value;
        let concentration3 = document.getElementById("concentration3").value;
        let coefficent4 = document.getElementById("coefficen4").value;
        let concentration4 = document.getElementById("concentration4").value;
    
        let divisor = Math.pow(concentration1, coefficent1) * Math.pow(concentration2, coefficent2);
        let dividend = Math.pow(concentration3, coefficent3) * Math.pow(coefficent4, concentration4);
        if(isNaN(dividend) || isNaN(divisor)) throw "not a number exception";
        else if(!isFinite(dividend) || !isFinite(divisor)) throw "large number exception"
        else if(divisor === 0) throw "division by zero exception"
        else document.getElementById("resoult").innerHTML = dividend/divisor;

    } catch (error) {
        alert(error);
    }
}

document.getElementById("button").addEventListener("click", equilibrium);
