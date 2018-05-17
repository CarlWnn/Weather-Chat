var posts = [];

var fetch = function (city) {
    $.get({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&units=imperial&appid=d703871f861842b79c60988ccf3b17ec',
        success: function (data) {

            create_post(data);
            _displayPost();

        },
        error: function () {
            console.log('error');
        }
    });
}


var create_post = function (data) {
    var timeInMs = new Date(Date.now());

    var post = {
        city: data.name,
        country: data.sys.country,
        temp: {
            celsius: Math.round(data.main.temp),
            fahrenheit: Math.round(data.main.temp * 1.8)
        },
        time: {
            timeInMs: timeInMs.getTime(),
            hour: timeInMs.toLocaleTimeString().substring(0, 5),
            date: timeInMs.toLocaleDateString().replace(/\./g, '/')
        },
        comments: [],

    }
    posts.unshift(post);

}

var _displayPost = function () {
    var post = posts[0];

    var postHTML =
        '<li class="container-fluid post">' +
        '<h1 class = "city" >' + post.city + ',' + post.country + '</h1>' +
        '<button class="btn btn-danger float-right my-class" type="button">' +
        '<i  class="fa fa-trash" aria-hidden="true"></i>' + '</button>' +
        '<p  class= "temp">' + post.temp.celsius + 'C/' + post.temp.fahrenheit + 'F  at ' +
        post.time.hour + ' on ' + post.time.date + '</p>' +
        //'<div class= "comments-container">'
        '<ul class="comments-list">' + '</ul>' +
        '<div class="input-group">' +
        '<input type="text" class="form-control enter-comment" placeholder="Comment about the weather" aria-describedby="basic-addon1">' +
        '<div class="input-group-append">' +
        '<button class="btn btn-success btn-comment" type="button"> Comment </button>' +
        '</div>' +
        '</div>' +
        //'</div>' +
        '</li>';

    $('.posts').prepend(postHTML);

}

var _renderPosts = function () {

    $('.posts').empty();

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        var postHTML =
            '<li class="container-fluid post">' +
            '<h1 class = "city" >' + post.city + ',' + post.country + '</h1>' +
            '<button class="btn btn-danger float-right my-class" type="button">' +
            '<i  class="fa fa-trash" aria-hidden="true"></i>' + '</button>' +
            '<p  class= "temp">' + post.temp.celsius + 'C/' + post.temp.fahrenheit + 'F  at ' +
            post.time.hour + ' on ' + post.time.date + '</p>' +
            '<ul class="comments-list">';

        for (var j = 0; j < post.comments.length; j++)
            postHTML += '<li>' + post.comments[j] + '</li>';


        postHTML +=
            '</ul>' +
            '<div class="input-group">' +
            '<input type="text" class="form-control enter-comment" placeholder="Comment about the weather" aria-describedby="basic-addon1">' +
            '<div class="input-group-append">' +
            '<button class="btn btn-success btn-comment" type="button"> Comment </button>' +
            '</div>' +
            '</div>' +
            '</li>';

        $('.posts').append(postHTML);
    }

}


var post_comment = function ($clickedPost) {
    var comment = $clickedPost.find('.enter-comment').val();
    //var comment = $(this).closest('.input-group').find('.enter-comment').val();
    //var comment = $(this).closest('input').val();   //does not work!!
    postIndex = $clickedPost.index();
    posts[postIndex].comments.push(comment);
    $clickedPost.find('.comments-list').append('<li>' + comment + '</li>');
    $('.enter-comment').val('');
}

var sort_by_city = function (a, b) {
    if (a.city < b.city)
        return -1;
    else if (a.city > b.city)
        return 1;
    else
        return 0;
}

var sort_by_temp = function (a, b) {
    return a.temp.celsius - b.temp.celsius;
}

var sort_by_date = function (a, b) {
    return a.time.timeInMs - b.time.timeInMs;

}



var delete_post = function ($clickedPost) {
    var index = $clickedPost.index();
    posts.splice(index, 1);
    $clickedPost.remove();
}


//EVENT LISTNER 

//bind the input form to enter event (not click event)
//the user can submit with the enter button
$('.request-form').submit(function (event) {
    event.preventDefault();
    var city = $('.get-city').val();
    var post = fetch(city);
    $('.get-city').val('');
    // var post= create_post(data);
    // display_post(); do nort work - asynchronous

});


// post comment 
$('.posts').on('click', '.btn-comment', function () {
    $clickedPost = $(this).closest('.post');
    post_comment($clickedPost);

});

//remove one result 
$('.posts').on('click', '.btn-danger', function () {
    $clickedPost = $(this).closest('.post');
    delete_post($clickedPost);
    //$(this).closest('.container-fluid').remove();
});

//sort
$('.sort-by-city').click(function () {
    posts.sort(sort_by_city);
    _renderPosts();
});

$('.sort-by-temp').click(function () {
    posts.sort(sort_by_temp);
    _renderPosts();
});

$('.sort-by-date').click(function () {
    posts.sort(sort_by_date);
    _renderPosts();
});