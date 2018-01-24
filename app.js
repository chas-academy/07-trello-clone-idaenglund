$(function() {
    function initSort() {
        $('.column').sortable({
            connectWith: '.column', 
            handle: '.list_header'
        }); 


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
    } 