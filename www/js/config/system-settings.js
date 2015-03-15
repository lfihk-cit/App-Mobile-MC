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
 * System settings
 *
 * All changed made have to respect Javascript syntax
 *
 */

//player(s) //////////////////////////////////////////////////////////
Players = Array();
MaxNumberPlayer = 6;
MaxNameCharLen = 15; //avoid layout to be brocken if name too long

//debugging
IsDebugMode=false;

//key
PopupKeyNumber=17;
AnswerKeyNumber=13;

//game variable - this is all global variables (bad)
SystemGameMode='open';       //single or multi player or open for step1
SystemLevel='';              //game/school level (CM2,CM1..)
SystemNumberPlayer='';       //number of player of current game
SystemRound='';              //current question index in level question array
SystemResult='';             //current question answer
//var SystemQuestionActive='';     //flag telling if a question is currently active and open for answer
SystemGameWin='';            //flag telling if game is win
SystemQuestion=new Array();  //question of current round
SystemCurrentQuestion='';    //name of current active question, if length>0, then there is a question going on

SystemTimerBoxWidth = 400;   //width in pixel of the play box - to be changed along with the html layout 
SystemTimerContainerWidth = 800;  

//color for question/level
FontColor={'CP':'#EA3247', 'CE1':'#FF9900', 'CE2':'#00CC00', 'CM1':'#3399FF', 'CM2':'#780000'};

//definition of operation(s) per each level. To create a new level, just create a new object and assign valid operation/function. Level name have to be unique
/* original definition, by level
var LevelA = new LevelObject("CM2");
var LevelB = new LevelObject("CM1");
var LevelC = new LevelObject("CE2");
*/

LevelSet = new LevelObject("All");

LevelSet.AddOperation("#addition");
LevelSet.AddOperation("Addition_2numbersBelowMax_CP 3");
LevelSet.AddOperation("Addition_by10_CP");
LevelSet.AddOperation("Addition_9_CE1");
LevelSet.AddOperation("Addition_31_CE1");
LevelSet.AddOperation("Addition_Max100_CE1");
LevelSet.AddOperation("Addition_21_12_CE2");
LevelSet.AddOperation("Addition_22_CE2");
LevelSet.AddOperation("Addition_12_11_CE2");
LevelSet.AddOperation("Addition_21_CE2");
LevelSet.AddOperation("Addition_Special_12_CE2 8");
LevelSet.AddOperation("Addition_Special_12_CE2 9");
LevelSet.AddOperation("Addition_22_11_CM1");
LevelSet.AddOperation("Addition_22_21_CM2");
LevelSet.AddOperation("Addition_32_11_CM2");
LevelSet.AddOperation("Addition_32_CM2");
LevelSet.AddOperation("Addition_22_D1_CM2");
LevelSet.AddOperation("Addition_22_D2_CM2");

LevelSet.AddOperation("#complement");
LevelSet.AddOperation("Complement_10_CP");
LevelSet.AddOperation("Complement_100_CE2");
LevelSet.AddOperation("Complement_Up_CE1");
LevelSet.AddOperation("Complement_1000_CM1");
//LevelSet.AddOperation("Complement 10");
//LevelSet.AddOperation("Complement 100");
//LevelSet.AddOperation("Complement 1000");
//LevelSet.AddOperation("Complement_Decimal_CM1");
LevelSet.AddOperation("Complement_Decimal_up_CM1 1");
LevelSet.AddOperation("Complement_Decimal_up_CM1 10");
LevelSet.AddOperation("Complement_Decimal_up_CM1 100");
LevelSet.AddOperation("Complement_Decimal_up_CM2 1");
LevelSet.AddOperation("Complement_Decimal_up_CM2 10");
LevelSet.AddOperation("Complement_Decimal_up_CM2 100");

LevelSet.AddOperation("#substraction");
LevelSet.AddOperation("Substraction_CP 10");
LevelSet.AddOperation("Substraction_by10_CP");
LevelSet.AddOperation("Substraction_9_CE1");
LevelSet.AddOperation("Substraction_12_11_CE2");
LevelSet.AddOperation("Substraction_22_CE2");
LevelSet.AddOperation("Substraction_Special_12_CE2 8");
LevelSet.AddOperation("Substraction_Special_12_CE2 9");
LevelSet.AddOperation("Substraction_13_11_CM2");
LevelSet.AddOperation("Substraction_13_12_CM2");
LevelSet.AddOperation("Substraction_13_13_CM2");
LevelSet.AddOperation("Substraction_13_Special_CM2 8");
LevelSet.AddOperation("Substraction_13_Special_CM2 9");

LevelSet.AddOperation("#product");
LevelSet.AddOperation("Double_CP 1 10");
LevelSet.AddOperation("Product_table_CE1");
LevelSet.AddOperation("Double_CE1");
LevelSet.AddOperation("Double_CP 1 10");
LevelSet.AddOperation("Product_11_CE2");
LevelSet.AddOperation("Product_table_CE2 2");
LevelSet.AddOperation("Product_table_CE2 3");
LevelSet.AddOperation("Product_table_CE2 4");
LevelSet.AddOperation("Product_table_CE2 5");
LevelSet.AddOperation("Product_table_CE2 6");
LevelSet.AddOperation("Product_table_CE2 7");
LevelSet.AddOperation("Product_table_CE2 8");
LevelSet.AddOperation("Product_table_CE2 9");
LevelSet.AddOperation("Product_table_CE2 10");
LevelSet.AddOperation("Product_table_CE2 11");
LevelSet.AddOperation("Product_max100_CE2");
LevelSet.AddOperation("Product_CM1");
LevelSet.AddOperation("Product_table_CM1 2");
LevelSet.AddOperation("Product_table_CM1 3");
LevelSet.AddOperation("Product_table_CM1 4");
LevelSet.AddOperation("Product_table_CM1 5");
LevelSet.AddOperation("Product_table_CM1 6");
LevelSet.AddOperation("Product_table_CM1 7");
LevelSet.AddOperation("Product_table_CM1 8");
LevelSet.AddOperation("Product_table_CM1 9");
LevelSet.AddOperation("Product_table_CM1 10");
LevelSet.AddOperation("Product_table_CM1 11");
LevelSet.AddOperation("Product_table_CM1 12");
LevelSet.AddOperation("Product_CM2");
LevelSet.AddOperation("Product_table_CM2 15");
LevelSet.AddOperation("Product_table_CM2 25");

LevelSet.AddOperation("#division");
LevelSet.AddOperation("Division_not_null_CM1");
LevelSet.AddOperation("Division_null_CM1");
LevelSet.AddOperation("Division_12_11_not_null_CE2");  //_not_round_division is needed to open second field for remaining value of division
LevelSet.AddOperation("Division_12_11_nul_CE2");
LevelSet.AddOperation("Half_CE1");


//list of level. To add new level, simply create a new level object above and add it to this array
Levels = Array();
Levels.push(LevelSet);

//Levels.push(LevelC);
//Levels.push(LevelB);
//Levels.push(LevelA);
