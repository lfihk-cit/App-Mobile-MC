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
  * Colorize all player boxes
  *
  * @param  string (color hexa)
  *
  */
function ColorizeAllPlayer(Color)
{
   for(var a=0;a<Players.length; a++)
   {
      ColorizeOnePlayer(Players[a].GetId(),Color);
   }
}

/*
  * Colorize 1 player box
  *
  * @param  string (color hexa)
  *
  */
function ColorizeOnePlayer(PlayerId, Color)
{
   ColorizeElement('box-player-'+PlayerId, Color);
}
/*
  * Colorize 1 html element
  *
  * @param  string (color hexa)
  *
  */
function ColorizeElement(Id, Color)
{
   
   $('#'+Id).css("background-color",Color);
}
/*
  * Show one html element
  *
  * @param  string
  *
  */
function ShowElement(Id)
{
   $('#'+Id).show();
   
}
/*
  * Hide one html element
  *
  * @param  string
  *
  */
function HideElement(Id)
{
   $('#'+Id).hide();
}
/*
  * Show/hide one html element (do opposite than is current visibility)
  *
  * @param  string (color hexa)
  *
  */
function ToogleElement(Id)
{
   if($('#'+Id).is(":visible"))
   {
      $('#'+Id).hide();
   }else
   {
      $('#'+Id).show();
   }
}

/*
  * Show string operation and place result in result box
  *
  * @param  array ([0] string [1] result)
  *
  */

function ShowOperation(Operation)
{
   //set result for checking into hidden input
   SystemResult=Operation[1];
   if(SystemGameMode=='multi')
   {
      MultiPlayerShowOperation(Operation[0]);
   }else
   {
      SinglePlayerShowOperation(Operation[0]);
   }
   ShowElement('box-string-operation');
}

function MultiPlayerShowOperation(StringOperation)
{
   //set string of operation and show it
   $("#box-string-operation").html(StringOperation);  
} 



function SinglePlayerShowOperation(StringOperation)
{
    //set string of operation and show it
   
   AnswerInput = '<form name="virtual" style="vertical-align: text-bottom;display:inline"><input type="text" id="inline_input_player_answer" class="form-control" name="text" style="width:60px;display:inline;" /></form>';
  
   StringOperation=StringOperation.replace("?",AnswerInput.toString());
   $("#box-string-operation").html(StringOperation);
   //$("#inline_input_player_answer").focus();
   $("#inline_input_player_answer");
   
}

/*
  * Resize counter bar
  *
  * @param  string (color hexa)
  *
  */
function ResizeBar(Counter)
{
   //alert(Counter);
   $('#bar-timer').css('width',(Counter*StepTimerBar)+'px');
}

/*
  * depending on game mode, run correct function answer
  *
  */
/*
function FrontAnswer()
{
   //var GameMode = $('#system_game_mode').val(); 
   Run('answer');
}
*/
/*
  * Open answer pop up form
  *
  */
function PopupAnswerForm(Id)
{
    if(SystemGameMode=='single')
    { //if single mode, we do not open the popup window
      return;
    }
   if(SystemCurrentQuestion.length==0)//if(SystemQuestionActive == 0)
   {  //we do not open popup if no question to answer
      AddHtmlToContainer('box-message',MessageDictionnary('Pas de question en cours...'));
      return;
   }
   
   //stop the clock & hide question
   Run({'mode':'popup_answer_form', 'id_player':Id});

   
}

function MultiPlayerInitPopupAnswer(Id)
{
   //activate keys
   KeyAsAnswer();
   //stop timer for multi player game      
   timer.stop();
   //hide the question
   $('#box-string-operation').hide();
   AddHtmlToPopupBox('answer');
   
   //show the answer window
   $('#box-answer').show();
   //make answer input blank
   $('#popup_input_player_answer').attr('value','');
   //load dropdown of player
   $('#box-player-name').html(DropdownPlayerId(Id));
   //focus on answer input
   //$('#popup_input_player_answer').focus();
   $('#popup_input_player_answer');
}

/*
  * Add html to a container
  *
  * @param  string (container id)
  * @param  string (html)
  *
  */
function AddHtmlToContainer(ElementId, Html)
{
   $('#'+ElementId).html(Html);
}

/*
  * Add html to log container if debbug
  *
  * @param  string (html)
  *
  */
function Log(Message)
{
   if(IsDebugMode==true)
   {  //mode debugging from config file, show logs
      var OldMessage= $('#log').html();
      AddHtmlToContainer('log', OldMessage+'<br/>'+Message+' result:'+SystemResult);
      //AddHtmlToContainer('log', OldMessage+'<br/>ScoreWin:'+ScoreWin);
   }
}

function LT_ChangeLangage(Langage)
{
   //delete array Dictionnary then load langage file and execute step1 once loaded
   delete Dictionnary;
   $.getScript('js/translation/dictionnary.'+Langage+'.js', function() {
             Run({'mode':'step1'});
   });
   
}


/*
function LevelQuestionToForm()
{

}
*/
function AddHtmlToPopupBox(Type) {
	$('#box-popup').empty();//empty box
	if(Type=='answer')
	{

		//Content = '<div class="box-close"><a style="color:#FFFFFF; text-decoration:none;" href="javascript:ClosePopupAnswerForm();">X</a></div> <div id="box-player-name"></div> <div id="box-form"><br/><input type="text" class="form-control" id="popup_input_player_answer" size="3" /><br /><button class="btn btn-warning btn-sm" onclick="javascript:Run({\'mode\':\'answer\'});"><b>?</b></button></div>';
		Content = '<div id="box-player-name"></div> <div id="box-form"><br/><form name="virtual" style="vertical-align: text-bottom;display:inline"><input type="text" class="form-control" id="popup_input_player_answer" size="3" name="text" /></form><br /><button class="btn btn-warning btn-lg" onclick="javascript:Run({\'mode\':\'answer\'});"><b>?</b></button></div>';
		Content += '<div style="clear:both;padding:10px 0px 0px 0px;">';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'7\')"><b>7</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'8\')"><b>8</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'9\')"><b>9</b></a><br />';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'4\')"><b>4</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'5\')"><b>5</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'6\')"><b>6</b></a><br />';   
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'1\')"><b>1</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'2\')"><b>2</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'3\')"><b>3</b></a><br />';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'0\')"><b>0</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie_box(\'.\')"><b>,</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:31%" href="#" role="button" onclick="saisie(\' \')"><b>&#9251; </b></a><br />';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:47%" href="#" role="button" onclick="back()"><b><</b></a>';
		Content += '<a class="btn btn-default" style="margin:1%;height:35px;width:48%" href="#" role="button" onclick="reset()"><b>C</b></a>';
		Content += '</div><br /><br /><button class="btn btn-primary btn-lg" onclick="javascript:Run({\'mode\':\'answer\'});">valider</button>'; 
		Content += '<div class="fclear"></div>';

		$('#box-popup').html(Content);
		$('#box-popup').show();
      
	} else if(Type=='player_data') {
		if(SystemCurrentQuestion.length==0) {
			DisableKeys();
			$('#box-popup').html(FormChangePlayerData());
			$('#box-popup').show();
		}
	}
}


/* not used
function ArrayToHtml(ArrayToConvert)
{
   var Html='<ul>';
   for(var a=0;a<ArrayToConvert.length; a++)
   {
      Html+='<li>'+ArrayToConvert[a]+'</li>';
   }
   return Html+'</ul>';
   
}
*/

