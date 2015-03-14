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
  * Single entry point: it is main and squeleton of this pogram. Main phase/function grouped here
  *
  * @param associative array
  */
function Run(Parameters)
{
   Mode = Parameters['mode'];
   RunMode = SystemGameMode+'_'+Mode;

   //alert(Parameters['mode']);

   Log('Run '+RunMode);             //this allow keep same flow but different function for single or multi player mode
   //set message box to blank
   AddHtmlToContainer('box-message','');
   switch(RunMode)
   {
      case 'open_step1':         //start of a new game, no SystemGameMode yet
      case 'single_step1':       //when coming back
      case 'multi_step1':
            SystemGameMode='open';  //reset mode once user press back button
            DisableKeys();
            Step1();
      break;
      case 'open_step2':         //configure game option
            Step2();
      break;
     case 'single_step3':       //configure game before launch      
      case 'multi_step3':
            DisableKeys();
            Step3();
      break;
      case 'multi_reset_timer_bar':
            counter=0;
            ResizeBar(counter);
      break;
      case 'multi_configure_step3': //use the user parameter to configure game
            ConfigureMultiStep3();
      break;
      case 'single_configure_step3': //use the user parameter to configure game
	    //to be moved to a function and code reorgaized
        $('#box-timer').show();   	
        $('#box-timer').css('width',(SecondPerRound*StepTimerBar)+'px');
        $('#box-timer').css('left',Math.floor((SystemTimerContainerWidth-(SecondPerRound*StepTimerBar))/2)+'px');
      break;
      case 'single_init':           //group configure and init??
            InitializeTimerSinglePlayerGame();
            //remove button, cannot start the game again
            $('#footer').empty();
            //NextQuestion();
      break;
      case 'multi_init':
            InitializeTimerMultiPlayerGame();
            //change button to put next question and not start game
            $('#footer').html('<div style="float:right">'+ButtonNextStep('next_question', MessageDictionnary('Continuer'))+'</div><div style="clear:both"></div>');
            //NextQuestion();   
      break; 

      case 'single_next_question':           //playing single first round
            StartTimerSinglePlayerGame();
            NextQuestion();
      break;
      case 'multi_next_question':            //loop on question as long game not win
            NextQuestion();
      break;

      case 'multi_end_next_question':        //reset timer for multi player game , leave it countdown otherwize
            counter=0;
            timer.reset();
            timer.play();
      break;
      case 'single_end_next_question':        //hide button for next question in single mode
            FooterMenu({'mode':'empty'});
            $('#footer').html(ButtonNextStep('replay', MessageDictionnary('Rejouer')));
      break;
 
      case 'multi_pre_answer':              //reset timer and show it ready to start on next question button push
         counter=0;
         ResizeBar(counter);
      break;

      case 'multi_form_change_player_data':  
         AddHtmlToPopupBox('player_data');
         FormChangePlayerData();
      break;

      case 'multi_do_change_player_data':
         DoChangePlayerData();   
         
      break;

      case 'multi_popup_answer_form':
         IdPlayer= Parameters['id_player'];
         MultiPlayerInitPopupAnswer(IdPlayer);
         
      break;

     case 'single_configure_popup_form':     //single mode: pre select player 0
         $(document).one(PopupAnswerForm(0));
      break;

     case 'multi_configure_popup_form':      //multi mode, no player selected
         $(document).one(PopupAnswerForm(-1));
         break;         

      case 'multi_close_popup_answer_form':  //restart timer for multi player game
         if(counter < SecondPerRound)
         {
            timer.toggle();
         }
      break;

      case 'multi_answer':                   //multi mode: check for winner and wait user click next question 
         DisableKeys();    
         Answer($('#player_id').val());
         IsGameWin($('#player_id').val());
         IsPlayerDisqualified($('#player_id').val());
      break;

      case 'single_answer':                  //loop to next question after answer
         //single player, run next question as soon as correct answer given
         //Answer($('#player_id').val());
         DisableKeys();
         if(Answer(0)===true)
         {
            NextQuestion();
            $('#inline_input_player_answer').focus();
         }else
         {
            //wait for correct answer
         }
      break;

     case 'multi_replay':
      case 'single_replay':
         Replay();
      break;

      default:
         Log('Run '+Mode+MessageDictionnary(' : Ce mode est inconnu du programmme'));//AddHtmlToContainer('box-message',Mode+MessageDictionnary(' : Ce mode est inconnu du programmme'));
      break;    
     
   }
}

function RunAndReturn(Parameters)
{
   Mode = Parameters['mode'];
   RunMode = SystemGameMode+'_'+Mode;
   switch(RunMode)
   {
      case 'multi_step2':        //configuration for multi game
         return MultiPlayerParameterForm();
      break;
      //case 'single_step2':       //configuration for single game
      //   return '';  
      //break;
      case 'single_choose_question':
         return SinglePlayerChooseQuestion();
      break;
      case 'multi_choose_question':
         return SinglePlayerChooseQuestion();//MultiplayerChooseQuestion();
      case 'single_make_question_list':
         return SinglePlayerCreateQuestionList();
      break;
      case 'multi_make_question_list':
         return SinglePlayerCreateQuestionList();//MultiPlayerCreateQuestionList();
      break;
      case 'multi_pre_step3':    //checking user parameter of step 2
            return GameParameterIsCorrect();
      break;
      case 'single_pre_step3':   //nothing to check, return true to continue
            return true;
    }
   return '';//otherwize container receiving return value becomes undefined
}

function FooterMenu(Parameters)
{
   Mode = Parameters['mode'];
   RunMode = SystemGameMode+'_'+Mode;
  // alert(RunMode);
   var LabelMode = LabelNextQuestion();
   switch(RunMode)
   {
      case 'multi_step1':
      case 'single_step1':
      case 'open_step1':
         $('#footer').html('<div class="fright">'+ButtonNextStep('step2',  MessageDictionnary('Continuer'))+'</div><div class="fclear"></div>');
      break;
   
      //case 'multi_replay':
      case 'single_replay':
         $('#footer').html('<div class="fright">'+ButtonNextStep('next_question', LabelMode)+'</div><div class="fclear"></div>');
      break;

      case 'multi_step2':
      case 'single_step2':
         var Buttons='';
         Buttons+='<div class="fleft">'+ButtonNextStep('step1', MessageDictionnary('Revenir'))+'</div>';
         if(Players.length>0)
         {
            Buttons+=ButtonNextStep('step3', MessageDictionnary('Continuer'));
         }
         $('#footer').html(Buttons);
      break;

      case 'multi_replay':
      case 'multi_play':   
         $('#footer').html('<div class="fright">'+ButtonNextStep('form_change_player_data', 'Change score')+ButtonNextStep('next_question', LabelMode)+'</div><div class="fclear"></div>');
      break;

      case 'single_play': 
        $('#footer').html('<div class="fright">'+ButtonNextStep('next_question', LabelMode)+'</div><div class="fclear"></div>');
      break;
      case 'single_empty': 
      case 'multi_empty': 
        $('#footer').empty();
      break;
      
   }
}




function Replay()
{
   timer.stop();
   SystemRound=-1;         //index -1 of array of question
   SystemGameWin=0;        //we start, game not won yet
   $('#box-win').hide();
   //SystemQuestionActive=0; //block answer button
   SystemCurrentQuestion='';
   //reinitialize player by removing all field and player boxes from box body, 
   $('#body').empty();
   //reset data of player objects
   for(var a=0; a<Players.length;a++)
   {  //here we change scope using apply to change value of player objects
      SetScore.apply(Players[a], [0]);
      SetIsActive.apply(Players[a], [1]);  
    }
   //and then redraw player form
   $('#body').html(AllPlayerFormToHtml());
   //remove buttons
   $('#footer').empty();//$('#footer').html('');
   /*   
   //initialize game parameters
   if(Players.length==1)
   {
      SystemGameMode = 'single';
      LabelMode = MessageDictionnary('Entrainement');
   }else
   {
      SystemGameMode = 'multi';   
      LabelMode = MessageDictionnary('Match');
   }
   */
   //prepare new question and then run it
   //Run({'mode':'end_next_question'});
   FooterMenu({'mode':'replay'});
   //Run({'mode':'next_question'});
   $("#box-string-operation").html('');
}

/*

  * Start game by Step 1:
  *  show input for player name
  *  Show next button
  */
function Step1()
{
   
   //DisableKeys();
   $('#box-win').hide();   //hide box win if shown (previous win)
   //build player name form
   var Html=PlayerNameForm();
   //build level dropdown
   //Html += DropdownLevelName();
   //Html+='<input type="hidden" id="level_name" value="CE2" />';//disable since we do not choose level now
   //output html
   $('#header').html( MessageDictionnary('Choisir le type de jeu :'));
   $('#body').html(Html); 
   //
   FooterMenu({'mode':'step1'});
   $('#player_name_0').focus();
   $('#flag-langage').html(IT_ButtonChangeLangage());
}


/*
  * Start game, phase 2:
  *  Save player after basic check
  *  Show button to continue or go back
  */
function Step2()
{
   $('#flag-langage').hide();  //hide flag
   delete Players;         //make sure previous player(s) array is empty
   Players = new Array();
   var PlayerName = new Array(); //to double check if players have same name
   
   var Counter=0;
   var TmpName='';   
   var Html='<ul>';
   var IsError=false;

   for(var a=0; a < MaxNumberPlayer; a++)
   {
      TmpName = $('#player_name_'+a).val();
      if(TmpName.length>0 && $.inArray(TmpName, PlayerName)>-1)
      {
          IsError=true;  
      }else
      {
         PlayerName.push(TmpName);
         //TmpName = TmpName.toUpperCase();//upper case to all name, disable by now
         TmpName = TmpName.substring(0,MaxNameCharLen);  //resize name to avoid layout to be brocken in match page
         if(TmpName.length>0 && TmpName.length<20 )
         {
            Players.push(new PlayerObject(Counter, TmpName, ''));//need to add shortcut key
            Html+='<li>'+TmpName+'</li>';
            Counter++;
         }
      }         
   }
   Html+='</ul>';
   if(IsError==true)
   {
      AddHtmlToContainer('box-message',MessageDictionnary('Des joueurs ont des noms identiques. Les doublons ont ete supprimes'));
   }
   //save level that was choosen
   //$('#system_level').attr('value',$('#level_name').val()); //to replace by call to var directly?
   //SystemLevel = $('#level_name').val();//disable now as level is not choose now

   //and set no question active to avoid popup window to open
   //$('#system_active_question').attr('value',0);

   //we know what kind of game we play, lets init system game and run init function
   if(Players.length==1)
   {
      SystemGameMode = 'single';
      LabelMode = MessageDictionnary('Entrainement');
   }else
   {
      SystemGameMode = 'multi';   
      LabelMode = MessageDictionnary('Match');
   }
   Run({'mode':'init'});

   //show confirmation of game
   $('#header').html(MessageDictionnary('Confirmation du jeu ?'));
   $('#body').html(Players.length+' '+MessageDictionnary('joueur(s)'));//+' '+MessageDictionnary('Niveau') + $('#level_name').val()+Html);//disable as level is not choose now

   //show additional form
   Html='';

   Html = RunAndReturn({'mode':'step2'});   //this is a critical call because if SystemGameMode is not initialized, then we crash with a infinite loop 

   Html+=RunAndReturn({'mode':'choose_question'});//ChooseQuestion();
   //if(Html.length>0) 
   {
      $('#body').html($('#body').html()+Html);
   }
   //show button for next step  
   FooterMenu({'mode':'step2'});
}


function GameParameterIsCorrect()
{
   //check parameter
   var Correct=true;
   if(IsNumeric($('#second_per_round').val())===false) 
   {
      Correct=false;
      ColorizeElement('box_field_second_per_round', IncorrectAnswer);
      //AddHtmlToContainer('error_second_per_round',MessageDictionnary('&nbsp;!&nbsp;'));
   }
   if(IsNumeric($('#second_per_round').val())===true && parseInt($('#second_per_round').val()) > SystemTimerBoxWidth)
   {
      //time longer than width of timer, cannot draw it
      Correct=false;
      ColorizeElement('box_field_second_per_round', IncorrectAnswer);   
   }
   if(IsNumeric($('#score_win').val())===false)
   {
      Correct=false;
      ColorizeElement('box_field_score_win', IncorrectAnswer);
      //AddHtmlToContainer('error_score_win',MessageDictionnary('&nbsp;!&nbsp;'));
   }
   return Correct;
}

function AllPlayerFormToHtml()
{
   var Html = '';
    //create player form(s)
   for(var a=0; a<Players.length;a++)
   {
      Html+=Players[a].ToHtml();  
    }
   
   Html += '<br /><div class="col-md-4 col-md-offset-4" style="clear:both">';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'7\')">7</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'8\')">8</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'9\')">9</a><br />';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'4\')">4</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'5\')">5</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'6\')">6</a><br />';   
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'1\')">1</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'2\')">2</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'3\')">3</a><br />';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'0\')">0</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="saisie(\'.\')">,</a><br />';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="reset()">C</a>';
   Html += '<a class="btn btn-default" href="#" role="button" onclick="back()"><</a>';
   Html += '</div>';   
   
   Html+='<div class="fclear"></div>';
   return Html;
}
/*
  * Start game, phase 3:
  *  Initialise single of multi player
  *  and start game
  */
function Step3()
{
   var Html='';

   if(RunAndReturn({'mode':'pre_step3'})===false)
   {
      return;  //stop execution
   }
   SystemQuestion = RunAndReturn({'mode':'make_question_list'});

   if(SystemQuestion.ArrayOperation.length==0)
   {
      alert('Merci de selectionner au moins une question');
      return '';
   }
   
   KeyAsPopup();

   //initparseInt(ialize system parameter
   SystemRound=-1;         //index -1 of array of question
   SystemGameWin=0;        //we start, game not won yet
   //SystemQuestionActive=0; //block answer button
   SystemCurrentQuestion='';
   $('#box-win').hide();   //hide box win if shown (previous win)

  

   
 
   //initialize round and game_win for a new gam
   //$('#system_round').attr('value',-1); //to replace by call to var directly?
   //$('#system_game_win').attr('value',0); //to replace by call to var directly?

   //insert boxes for operation string and timer to header

   AnswerBox = '<div id="box-string-operation">&nbsp;</div><div id="box-timer"><div id="bar-timer"></div></div>';
   AnswerBox += '<br style="clear:both;">';   
   
   
   
   $('#header').html(AnswerBox);
   Run({'mode':'configure_step3'});//resize the timer after it is shown  
   //insert player boxes   
   $('#body').html(AllPlayerFormToHtml());
   //insert button

   if(SystemGameMode=='single')
   {
      LabelMode = MessageDictionnary('Entrainement');
   }else
   {   
      LabelMode = MessageDictionnary('Match');
   }

   FooterMenu({'mode':'play'});

   //block answer button
   //$('#system_active_question').attr('value',0);

}

/*
  * Initialise multi player game
  *
  */
function InitializeTimerMultiPlayerGame()
 {
   Log('Initialize multi player');
   //initialize for multiplayer : 15 seconds  
   //$('#system_game_mode').attr('value','multi');
   StepTimerBar=15;
   StepTimerBar=20;
   
   
   //timer is started and stopped at each question
}

function ConfigureMultiStep3()
{
   SecondPerRound=parseInt($('#second_per_round').val());
   ScoreWin = parseInt($('#score_win').val());
   //from second per round and width of screen, draw timer and define width unit
   StepTimerBar = Math.floor(SystemTimerBoxWidth/SecondPerRound);

 $('#box-timer').show();   	

          $('#box-timer').css('width',(SecondPerRound*StepTimerBar)+'px');
          $('#box-timer').css('left',Math.floor((SystemTimerContainerWidth-(SecondPerRound*StepTimerBar))/2)+'px');
}
/*
  * Initialise single player game
  *
  */
function InitializeTimerSinglePlayerGame()
{  
   Log('Initialize single player');
   ////initialize for multiplayer : 150 seconds
   //$('#system_game_mode').attr('value','single');
   StepTimerBar=2;
   SecondPerRound=150;

   /*
   $('#inline_input_player_answer').bind('keyup',function(e){
        alert(e);
        $.one(Run('answer'));
    });
    */

   //set key for checking answer
   
   $(document).keyup(function(e) {
        //alert(e.keyCode);
        if( //num key above letters
	    e.keyCode == '48' || 
            e.keyCode == '49' ||    
            e.keyCode == '50' ||
            e.keyCode == '51' ||
            e.keyCode == '52' ||
            e.keyCode == '53' ||
            e.keyCode == '54' ||
            e.keyCode == '55' ||
            e.keyCode == '56' ||
            e.keyCode == '57' ||
            
            //pad num key
            e.keyCode == '96' | 
            e.keyCode == '97' ||    
            e.keyCode == '98' ||
            e.keyCode == '99' ||
            e.keyCode == '100' ||
            e.keyCode == '101' ||
            e.keyCode == '102' ||
            e.keyCode == '103' ||
            e.keyCode == '104' ||
            e.keyCode == '105' ||

            //delete & suppr
 	    e.keyCode == '8' ||
	    e.keyCode == '48') 
        {
            //alert($('#inline_input_player_answer').val());
            $(document).one(Run({'mode':'answer'}));
        }
    });
    
}

function StartTimerSinglePlayerGame()
{
   //reset score
   $('#box-player_score_0').html('0');
   //start timer now as timer never stop between question
   counter=0;
   timer.reset();
   timer.play();
}

function ConfigureTimer()
{
   
}
/*
  * Call for next question
  *  Check can execute call
  *  Find and run next question
  */
function NextQuestion()
{
  

   $('#player_id').attr('value',-1); //reset player in answer form
   Log('Next question');
   //check if game still on
   //var IsGameWin = parseInt($('#system_game_win').val()); 
   //if(IsGameWin==1)
   if(SystemGameWin==1)
   {
      AddHtmlToContainer('box-message',MessageDictionnary('Le match est fini'));
      return;
   }
   //once a question is asked, cannot skip
   //var IsQuestionActive = parseInt($('#system_active_question').val());
   //if(IsQuestionActive==1)
   if(SystemCurrentQuestion.length>0)//if(SystemQuestionActive==1)
   {
      AddHtmlToContainer('box-message',MessageDictionnary("Merci de repondre a la question en cours d'abord"));
      return;
   }
   Run({'mode':'reset_timer_bar'});
   //$('#system_active_question').attr('value',1);
   //SystemQuestionActive = 1;
   
   //set to white all player
   ColorizeAllPlayer('');
   //hide popup window of player's answer and reset it
   $('#box-answer').hide();
   $('#input_player_answer').attr('value','');
   //find level we are now playing
   //var GameLevel = $('#system_level').val();
   var CurrentLevel = SystemQuestion;//FindLevelObject(SystemLevel);
   
   //find current question round = current question index in level's question array
   //var CurrentRound = parseInt($('#system_round').val());
   CurrentRound = SystemRound;
   //when reaching last question, go back to beginning as long as nobody win
   
   if(CurrentRound==(CurrentLevel.ArrayOperation.length-1))
   {
      CurrentRound=-1;  //-1 because we go by 1 below
   }
   
   if(CurrentLevel != false)
   {
      //test next operation
      //$('#system_round').attr('value',CurrentRound+1);
      SystemRound = CurrentRound+1;
      CurrentRound=CurrentRound+1;
      //alert(CurrentLevel.ArrayOperation[0]);
      //alert(CurrentLevel.ArrayOperation[1]);
      //alert(CurrentLevel.ArrayOperation[2]);
      //alert(CurrentLevel.ArrayOperation[3]);

      
      SystemCurrentQuestion=CurrentLevel.ArrayOperation[CurrentRound];
        
      //undefinded
      //separate function by space to get function name and argument(s)
      var Tmp = SystemCurrentQuestion.split(' ');
      SystemCurrentQuestion = Tmp[0];
      //read arguments of function
      var Args = '';
      if(Tmp.length>1)
      {  //deals with , of parameter(s)
         Args += Tmp[1]; 
         for(a=2;a<Tmp.length;a++)
         {
            Args += ','+Tmp[a];
         }
      }
      //if(OperationAllowed.indexOf(OperationFunction)>-1)//working with firefox but not IE
      if(IsFunctionDefined('Generate_'+SystemCurrentQuestion))//$.inArray(OperationFunction,OperationAllowed)>-1) 
      {
         Log('Generate'+SystemCurrentQuestion+'('+Args+');');
         //eval is evil
         eval('var CurrentOperation = Generate_'+SystemCurrentQuestion+'('+Args+');');
         ShowOperation(CurrentOperation);
         
      }else
      {
         AddHtmlToContainer('box-message',CurrentOperation+MessageDictionnary(" : Cette operation n'est pas reconnue"));
      }
   }else
   {
      AddHtmlToContainer('box-message',MessageDictionnary("La definition du level de jeu n'est pas disponible"));
   }

   //set question to active
   //$('#system_active_question').attr('value',1);

   Run({'mode':'end_next_question'});
}

/*
  *
  * find level name into global level array. Return false if not found, level object otherwise
  */
function FindLevelObject(LevelName)
{
   if(LevelName!='all')
   {
      var i= 0;
      for(i=0; i<Levels.length;i++)
      {
         //alert(Levels[i].GetName()+ " "+ LevelName);
         if(Levels[i].GetName() == LevelName)
         {
            return Levels[i]; 
         }
      }
      return false;
   }else {
      var CurrentLevel = new LevelObject("all");
      for(i=0; i<Levels.length;i++)
      {
         
         for(var u=0;u<Levels[i].ArrayOperation.length;u++)
         {
            CurrentLevel.AddOperation(Levels[i].ArrayOperation[u]);
         }
      }
      return CurrentLevel;
   }
}

/*
  *
  * Entry point for answer question
  * 
  */
 
function InputName()
{
   if(SystemGameMode == 'single')
   {
      return 'inline_input_player_answer';
   }
   return 'popup_input_player_answer';
} 

function Answer(PlayerId)
{
   if(SystemGameMode == 'multi' && !$('#box-popup').is(":visible")) 
   {    //we stop answer if mode multi and popup is not open 
        return;
   }
    //check that a player is selected
   if(PlayerId==-1)
   {
      AddHtmlToContainer('box-message',MessageDictionnary("Pour repondre, merci de choisir un joueur"));
      return;
   }
   
   //var Answer = parseInt($('#answer_player_'+PlayerId).val());
   //$('#answer_player_'+PlayerId).attr('value','');
   var AnswerValue = $('#'+InputName()).val();
   //alert(AnswerValue);
  
   //var Result = parseInt($('#system_result').val());
   //hide the popup answer
   $('#box-popup').hide();
   
   //make sure that only 1 player can answer and can answer only 1 time
   //var IsQuestionActive = parseInt($('#system_active_question').val());    
   //if(IsQuestionActive==0)
   if(SystemCurrentQuestion.length==0)//if(SystemQuestionActive==0)
   {
      Log('Answer: question is already inactive');
      return false;
   }

   Run({'mode':'pre_answer'});

   //set question to inactive
   //$('#system_active_question').attr('value',0);

   var IsCorrect=false;

   var Result = SystemResult.toString();

   
   //if($('#system_result').val().indexOf(' ')>=0)
   if(Result.indexOf(' ')>=0)
   {
      
      //if($('#system_result').val()== $('#input_player_answer').val())
      if(Result == AnswerValue)
      {
         IsCorrect=true;
      } 
   }else
   {
      if(parseFloat(AnswerValue) == parseFloat(Result))
      {
         IsCorrect=true;
         
      }
   }

   if(SystemGameMode=='single')
   {
      SingleAssignPlayerScore(PlayerId, IsCorrect);      
   }else
   {
      MultiAssignPlayerScore(PlayerId, IsCorrect);
   }   
   // $('#score_player_'+PlayerId).attr('value', Score);

   
   //question is not active
   //$('#system_active_question').attr('value',0);
   

   //KeyAsPopup();
   //
   return IsCorrect;
}

function MultiAssignPlayerScore(PlayerId, IsCorrect)
{
   var Score = parseInt($('#box-player-score-'+PlayerId).html());
   if(IsCorrect)
   {
        Score+=NumberPointCorrectAnswer;
        ColorizeOnePlayer(PlayerId, CorrectAnswer);
   }else
   {
        Score+=NumberPointWrongAnswer;
        ColorizeOnePlayer(PlayerId, IncorrectAnswer);
   }
   SystemCurrentQuestion='';  //delete current question
   $('#box-player-score-'+ PlayerId).html(Score);
   //SystemQuestionActive=0;

   //show question again width result  
   var StringOperation = $("#box-string-operation").html();
   var StringTmpResult=SystemResult.toString()
   StringTmpResult = StringTmpResult.replace(" "," reste "); //to show division
   StringOperation=StringOperation.replace("?",StringTmpResult.toString());
   $("#box-string-operation").html(StringOperation);
   $('#box-string-operation').show(); 
   $('#'+InputName()).attr('value','');   //reset answer field
}

function SingleAssignPlayerScore(PlayerId, IsCorrect)
{
   if(IsCorrect)
   {
        var Score = parseInt($('#box-player-score-'+PlayerId).html());
        Score+=NumberPointCorrectAnswer;
        ColorizeOnePlayer(PlayerId, CorrectAnswer);
        $('#box-player-score-'+ PlayerId).html(Score);
        //SystemQuestionActive=0;
        SystemCurrentQuestion='';  //delete current question
        $('#'+InputName()).attr('value','');   //reset answer field
   }
   
}

function ClosePopupPlayerDataForm()
{
   $('#box-popup').hide();
   KeyAsPopup();
}
function ClosePopupAnswerForm()
{
      $('#box-popup').hide();
      $('#box-player-name').html('');
      $('#box-string-operation').show();
      KeyAsPopup();
      Run({'mode':'close_popup_answer_form'});
   
}

/*
 * not used as we are not checking on object but on field
function GetPlayerObject(PlayerId)
{
   for(a =0;a<Players.length;a++)
   {
      if(Players[a].GetId()==PlayerId)
      {
         return Players[a];
            
      }
   }
   return false;
}

*/


function IsPlayerDisqualified(PlayerId)
{
   var Score = parseInt($('#box-player-score-'+PlayerId).html());
   if(Score<=ScoreLoose)
   {
      //ok, player is disqualified, remove action on button
      $('#player-isactive-'+PlayerId).attr('value',0);
      $('#player-button-'+PlayerId).attr('href', 'javascript:return false;');
      //var CurrentPlayer = GetPlayerObject(PlayerId);
      //SetIsActive.apply(CurrentPlayer, [false]);    
      $('#body').html(AllPlayerFormToHtml());
   }
}
/*
  *
  * Verify that a player win
  */

function IsGameWin(PlayerId)
{
   var Score = parseInt($('#box-player-score-'+PlayerId).html());  
   
   if(Score>=ScoreWin)
   {
      //1 player could win
      var Win=true;
      //get the score that block other player
      var BlockingScore = Score - ScoreDiffWin;
      //var NumberPlayer = parseInt($('#system_number_player').val()); 
     
      //for (var a=0;a<NumberPlayer;a++)

      for (var a=0;a<MaxNumberPlayer;a++)
      {
         //access to other player score 
         if(PlayerId!=a && parseInt($('#box-player-score-'+a).html()) > BlockingScore)
         { PopupAnswerForm 
            //1 player has a score high enough to block other
            AddHtmlToContainer('box-message',ScoreDiffWin+MessageDictionnary(' point(s) de difference(s) necessaire pour gagner'));
            Win=false;
         }
         
      }
      if(Win==true)
      {
         
         $('#box-win').html('<img src="img/cup.jpg" width="80px" /><br/>'+$('#box-player-name-'+PlayerId).html() + MessageDictionnary(' a gagne!!'));
         $('#box-win').show();
         //$('#system_game_win').attr('value',1); //set game to win
         SystemGameWin = 1;
         $('#footer').html('<div style="float:left">'+ButtonNextStep('step1', MessageDictionnary('Nouveau jeu'))+'</div><div style="float:right">'+ButtonNextStep('replay', MessageDictionnary('Rejouer ce match'))+'</div><div style="clear:both"></div>');
      }
   }
   
}

function DisableKeys()
{
  $(document).keyup(function(e) {
      ;
  });

}


/*
  * Only execute action 1 time
  */
function KeyAsAnswer()
{
    $(document).keyup(function(e) {
        
        if(e.keyCode == AnswerKeyNumber && SystemCurrentQuestion.length > 0) 
        {
           //var PlayerId = parseInt($('#player_id').val()); 
           //var GameMode = $('#system_game_mode').val();
                $(document).one(Run({'mode':'answer'})); 
           
        }
        
    });
}

function KeyAsPopup()
{
    $(document).keyup(function(e) {
        
        if(e.keyCode == PopupKeyNumber) 
        {
            $(document).one(Run({'mode':'popup_answer_form'}));
            //Run({'mode':'next_question'});
        }
    });

}

/*
  * Return MessageId is found in current dictionnary table
  * This is used for translation purpose
  *
  * @param  string (token)
  * @return string (token or translation)
  *
  */
function MessageDictionnary(MessageId)
{
   
   //if($.inArray(MessageId,Dictionnary)>-1)
   if(MessageId in Dictionnary)
   {
      return Dictionnary[MessageId];
   }
   return MessageId;
}

function StringQuestionNumber(Counter_)
{
	return Counter_+') ';
}




function MultiplayerChooseQuestion()
{ 
   var Count = 1;
   var Html = '<div class="title1">'+MessageDictionnary('Selection des questions')+'</div>'+MessageDictionnary('S&eacute;lectionner une question de chaque type')+'<br/>';
   
   var OptionAddition=OptionComplement=OptionSubstraction=OptionProduct=OptionDivision='';
   for(var u=0;u<Levels.length;u++)
   {
      var CurrentLevel=Levels[u];

      for(var a = 0; a<CurrentLevel.ArrayOperation.length;a++)
      {
         if(CurrentLevel.ArrayOperation[a].search('#')==0)//
         {
         }else //if(IsFunctionDefined(CurrentLevel.ArrayOperation[a]))//need to clean parameter
         {
            if(CurrentLevel.ArrayOperation[a].search('Addition')==0)
            {
               OptionAddition+='<option value="'+CurrentLevel.ArrayOperation[a]+'">'+StringQuestionNumber(Count)+MessageDictionnary(CurrentLevel.ArrayOperation[a])+'</option>';
            }else if(CurrentLevel.ArrayOperation[a].search('Complement')==0)
            {
               OptionComplement+='<option value="'+CurrentLevel.ArrayOperation[a]+'">'+StringQuestionNumber(Count)+MessageDictionnary(CurrentLevel.ArrayOperation[a])+'</option>';

            }else if(CurrentLevel.ArrayOperation[a].search('Substraction')==0)
            {
               OptionSubstraction+='<option value="'+CurrentLevel.ArrayOperation[a]+'">'+StringQuestionNumber(Count)+MessageDictionnary(CurrentLevel.ArrayOperation[a])+'</option>';

            }else if(CurrentLevel.ArrayOperation[a].search('Product')==0)
            {
               OptionProduct+='<option value="'+CurrentLevel.ArrayOperation[a]+'">'+StringQuestionNumber(Count)+MessageDictionnary(CurrentLevel.ArrayOperation[a])+'</option>';

            }else if(CurrentLevel.ArrayOperation[a].search('Division')==0)
            {
               OptionDivision+='<option value="'+CurrentLevel.ArrayOperation[a]+'">'+StringQuestionNumber(Count)+MessageDictionnary(CurrentLevel.ArrayOperation[a])+'</option>';
            }
	    Count++;
         }
      }
      OptionAddition+=OptionComplement+OptionSubstraction+OptionProduct+OptionDivision;
      OptionComplement+=OptionAddition+OptionSubstraction+OptionProduct+OptionDivision;
      OptionSubstraction+=OptionAddition+OptionComplement+OptionProduct+OptionDivision;
      OptionProduct+=OptionSubstraction+OptionAddition+OptionComplement+OptionDivision;
      OptionDivision+=OptionSubstraction+OptionAddition+OptionComplement+OptionProduct;
   }
   var SelectAddition='<select id="addition_question" style="width:500px">'+OptionAddition+'</select><br/><br/>';
   var SelectComplement='<select id="complement_question" style="width:500px">'+OptionComplement+'</select><br/><br/>';
   var SelectSubstraction='<select id="substraction_question" style="width:500px">'+OptionSubstraction+'</select><br/><br/>';
   var SelectProduct='<select id="product_question" style="width:500px">'+OptionProduct+'</select><br/><br/>';
   var SelectDivision='<select id="division_question" style="width:500px">'+OptionDivision+'</select>';
   
   return Html+SelectAddition+SelectComplement+SelectSubstraction+SelectProduct+SelectDivision;
}


/**
  * Return a color based on Pattern_
  */
function FontColorQuestion(Pattern_)
{
	//to be improved
	//var FontColor={'CE2':'#00CC00', 'CM1':'#3399FF', 'CM2':'#780000'};
	return FontColor[Pattern_];
}

function FontColorQuestionMapping()
{
    var Html = '';   
    for(var c in FontColor)
    {
        Html += '<div style="width:50px; color:'+FontColor[c]+'" class="fright">';
	Html += '<a href="javascript:SelectQuestionByClass('+"'"+c+"'"+');">'+c+'</a></div>';
	Html += '<div style="width:25px; height:15px; background-color:'+FontColor[c]+';" class="fright">&nbsp;</div><div class="fclear"></div>';
    }

    return Html;

}

function LevelQuestionToForm(CurrentLevel)
{
   var Counter = 1;
   var ClassName = '';
   var Html=FontColorQuestionMapping();//<a href="javascript:'+"ToogleElement('question-"+CurrentLevel.GetName()+"');"+'">'+CurrentLevel.GetName()+'</a><br/><div id="question-'+CurrentLevel.GetName()+'" style="display:none;">';//todo: replace space and illegal char
   
   //loop question and add a checkbox
   for(var a = 0; a<CurrentLevel.ArrayOperation.length;a++)
   {
      if(CurrentLevel.ArrayOperation[a].search('#')==-1)
      {
	var FontColor='';
         var RowColor = ColorEven;
         if(a/2 == Math.floor(a/2))
         {
            RowColor=ColorOdd;
         }

	if(CurrentLevel.ArrayOperation[a].search('CP')>0)
	{
		FontColor=FontColorQuestion('CP');
		ClassName = 'CP';

	}else if(CurrentLevel.ArrayOperation[a].search('CE1')>0)
	{
		FontColor=FontColorQuestion('CE1');
		ClassName = 'CE1';

	}else if(CurrentLevel.ArrayOperation[a].search('CE2')>0)
	{
		FontColor=FontColorQuestion('CE2');
		ClassName = 'CE2';

	}else if(CurrentLevel.ArrayOperation[a].search('CM1')>0)
	{
		FontColor=FontColorQuestion('CM1');
		ClassName = 'CM1';

	}else if(CurrentLevel.ArrayOperation[a].search('CM2')>0)
	{
		FontColor=FontColorQuestion('CM2');
		ClassName = 'CM2';
	}else
	{
		FontColor='#000000';
		ClassName = 'X';
	}
		
         Html +=  '<div style="width:750px; float:left; background-color:'+RowColor+'; color:'+FontColor+';">'+StringQuestionNumber(Counter)+MessageDictionnary(CurrentLevel.ArrayOperation[a])+'</div><div class="fleft"><input type="checkbox" id="question_'+a+'" value="'+CurrentLevel.ArrayOperation[a]+'" class="question question-'+ClassName+'"/></div><div class="fclear"></div>'; 
//use 2 css classes, question & question-class for jquery selection
	Counter++;
//class="question-'+CurrentLevel.GetName()+'"
      }else
      {
         Html +='<div class="title2">'+MessageDictionnary(CurrentLevel.ArrayOperation[a].replace('#',''))+'</div>';
      }
       
      //alert(CurrentLevel.ArrayOperation[a]);
   }
   //Html += '</div>'; 
   return Html;
}
function SinglePlayerChooseQuestion()
{
   var Html = '<div class="title1">'+MessageDictionnary('Selection des questions')+'</div>';
   //get level
   for(var a = 0;a<Levels.length;a++)
   {
      Html+=LevelQuestionToForm(Levels[a]);
   }
   return Html;
}


function CheckedQuestionToArray(LevelName)
{
   var CurrentLevelSelectedQuestion=new Array();
   for(var a = 0; a<$("input.question:checked").length;a++)
   { 
      CurrentLevelSelectedQuestion.push($("input.question:checked").eq(a).val());
   }
   return CurrentLevelSelectedQuestion;
}

function SinglePlayerCreateQuestionList()
{
   var SelectedLevelOperation = new LevelObject("CurrentGame");
   
   //loop on level and get selected question
   for(var a = 0; a<Levels.length;a++)
   {
         $.merge(SelectedLevelOperation.ArrayOperation, CheckedQuestionToArray(Levels[a].GetName()));  
   }
   return SelectedLevelOperation;
}

function MultiPlayerCreateQuestionList()
{
   var SelectedLevelOperation = new LevelObject("CurrentGame");
   SelectedLevelOperation.AddOperation($('#addition_question').val());
   SelectedLevelOperation.AddOperation($('#complement_question').val());
   SelectedLevelOperation.AddOperation($('#substraction_question').val());
   SelectedLevelOperation.AddOperation($('#product_question').val());
   SelectedLevelOperation.AddOperation($('#division_question').val());  
   
   return SelectedLevelOperation;
}
function IsFunctionDefined(FunctionName)
{
   return (eval("typeof " + FunctionName) == 'function');
}

function FormChangePlayerData()
{
   //loop player and show name + score + is active
   var Html='<div class="title2">'+MessageDictionnary('Mise &agrave; jour nom et score des joueurs')+'</div><div>';
   for(var a=0; a<Players.length;a++)
   {
      Html+=InputToHtml('text','new_player_name_'+a, $('#box-player-name-'+a).html(),10,''); 
      Html+=InputToHtml('text','new_player_score_'+a, $('#box-player-score-'+a).html(),2,'');  
      Html+='<br/>';    
   }
   Html+=ButtonNextStep('do_change_player_data', MessageDictionnary('update'))+'</div>';
   return Html;
}

function DoChangePlayerData()
{
   //loop on new data fields and check if update possible
   var IsError = false;
   for(var a=0; a<Players.length;a++)
   {
      if($('#new_player_name_'+a).val()=='')
      {
            IsError=true;
      }

      if(IsNumeric($('#new_player_score_'+a).val())==false)
      {
            IsError=true;
      }
   }
   if(IsError)
   {
      AddHtmlToContainer('box-message',MessageDictionnary('Erreur de saisie: un nom a plus de z&eacute; caract&egrave;re et un score est un nombre'));
      return;
   }
   //loop on new data fields and update player fields
   for(var a=0; a<Players.length;a++)
   {
      
      $('#box-player-name-'+a).html($('#new_player_name_'+a).val());
      $('#box-player-score-'+a).html(Math.floor($('#new_player_score_'+a).val()));
      SetName.apply(Players[a], [$('#new_player_name_'+a).val()]);
      //$('#box-player-isactive-'+a).html($('#new_player_isactive_'+a).val());
   }
   //add popup and redraw player name
   $('#box-popup').hide(); 
   $('#body').html(AllPlayerFormToHtml());
}


function LabelNextQuestion()
{
   var LabelMode='';
   if(Players.length==1)
   {
      LabelMode = MessageDictionnary('Entrainement');
   }else
   {
      LabelMode = MessageDictionnary('Match');
   }
   return LabelMode;  
}


function SelectQuestionByClass(Name)
{	//tick/untick checkbox of a class. For example, select all CE1 question
	if($('.question-'+Name).length == $('.question-'+Name+':checked').length) 
	{	//number of ticked box equal number of box, so untick it
		$('.question-'+Name).attr('checked', false);
	} else 
	{	//tick all checkbox
		$('.question-'+Name).attr('checked', true);
	}
}
