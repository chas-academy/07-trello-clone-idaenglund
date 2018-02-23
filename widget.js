$(document).ready(function(){
    $.widget("custom.changeColor", {
        options: {
            value: ''
        }, 
            _create: function() {
                this.element.addClass("changeColor"); 
                this._update(this.options.value); 
            },

            _update: function(value) {
                this.element.css('background-color', value); 
            }, 

            _destroy: function() {

            }
    })

    $(".list").changeColor({ value: 'blue' })
}); 