$(function() {
    function initSort() {
        $('.column').sortable({
            connectWith: '.column', 
            handle: '.list_header'
        }); 


    }

    initSort(); 

    $('body').on('click', '$addNew', function() {
        var newList = $('.board.clomun:first.list').clone(); 
        // get the last column
        var newList =
         `<div class= "list">
            <div class = "list_header">
                Done
            </div>
            <ul class="list_cards">
                <li class= "card">
                    Card#3  
                </li>
            </ul>          
        </div>
        `; 
       var lastColumn= $('.board .column:last').append(); 

       initSort() 
    }


       // init the sorting again after add new
       // clone the lastclomun
       var newColumn = lastColumn.clone(); 
        // replace the markup fort the last column with the new list
       lastColumn.html(newList); 
       // Insert the new column 
       lastColumn.after(newColumn); 


    });

    $('body').on('click', '.list_header .delete', function (event) {
        $(event.target).closest('.column').remove(); 

    }); 


$('body').on('click', '.list_cards add_new .delete', function(event){
    $(event)
});

   // $('#newcard').submit(function(event){

//    })


/*
    $('body').on('click', function() {
        var newColumn = 
         `<div class= "list">
            <div class = "list_header">
                Done
            </div>
            <ul class="list_cards">
                <li class= "card">
                    Card#3  
                </li>
                 <li class="add_new">
                    <button class="add">Add new Card</button>
                </li>
            </ul>          
        </div>
        `; 


}); 


$('body).on('click', '.list_cards add_new .delete', function(event){
    $(event)
})