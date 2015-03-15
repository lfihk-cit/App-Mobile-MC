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

function InputToHtml(Type, Id, Value, Size, Info)
{
   var Tips = '';
   if(Info.length>0)
   {
      Tips=' title="'+Info+'" ';   //remove ' and "
   }
   return '<input type="'+Type+'" id="'+Id+'" class="form-control" value="'+Value+'" size="'+Size+'" '+Tips+' />';
}
/*
  * return an html input
  *
  * @param  string (type of input)
  * @param  mixed (id of field so that it is called by jsquery
  * @param  mixed (value of input)
  * @param  integer (size of the input)
  * @param  string (text to put before input)
  * @param  string (text to after before input)
  * @return string (html input)
  *
  */
function LabelInputToHtml(Type, Id, Value, Size, Pre, Info)
{
   var Html = '<div class="label-field" id="box_field_'+Id+'" >'+Pre+'</div>';
   Html += '<div class="input-field" >';
   Html += InputToHtml(Type, Id, Value, Size, Info);
   Html += '<div class="error" id="message_'+Id+'"></div>';
   Html += '</div><div class="fclear"></div>';
   return Html;
}

function ResetField(FieldId)
{
   $('#'+FieldId).attr('value','');
}

function ButtonNextStep(NextMode, Label)
{
   return ButtonToHtml('javascript:Run('+"{'mode':'"+NextMode+"'}"+');', Label);
   //return '<button onclick="javascript:Run('+"'"+NextMode+"'"+');">'+Label+'</button>';
}

function ButtonToHtml(OnclickValue, Label)
{
   return '<button onclick="'+OnclickValue+'" class="btn btn-primary">'+Label+'</button>';
}




function PlayerNameForm()
{
   var Html='<div class="title2">'+MessageDictionnary('Nom des joueurs ?')+'</div>';
   //build fields for player name
   for(var a=0; a < MaxNumberPlayer; a++)
   {
      ResetField('player_name_'+a); //remove previous string ?
      //var OldName=$('#player_name_'+a).val();
      //if(OldName===undefined) {OldName='';}
      Html+=LabelInputToHtml('text','player_name_'+a,'',10,MessageDictionnary('Joueur')+' '+(a+1),MessageDictionnary('Les noms en double seront supprimes (saisir des caracteres)'));//<div id="message_'+a+'" class="error"></div>
      Html+='<div class="fclear"></div>';
   }
   return Html;
}

function DropdownPlayerId(Id)
{
   var Dropdown='<select id="player_id">';
   Dropdown+='<option value="-1">'+MessageDictionnary('Joueur')+'</option>';
   for(var u=0; u<Players.length; u++)
   {
   
      Dropdown+='<option value="'+Players[u].GetId()+'" ';
      if(Id == Players[u].GetId())
      {
         Dropdown+='SELECTED';
      }
      Dropdown+='>'+Players[u].GetName()+'</option>';
   }
   Dropdown+='</select>';

   return Dropdown;

}

function DropdownLevelName()
{
   var Dropdown='<div class="title2">'+MessageDictionnary('Niveau de jeu ?')+'</div><select id="level_name">';
   for(var u=0; u<Levels.length; u++)
   {
      Dropdown+='<option value="'+Levels[u].GetName()+'" ';
      Dropdown+='>'+Levels[u].GetName()+'</option>';
   }
   Dropdown+='</select>';

   return Dropdown;
}



function IT_ButtonChangeLangage()
{
   var Html = '<button onclick="LT_ChangeLangage('+"'fr'"+');" class="language-flag"><img src="img/fr.jpg" /></button>';
   Html += '<button onclick="LT_ChangeLangage('+"'en'"+');" class="language-flag"><img src="img/us-en.jpg" /></button>';
   return Html;
}

function MultiPlayerParameterForm()
{
   var Html = '<div class="title1">'+MessageDictionnary('Parametre de la partie ?')+'</div>';
   Html += LabelInputToHtml('text', 'second_per_round', SecondPerRound, 3, MessageDictionnary('Temps par question ?'), MessageDictionnary('Duree entre 1 et 400 secondes (saisir un entier)'));
   Html += LabelInputToHtml('text', 'score_win', ScoreWin, 3, MessageDictionnary('Score pour gagner ?'), MessageDictionnary('Score pour gagner (saisir un entier)'));
   return Html;
}
