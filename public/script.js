var arrayofrequest= [];

var getTemp = function () {
     var request= {
      city:  $('.get-city').val(),
   
     }
     //var city_requested = $('.get-city').val();
    arrayofrequest.push(request);
  $.get({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + request.city + '&units=metric&appid=d703871f861842b79c60988ccf3b17ec',
    success: function (data) {
      
      request.temp = data.main.temp;
     
      var output_card=
  '<div class="container-fluid">' +
  '<div class = "row">' +
  '<div class = "col-md-11" >' +
  '<h1 class = "city" >' + request.city + '</h1>' +
  '<p  class= "temperature">' + request.temp  + 'C </p>' +
  //comment section
  '<ul class="comments-list">' +  '</ul>' +
  '<div class= "input-group" >' +
  '<input type="text" class="form-control get-comment" placeholder="Comment about the weather" aria-describedby="basic-addon1">' +
  '<div class="input-group-append">' +
  '<button class="btn btn-success btn-comment" type="button"> Comment </button>' +
  '</div>' +
  '</div>' +
  '</div>' + // fin 1ere colonne
  '<div class = "col-md-1" >' + //trash 
  '<button class="btn btn-danger float-right my-class" type="button">' +
  '<i class="fa fa-trash" aria-hidden="true"></i>' + '</button>' +
  '</div>' +
  '</div>' + // close the row
  '</div>'; // close the container 



      $('.output').append(output_card);
      //$('.city').html(city_requested);
      //$('.temperature').html(cel);
    },
    error: function () {
      console.log('error');
    }
  });
}



  
//EVENT LISTNER 

//bind the input form to enter event (not click event)
//the user can submit with the enter button
$('.request-form').submit(function (event) {
  event.preventDefault(); 
  getTemp();
});

//get comment 
$('.output').on('click','.btn-comment', function () {
var comment = $(this).closest('.input-group').find('input').val();
  //var comment = $(this).closest('input').val();   //does not work!!
$('.comments-list').append('<li>' + comment + '</li>');
});

//remove one result 
$('.output').on('click','.btn-danger', function(){
    $(this).closest('.container-fluid').remove();
});

