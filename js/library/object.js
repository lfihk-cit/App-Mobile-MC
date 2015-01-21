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
//this library needs to be loaded in head to be used by other libs

//construtor object player
//store name and score
function PlayerObject(PlayerId, PlayerName, ShortcutKey)
{
   this.Id = PlayerId;
   this.GetId = GetId;
   this.Name = PlayerName
   this.GetName = GetName;
   this.SetName = SetName;
   this.Score = 0;
   this.ShortcutKey = ShortcutKey;
   this.IsActive = 1;   //when we start, player is active
   this.GetScore = GetScore;
   this.SetScore = SetScore;
   this.GetShortcutKey = GetShortcutKey;
   this.GetIsActive = GetIsActive;
   this.SetIsActive = SetIsActive;
   this.AddScore = AddScore;
   this.ToHtml = ToHtml;

}
//methods object Player
function GetId()
{
   return this.Id;
}
function GetName()
{
   return this.Name;
}
function SetName(Name_)
{
   this.Name = Name_;
}
function GetScore()
{
   return this.Score;
}
function SetScore(Score_)
{
   this.Score = Score_;
}
function GetShortcutKey()
{
   return this.ShortcutKey;
}
function GetIsActive()
{
   return this.IsActive;
}
function SetIsActive(IsActive_)
{
   this.IsActive = IsActive_;
}
function AddScore(Point)
{
   this.Score+=Point
}
function ToHtml()
{
   //get existing data of player via field or via object
   //@todo  access to player only by 1 way
   CurrentPlayerScore=$('#box-player-score-'+this.GetId()).html();
   if(CurrentPlayerScore==null)
   {  //ok it first time we call ToHtml, so get object value
      CurrentPlayerScore=this.GetScore();
   }
   CurrentPlayerIsActive=$('#player-isactive-'+this.GetId()).val();
   if(CurrentPlayerIsActive==undefined)
   {
      CurrentPlayerIsActive=this.GetIsActive();
   }
   //put all player data into div or field with player id as id
   var Html ='<div id="box-player-'+this.GetId()+'" class="box-player" '; 
   if(CurrentPlayerIsActive==0) {
      //player inactive so it cannot answer and his name is crossed
      Html +='style="text-decoration:line-through;"><a href="javascript:return false;">';
   }else
   {  //player active, allow answer
      Html +='><a id="player-button-'+this.GetId()+'" href="javascript:PopupAnswerForm('+this.GetId()+');">';
   }
   Html +='<div id="box-player-name-'+this.GetId()+'" class="box-player-name" style="">'+this.GetName()+'</div>';
   Html +='</a>';
   Html +='<div id="box-player-score-'+this.GetId()+'" class="box-player-score" style="">'+CurrentPlayerScore+'</div>';
   Html +=InputToHtml('hidden','player-isactive-'+this.GetId(), CurrentPlayerIsActive, '', '');
   Html +='<div style="clear:both"></div>';
   Html +='</div>';
   return Html;
}

//constructor object LevelOperation
//store name and array of operation, index of array = round number
function LevelObject(LevelName)
{
   // initialize the member variables for this instance
   this.Name = LevelName;
   this.GetName = GetName;

   this.ArrayOperation = Array();
   this.AddOperation = AddOperation;
  // initialize the member function references 
  // for the class prototype
  //if (typeof(_leveloperation_prototype_called) == 'undefined')
  //{
  //   _leveloperation_prototype_called = true;
  //   LevelOperation.prototype.getName = GetName;
     //LevelOperation.prototype.AddOperation = AddOperation;
 // }
}
//methods of object LevelOperation
function GetName()
{
   return this.Name;
}
function AddOperation(TypeOperation)
{
   this.ArrayOperation.push(TypeOperation);
}
