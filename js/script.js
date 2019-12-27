$(function() {

$('.headerText').text(headerText);
$('.headerText, .instruction').css({'color':headerInstructionColor});
$('.instruction').text(InstructionText);
$('body').css({'backgroundImage':bg})

// display the question 
let showQuestion = function(){
	let index = 1;
	let html ='';
	for(index;  index <= numberOfQuestionToDisplay; index++){
		let randA = Math.ceil(Math.random() * (max - min)+1) + min;
		let randB = Math.ceil(Math.random() * (max - min)+1) + min;
		let data = `<div class="questionBox">
                  <div class="questBoxA quest"><p>${randA}</p></div>
                  <div class="compareBox quest drop"></div>
                  <div class="questBoxB quest"><p>${randB}</p></div>
               </div>`;
        html = html + data;
	}
	$('.questionContainer').html(html);
}
showQuestion();

// function for drag and drop
  function dragDrop(){

	  $('.drag').draggable({
	        revert: 'invalid',
	        snapMode: 'inner',
            helper: 'clone'
	  });

	  $(".drop" ).droppable({
	  	    // console.log("drop working");
	        accept:".drag",
	        tolerance: 'intersect',
		    drop: function(event, ui) {

		     $(this).append($(ui.draggable).clone());

		     if($(this).children("p").length > 1){
		     	$(this).children("p:nth-child(1)").remove(); 
		     	// console.log('workigng');
		     }
		      var drop_el = $(this).offset();
		      var drag_el = ui.draggable.offset();
		      var left_end = (drop_el.left + ($(this).width() / 2)) - (drag_el.left + (ui.draggable.width() / 2));
		      var top_end = (drop_el.top + ($(this).height() / 2)) - (drag_el.top + (ui.draggable.height() / 2));
		      $(this).addClass("highlight").find("p");
		      ui.draggable.animate({
		        top: '+=' + top_end,
		        left: '+=' + left_end
		      });
		    },
	  }); 

  }  //end here drag and drop 

  dragDrop();

  let wellDoneAudio = new Audio('audio/welldone.mp3');
  let tryAgainAudio = new Audio('audio/tryAgain.mp3');

var correctAns = 0;
var questionLength = numberOfQuestionToDisplay;

  $('#check').click(function(){
    correctAns = 0;
  	let questionBox = $('.questionBox');
  	$.each(questionBox, function(i){
  		let sign;
  		let getA = Number($(this).find('.questBoxA p').text());
  		let getB = Number($(this).find('.questBoxB p').text());
  		let compareSign = $(this).find('.compareBox p').text();

  		if(compareSign == '>'){
  			if(getA > getB){
          correctAns++;
  				$(this).find('.compareBox p').addClass('green');
  			}else{
  				$(this).find('.compareBox p').addClass('red');
  			}
  		}

  		if(compareSign == '<'){
		   if(getA < getB){
  				correctAns++
  				$(this).find('.compareBox p').addClass('green');
  			}else{
  				$(this).find('.compareBox p').addClass('red');
  			}
  		}

      if(compareSign == '='){
       if(getA == getB){
          correctAns++
          $(this).find('.compareBox p').addClass('green');
        }else{
          $(this).find('.compareBox p').addClass('red');
        }
      }

  	})

    if(correctAns == questionLength){
        $('.wellDone').fadeIn();
        wellDoneAudio.play();
        setTimeout(function(){
            $('.wellDone').fadeOut();
        },2000)
    }else{
       $('.tryAgain').fadeIn();
       tryAgainAudio.play();
       setTimeout(function(){
          $('.tryAgain').fadeOut();
       },1500)
    }


  });

  $('#next').click(function(){
		showQuestion();
		dragDrop();
  });

  $('#reset').click(function(){
    $('.compareBox').empty();
  });

});  // end document ready function

