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
  * @require JQUERY & JQUERY TIMER
  *
  * global timer and counter ///////////////////////////////////////////////////////////////
  */

MilliSecondTimerInterval=1000;
StepTimerBar=20;
counter = 0;
timer = $.timer(function() 
{
   //$('#div-counter').html(++counter);
   counter++;
   ResizeBar(counter);
   if(counter>=SecondPerRound)
   {
      timer.stop();
      //var GameMode = $('#system_game_mode').val();
      if(SystemGameMode=='single')
      {
         $('#box-win').html('<img src="img/cup.jpg" width="80px" /><br/>'+$('#box-player-name-0').html()+MessageDictionnary(' a un score de ')+$('#box-player-score-0').html());
         $('#box-win').show();
         //$('#system_game_win').attr('value',1); //set game to win
         SystemGameWin = 1;
         $('#footer').html('<div style="float:left">'+ButtonNextStep('step1', MessageDictionnary('Nouveau jeu'))+'</div><div style="float:right">'+ButtonNextStep('replay', MessageDictionnary('Rejouer ce match'))+'</div><div style="clear:both"></div>');
         //AddHtmlToContainer('box-message',$('#box-player-name-0').html()+MessageDictionnary(' a un score de ')+$('#box-player-score-0').html());
         //prepare to restart the game by setting counter 0
         counter=0; 
         ResizeBar(counter);     
      }else
      {
         //no answer given, play again same kind of question
         //$('#system_round').attr('value', (parseInt($('#system_round').val()-1)));
         SystemRound=SystemRound-1;
      }
      //$('#div-counter').html('');
      if(QuestionInactiveOnTimerCountDown==true)
      {
         //$('#system_active_question').attr('value',0);   //set question to inactive after counter ends
         //SystemQuestionActive=0;
         SystemCurrentQuestion='';
      }
      
   }         
});

timer.set({ time : MilliSecondTimerInterval, autostart : false });


