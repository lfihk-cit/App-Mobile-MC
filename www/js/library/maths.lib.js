
/*
    This file is part of Open Calcul Mental.

    Open Calcul Mental is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Open Calcul Mental is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

    Authors: Raphael Gillardeau & Regis Manin on behalf of the French International School of Hong Kong (www.fis.edu.hk)
*/

/*
 * Test if a text is a valid numeric value. It says true for integer and float\
 */
function IsNumeric(n)
{ 
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
 * return a random number between min and max (round parameter is not used by now)
 */
function RandomNumber(min, max, round)
{
   if(round>0)
   {
      //random digit after ,?
   }
   return (Math.floor(Math.random() * (max-min+1)) + min);
   //return Math.floor(Math.random()*(max+1));
}

/*
 * Format a number (integer) into a floating number - javascript handles decimal badly so all calculation are made with integer
 */
function IntegerToDecimalString(Number_, DecimalDigit_)
{
	Number = Number_.toString();
	return Number.substring(0, (Number.length-DecimalDigit_)) +'.'+Number.substring((Number.length-DecimalDigit_),Number.length);
}


// Complement is 100 for CE2 & CM1 or 1000 for CM2
function Generate_Complement(Complement)
{
   var Operation=Array(2);
   var N1 = RandomNumber(2,(Complement-1),0);
   var R = Complement - N1;
   Operation[0]=N1 + " + ? = "+Complement;
   Operation[1]=R;
   return Operation;
}


// table of x by a max number based on class (CE2 is 11, CM1 is 12)
function Generate_Product_table_by_max(Multiplicator,MaxNumber)
{
   //multioplier 1 nombre a chiffre par table 1-11
   var Operation=Array(2);
   var N1 = Multiplicator;
   var N2 = RandomNumber(2,MaxNumber,0);
   var R = N1 * N2;
   Operation[0]=N1+" x "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Product_table_CE2(TableNumber)
{   
    return Generate_Product_table_by_max(TableNumber, 11)
}

function Generate_Product_table_CM1(TableNumber)
{   
    return Generate_Product_table_by_max(TableNumber, 12)
}

function Generate_Product_table_CM2(TableNumber)
{   
    return Generate_Product_table_by_max(TableNumber, 10)
}

// CE2 //////////////////////////////////////////////////////////////

function Generate_Addition_21_12_CE2()
{
   //addition 3 nombres dont 2 a 1 chiffre et 1 a 2 chiffres
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var N2 = RandomNumber(2,9,0);
   var N3 = RandomNumber(10,99,0);

   var R = N1 + N2 + N3;
   Operation[0]=N1+" + "+N2+" + "+N3+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Addition_22_CE2()
{
   //addition de 2 nombres a 2 chiffres
   var Operation=Array(2);
   var N1 = RandomNumber(10,99,0);
   var N2 = RandomNumber(10,99,0);

   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}


function Generate_Addition_12_11_CE2()
{
   //addition de 2 nombres a 2 chiffres
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var N2 = RandomNumber(10,99,0);

   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Addition_21_CE2()
{
   //addition de 2 nombres a 2 chiffres
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var N2 = RandomNumber(2,9,0);

   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}


function Generate_Addition_Special_12_CE2(SpecialNumber)
{
   //addition 9, 19...99 a 1 nombres a 2 chiffres = Generate_Addition_89_12_CE2(9)
   //addition 8, 198...98 a 1 nombres a 2 chiffres = Generate_Addition_89_12_CE2(8)
   var Operation=Array(2);
   var N1 = RandomNumber(0,9,0);
   N1 = N1 * 10 + SpecialNumber;
   var N2 = RandomNumber(10,99,0);

   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Substraction_12_11_CE2()
{
   //addition de 2 nombres a 2 chiffres
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var N2 = RandomNumber(10,99,0);

   var R = N2 - N1;
   Operation[0]=N2+" - "+N1+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Substraction_22_CE2()
{
   var Operation=Array(2);
   var N1 = RandomNumber(10,98,0);
   var N2 = RandomNumber(10,N1,0);

   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Substraction_Special_12_CE2(SpecialNumber)
{
   //SOUSTARTCION 9, 19...99 a 1 nombres a 2 chiffres = Generate_Substraction_89_12_CE2(9)
   //soustraction 8, 198...98 a 1 nombres a 2 chiffres = Generate_Substraction_89_12_CE2(8)
   
   var Operation=Array(2);
   var N1 = RandomNumber(10,99,0);
   var N2 = SpecialNumber;
   var Max = Math.floor(N1/10)-1;
   N2 = N2 + (10 *  RandomNumber(0,Max,0));

   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}


function Generate_Product_11_CE2()
{
   //multioplier 1 nombre a chiffre par table 1-11
   var Operation=Array(2);
   var N1 = RandomNumber(2,10,0);
   var N2 = RandomNumber(2,11,0);
   var R = N1 * N2;
   Operation[0]=N1+" x "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}



function Generate_Product_max100_CE2()
{

   var Operation=Array(2);
   var N1 = RandomNumber(1,50,0);
   if(N1<=33)
   {
      var N2 = RandomNumber(1,3,0);
   }else
   {
      var N2 = RandomNumber(1,2,0);
   }
   var R = N1 * N2;
   Operation[0]=N1+" x "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}


function Generate_Division_12_11_not_null_CE2()
{
  /* //result = quotient entier ET le reste
   //le quotient maximum doit etre de 10.
   var Operation=Array(2);
   var N1 = RandomNumber(2,99,0);
   var N2 = RandomNumber(2,9,0);
   var R = Math.floor(N1 / N2);
   var Remaining =N1-(R*N2);
   if(R == (N1 / N2))
   {
      R=Math.floor(N1 / N2);
      Remaining=0;
   }
  
   Operation[0]=N1+" : "+R+ " = ?";
   Operation[1]=N2+' '+Remaining;
*/
//result = quotient entier ET le reste
   //le quotient maximum doit etre de 10.
   var Operation=Array(2);
   var N1 = RandomNumber(2,10,0);
   var N2 = RandomNumber(2,10,0);
   var Remainer = RandomNumber(1,(N1-1),0);
   var N3 = N1 * N2 + Remainer;
   Remainer = N3 %  N1;
   if(Remainer == 0)
   {
        N2 = N3/N1;
   }
   Operation[0]=N3+" : "+N1+ " = ?";
   Operation[1]=N2;
   if(Remainer>0)
   {
      Operation[1]+=' '+Remainer;
   }
   
   return Operation;
}

function Generate_Division_12_11_nul_CE2()
{
   //result = quotient entier ET le reste
   //le quotient maximum doit etre de 10.
   var Operation=Array(2);
   var N1 = RandomNumber(2,10,0);
   var N2 = RandomNumber(2,10,0);
   var N3 = N1 * N2;
  
   Operation[0]=N3+" : "+N1+ " = ?";
   Operation[1]=N2;

   return Operation;
}

// CM1 ///////////////////////////////////////////////////////

function Generate_Addition_22_11_CM1()
{
   //un a trois chiffres, un à deux chiffres et un seul nombre à un chiffre.
   var Operation=Array(2);
   var N1 = RandomNumber(100,99,0);
   var N2 = RandomNumber(10,99,0);
   var N3 = RandomNumber(2,9,0);
   var R = N1 + N2 + N3;
   Operation[0]=N1+" + "+N2+" + "+N3+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Product_CM1()
{
   //<=12 x (20, 30, 40, 50, 60, 70, 80, 90, 100)
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var Mult=new Array(2,3,4,5,6,7,8,9,10,11,12,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900,1000);//1,
   var IndexMult = RandomNumber(0,(Mult.length-1),0);

   var N2 = Mult[IndexMult];
   var R = N1 * N2;
   Operation[0]=N1+" x "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

/*
function Generate_Complement_Decimal_CM1()
{  //javascript handle decimal very badly, so we do all maths on integer ad then render the decimal in string
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var D1 = RandomNumber(2,9,0);
   var N2 =N1+1;
   var R = "0."+(10-D1);
   Operation[0]=N1+"."+D1+" + ? = "+ N2;
   Operation[1]=R;
   return Operation;

}
*/
function Generate_Division_not_null_CM1()
{
    /* refactor division so that 3 classes use same */
   //result = quotient entier ET le reste
   //le quotient maximum doit etre de 11.
   var Operation=Array(2);
   var N1 = RandomNumber(1,11,0);
   var N2 = RandomNumber(1,11,0);
   var Remainer = RandomNumber(1,(N1-1),0);
   var N3 = N1 * N2 + Remainer;
   Remainer = N3 %  N1;
   if(Remainer == 0)
   {
        N2 = N3/N1;
   }
   Operation[0]=N3+" : "+N1+ " = ?";
   Operation[1]=N2;
   if(Remainer>0)
   {
      Operation[1]+=' '+Remainer;
   }
   //alert(Operation[1]);
   return Operation;

}

function Generate_Division_null_CM1()
{
    /* refactor division so that 3 classes use same */
   //result = quotient entier ET le reste
   //le quotient maximum doit etre de 11.
   var Operation=Array(2);
   var N1 = RandomNumber(2,11,0);
   var N2 = RandomNumber(2,11,0);
   
   var N3 = N1 * N2;
   
   Operation[0]=N3+" : "+N1+ " = ?";
   Operation[1]=N2;
  
   return Operation;

}

/*
function Generate_Complement_factor_10_CM1(Max_)
{
   var Operation=Array(2);
   var N1 = RandomNumber(2,Max_,0);
   var N2 = Max_+1;
   var R = N2 - N1;
   Operation[0]=N1 + ' + ? = '+ N2 ;
   Operation[1]=R;
   return Operation;
}
*/

function Generate_Complement_Decimal_up_CM1(Up_)
{
   //javascript handle decimal very badly, so we do all maths on integer ad then render the decimal in string 
   //up have to be 1, 10 or 10
   //9999 = 99.99 (decimal are integer formated in  decimal when printed
   var Operation=Array(2);
   var N1 = RandomNumber(101,999,0);	//10.01 is minimum
   if(Up_==1)
   { //decimal to reach +1
     N2=Math.floor(N1/10)*10+10;
     var R = N2-N1; 
   }else if(Up_ == 10)
   { //decimal to reach + next number that can be divided by 10
     N2 = Math.ceil(N1/100)*100;
     if(Math.floor(N2)==Math.floor(N1))
     {  //in case we are dealiing with 20, 30,...
        N2=N2+10;
     }
     var R = N2-N1;
   }else
   { //decimal tp 100
     N2 = 1000;
     var R = N2-N1;
   }     
   Operation[0]=IntegerToDecimalString(N1,1)+ " + ? = "+ (N2/10);
   if(R>10)
   {
      Operation[1]=IntegerToDecimalString(R,1);
   }else
   {  //result is 6 but it means 0.6 and not 0.06
      Operation[1]=IntegerToDecimalString('0'+R.toString(),1);
   }
   return Operation;
}



// CM2 /////////////////////////////////////////////////////////

function GenerateAdditionDecimalCM2()
{
   //Uniquement 4 nombres à proposer. Très important : un a trois chiffres, un à deux chiffres et deux nombres à un chiffre.
   var Operation=Array(2);
   var N1 = RandomNumber(1,99,0) + (RandomNumber(1,99,0)*0.01);
   var N2 = RandomNumber(1,99,0) + (RandomNumber(1,99,0)*0.01);
   var R = N1  + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Addition_22_21_CM2()
{
   var Operation=Array(2);
   var N1 = RandomNumber(10,99,0);
   var N2 = RandomNumber(10,99,0);
   var N3 = RandomNumber(2,9,0);
   var N4 = RandomNumber(2,9,0);
   var R = N1 + N2 + N3 + N4;
   Operation[0]=N1+" + "+N2+" + "+N3+" + "+N4+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Addition_32_11_CM2()
{
   var Operation=Array(2);
   var N1 = RandomNumber(10,99,0);
   var N2 = RandomNumber(10,99,0);
   var N3 = RandomNumber(10,99,0);
   var N4 = RandomNumber(2,9,0);
   var R = N1 + N2 + N3 + N4;
   Operation[0]=N1+" + "+N2+" + "+N3+" + "+N4+" = ?";
   Operation[1]=R;
   return Operation;
}
function Generate_Addition_32_CM2()
{
   var Operation=Array(2);
   var N1 = RandomNumber(10,99,0);
   var N2 = RandomNumber(10,99,0);
   var N3 = RandomNumber(10,99,0);
   var R = N1 + N2 + N3;
   Operation[0]=N1+" + "+N2+" + "+N3+" = ?";
   Operation[1]=R;
   return Operation;
}


function Generate_Addition_22_D1_CM2()
{
   var Operation=Array(2);
   var N1 = RandomNumber(100,999,0);
   var N2 = RandomNumber(100,999,0);

   var R = N1 + N2;
   Operation[0]=IntegerToDecimalString(N1,1)+" + "+IntegerToDecimalString(N2,1)+" = ?";
   Operation[1]=IntegerToDecimalString(R,1);

   return Operation;
}
function Generate_Addition_22_D2_CM2()
{
   var Operation=Array(2);
   var N1 = RandomNumber(1000,9999,0);
   var N2 = RandomNumber(1000,9999,0);
 
   var R = N1 + N2;
   Operation[0]=IntegerToDecimalString(N1,2)+" + "+IntegerToDecimalString(N2,2)+" = ?";
   Operation[1]=IntegerToDecimalString(R,2);
	
   return Operation;
}

function Generate_Substraction_13_11_CM2()
{
   //Un nombre a 3 chiffres moins un nb a 1 chiffres
   var Operation=Array(2);
   var N1 = RandomNumber(100,999,0);
   var N2 = RandomNumber(2, 9,0);
   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+ " = ?";
   Operation[1]=R;
   return Operation;
   
}

function Generate_Substraction_13_12_CM2()
{
   //Un nombre a 3 chiffres moins un nb a deux chiffres
   var Operation=Array(2);
   var N1 = RandomNumber(100,999,0);
   var N2 = RandomNumber(10, 99,0);
   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+ " = ?";
   Operation[1]=R;
   return Operation;
   
}

function Generate_Substraction_13_13_CM2()
{
   
   var Operation=Array(2);
   var N1 = RandomNumber(101,999,0);
   var N2 = RandomNumber(100, N1,0);
   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+ " = ?";
   Operation[1]=R;
   return Operation;
   
}
function Generate_Substraction_13_Special_CM2(SpecialNumber)
{
   
   var Operation=Array(2);
   var N1 = RandomNumber(101,999,0);
   var N2 = SpecialNumber + (RandomNumber(2, 9,0) *10);
   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+ " = ?";
   Operation[1]=R;
   return Operation;
   
}

function Generate_Complement_Decimal_up_CM2(Up_)
{
   //javascript handle decimal very badly, so we do all maths on integer ad then render the decimal in string 
   //up have to be 1, 10 or 10
   //9999 = 99.99 (decimal are integer formated in  decimal when printed
   var Operation=Array(2);
   var N1 = RandomNumber(1001,9999,0);	//10.01 is minimum
   if(Up_==1)
   { //decimal to reach +1
     N2=Math.floor(N1/100)*100+100;
     var R = N2-N1; 
   }else if(Up_ == 10)
   { //decimal to reach + next number that can be divided by 10
     N2 = Math.ceil(N1/1000)*1000;
     if(Math.floor(N2)==Math.floor(N1))
     {  //in case we are dealiing with 20, 30,...
        N2=N2+100;
     }
     var R = N2-N1;
   }else
   { //decimal tp 100
     N2 = 10000;
     var R = N2-N1;
   }     
   Operation[0]=IntegerToDecimalString(N1,2)+ " + ? = "+ (N2/100);
   if(R>10)
   {
      Operation[1]=IntegerToDecimalString(R,2);
   }else
   {  //result is 6 but it means 0.6 and not 0.06
      Operation[1]=IntegerToDecimalString('0'+R.toString(),2);
   }
   return Operation;
}


function Generate_Product_CM2()
{
   
   //<=13 x (20, 30, 40, 50, 60, 70, 80, 90, 100 &&  200, 300, 400, 500, 600, 700, 800, 900, 1000)
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var Multiplicante=new Array(2,3,4,5,6,7,8,9,10,11,12,13,15,25, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000);
   var Index = RandomNumber(0,(Multiplicante.length-1),0);
   var N2 = Multiplicante[Index];
   var R = N1 * N2;
   Operation[0]=N1+" x "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}


/*
function GenerateDivisionCM2()
{
   //result = quotient entier ET le reste
   //le quotient maximum doit etre de 12.
   var Operation=Array(2);
   var N1 = RandomNumber(10,999,0);
   var N2 = RandomNumber(2,12,0);
   var R = Math.floor(N1 / N2);
   var Remaining =N1-(R*N2)
  
   Operation[0]=N1+" : "+R+ " = ?"; // = N2 (N2 is the result)
   Operation[1]=N2+' '+Remaining;
   return Operation;
}

function GenerateComplementDecimal()
{
   var Operation=Array(2);
   var N1 = RandomNumber(1,999,0);
   var Complement =N1+1;
   var D1 = RandomNumber(1,99,0);
   var R = (100 - D1)*0.01;
   Operation[0]=N1 + "." + D1 + " + ? = "+Complement;
   Operation[1]=R;
   return Operation;
}

*/

/*
set of question 1 
CP
-	Connaître les compléments à 10 (additions et 3 10) ; « 1 + … = 10 »
-	Connaître les doubles des nombres inférieurs à 10 ; « quel est le double de … »
-	Calculer des différences (le nombre le plus grand </= 10) ; « 8 – 3 = »
-	Additionner des dizaines entières / Soustraire des dizaines entières (inférieur à 100) ; « 30 + 20 =» et « 60 - 40 »
-	Additionner deux nombres de 2 chiffres plus petits que 30, sans retenue. «  16 + 12 =» ou « 8 + 11 = »
CE1 :
-	Connaître les doubles et les moitiés de nombres d’usage courant < 100 et se terminant par 0 ou 5 ;
-	Connaître les tables de multiplication par 2, 3, 4 et 5 ;
-	Calculer mentalement des sommes de deux nombres de dizaines entières et de d et u, sans retenue, et au résultat plus petit que 100 ; « 53 + 24 », « 12 + 47 » 
-	Connaître les compléments à la dizaine supérieure ;  « 12 +…= 20 » ou « 87 +…=90 »
-	Calculer des sommes et des différences : ajouter, retirer 9 (nombres inférieurs à 100) ; « 61-9 »

*/
/*
set of question 2
-	Connaître les compléments à 10 sous la forme 1 + ... = 10 ;
-	Connaître les doubles des nombres inférieurs à 10 sous la forme 3 + 3 = ;
-	Calculer des différences (le nombre le plus grand </= 10) sous la forme 8 – 4 = … ;
-	Additionner des dizaines entières / Soustraire des dizaines entières sous la forme 10 + 20 = … / 20 – 10 = … ;
-	Additionner deux nombres de 2 chiffres plus petits que 30, sans retenue sous la forme 23 + 11 = … .
CE1 :
-	Connaître les doubles / les moitiés de nombres d’usage courant < 100 et se terminant par 0 ou 5 sous la forme 35 X 2 = … / 70 : 2 = … ;
-	Connaître les tables de multiplication par 2, 3, 4 et 5 sous la forme 4 X 6 = … ;
-	Calculer mentalement des sommes de deux nombres de dizaines entières / de d et u, sans retenue, et au résultat plus petit que 100 sous la forme 30 + 50 = … / 51 + 37 = …;
-	Connaître les compléments à la dizaine supérieure sous la forme 34 + … = 40 ;
-	Calculer des sommes / des différences : ajouter 9 / retirer 9 sous la forme 58 + 9 = … / 78 – 9 = …
*/




function Generate_Double_CP(Min_, Max_)
{
    //Connaître les doubles des nombres inférieurs à 10 ; « quel est le double de … »
   var Operation=Array(2);
   var N1 = RandomNumber(Min_,Max_,0);
   var N2 = N1;

   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Double_CE1()
{
   //Connaître les doubles des nombres d’usage courant < 100 et se terminant par 0 ou 5 ;
   var Operation=Array(2);
   var AllNumbers = Array(10,15,20,25,30,35,40,45);
   var i = RandomNumber(0,(AllNumbers.length-1),0);
   var N1 = AllNumbers[i];
   var N2 = N1;

   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Half_CE1()
{
   // Connaître les moitiés de nombres d’usage courant < 100 et se terminant par 0 ou 5 ;
   var Operation=Array(2);
   
   var EvenNumbers =  Array(10,20,30,40,50,60,70,80,90,100);
  
   var i = RandomNumber(0,(EvenNumbers.length-1),0);
   var N1 = EvenNumbers[i];
   var N2 = 2;
   

   var R = N1 / N2;
   Operation[0]=N1+" : "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Substraction_CP(Max_)
{
    //Calculer des différences (le nombre le plus grand </= 10) ; « 8 – 3 = »
   var Operation=Array(2);
   var N1 = RandomNumber(2,Max_,0);
   var N2 = RandomNumber(2,N1,0);

   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Addition_by10_CP()
{
    //Additionner des dizaines entières 30 + 20 =
   var Operation=Array(2);
   var N1 = RandomNumber(1,9,0);
   var N2 = RandomNumber(1,(10-N1-1),0) * 10;
   N1 = N1 *10;
   
   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Substraction_by10_CP()
{
    // Soustraire des dizaines entières (inférieur à 100) ; « 60 - 40 »
   var Operation=Array(2);
   var N1 = RandomNumber(1,10,0);
   var N2 = RandomNumber(1,N1,0) * 10;
   N1 = N1 * 10;
   
   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Addition_2numbersBelowMax_CP(Max)
{
   //Additionner deux nombres de 2 chiffres plus petits que 30, sans retenue. «  16 + 12 =» ou « 8 + 11 = »
   var Operation=Array(2);
   //get the tens
   var N1 = RandomNumber(1,Max,0)*10;   //we at least have 1 number bigger than 10
   var N2 = RandomNumber(0,Max,0)*10; 
   //get 1 digit number
   var N3 = RandomNumber(1,9,0);    
   var SumLower10=(10-N3-1);
   if(SumLower10<0){
    SumLower10=0;
   }    
   var N4 = RandomNumber(0,SumLower10,0);  //we do not want sum to be over 9
   
   var R = (N1+N3) + (N2+N4);
   Operation[0]=(N1+N3)+" + "+(N2+N4)+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Product_table_CE1()
{
    //Connaître les tables de multiplication par 2, 3, 4 et 5 ;
    var N1 = RandomNumber(2,5,0);
    var N2 = RandomNumber(2,10,0);
    return Generate_Product_table_by_max(N1,N2)
}

function Generate_Addition_Max100_CE1()
{
    //Calculer mentalement des sommes de deux nombres de dizaines entières et de d et u, sans retenue, et au résultat plus petit que 100 ; « 53 + 24 », « 12 + 47 » 
   var Operation=Array(2);

   //get the tens
   var N1 = RandomNumber(1,9,0);   //we at least have 1 number bigger than 10
   var N2 = RandomNumber(0,(10-N1-1),0)*10; 
   N1 = N1 * 10;
   //get 1 digit number
   var N3 = RandomNumber(2,9,0);    
   var N4 = RandomNumber(0,(10-N3-2),0);

   var R = (N1+N3) + (N2+N4);
   Operation[0]=(N1+N3)+" + "+(N2+N4)+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Complement_Up_CE1()
{
    //Connaître les compléments à la dizaine supérieure ;  « 12 +…= 20 » ou « 87 +…=90 »
   var Operation=Array(2);
   var N1 = RandomNumber(1,9,0);
   var N2 = (N1+1)*10;
   var N3 = RandomNumber(1,9,0);
   N1 = N1*10+N3
   
   var R = N2 - N1;
   Operation[0]=N1+" + ? = "+N2
   Operation[1]=R;
   return Operation;
}

function Generate_Substraction_9_CE1()
{
    // Calculer des différences :retirer 9 (nombres inférieurs à 100) ; « 61-9 »
   var Operation=Array(2);
   var N1 = RandomNumber(9,99,0);
   var N2 = 9
   
   var R = N1 - N2;
   Operation[0]=N1+" - "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}

function Generate_Addition_9_CE1()
{
    // Calculer des SOMMES :ajouter 9 (nombres inférieurs à 100) ; « 61+9 »
   var Operation=Array(2);
   var N1 = RandomNumber(2,90,0);
   var N2 =9
   
   var R = N1 + N2;
   Operation[0]=N1+" + "+N2+" = ?";
   Operation[1]=R;
   return Operation;
}


function Generate_Addition_31_CE1()
{
   //addition 3 nombres a 1 chiffre
   var Operation=Array(2);
   var N1 = RandomNumber(2,9,0);
   var N2 = RandomNumber(2,9,0);
   var N3 = RandomNumber(2,9,0);

   var R = N1 + N2 + N3;
   Operation[0]=N1+" + "+N2+" + "+N3+" = ?";
   Operation[1]=R;
   return Operation;
}


function Generate_Complement_10_CP()
{
	return Generate_Complement(10);
}

function Generate_Complement_100_CE2()
{
	return Generate_Complement(100);
}

function Generate_Complement_1000_CM1()
{
	return Generate_Complement(1000);
}




