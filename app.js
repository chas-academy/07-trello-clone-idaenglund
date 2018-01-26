$(function () {
    var cardDialog, listDialog;

    var initSort = function() {
      $('.board').sortable({
        placeholder: 'opacity',
        start: function(event, ui) {
          ui.placeholder.height(ui.item.find(".list").height());
        ui.helper.height(ui.item.find(".list").height());
        }
      });

      $('.list-cards').sortable({
        connectWith: '.list-cards',
        placeholder: "sortable-placeholder",
        revert: true,
        start: function(event, ui) {
          ui.placeholder.height(ui.item.height());
          ui.placeholder.width(ui.item.outerWidth());
        }
      });
    }

    var initDialogs = function() {
      cardDialog = $("#card-details-dialog").dialog({
        autoOpen: false,
        height: "auto",
        width: 270,
        modal: true,
        show: { effect: "fadeIn", duration: 500 },
        hide: { effect: "fadeOut", duration: 500 },
        open: function() {
          this.title = $(this).data().title;
          this.due = $(this).data().due;

          this.titleEl = $(this).find("#tab1 .card-title");
          this.dueEl = $(this).find("#tab1 .card-due");
          this.datepicker = $(this).find("#tab2 .datepicker");

          this.titleEl.text(this.title);
          this.dueEl.text(this.due || 'No due date yet');

          this.datepicker.datepicker({
            dateFormat: "yy-mm-dd",
            defaultDate: this.due || new Date()
          });
          
          debugger;
        },
        buttons: {
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });

      listDialog = $("#list-creation-dialog").dialog({
        autoOpen: false,
        height: "auto",
        width: 270,
        modal: true,
        show: { effect: "fadeIn", duration: 500 },
        hide: { effect: "fadeOut", duration: 500 },
        buttons: {
          Save: saveList,
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    }

    var initTabs = function() {
      $("#card-details-dialog #card-tabs").tabs();
    }

    var initDatepicker = function() {
      $("#card-details-dialog #card-tabs #tab2 .datepicker").datepicker({
        defaultFormat: "yy-mm-dd",
        defaultDate: new Date(),
        onSelect: function() {
          var formattedDate = $.datepicker.formatDate('yy-mm-dd', $(this).datepicker('getDate'));
          dateSelected(formattedDate);
        }
      });
    }

    var addCard = function(event) {
      event.preventDefault(); // Hindra formuläret för att ladda om sidan

      var newCardTitle = $(event.target).serializeArray()[0].value;

      if (newCardTitle === "") {
        return;
      }

      debugger;

      var newCard = `
        <li class="card">
          <span class="card-title">${newCardTitle}</span>
          <span class="card-due"></span>
          <button class="button delete">X</button>
        </li>
      `;

      $(event.target).closest('.list-cards').find('.add-new').before(newCard);
      $(event.target).find('input').val("");
    }

    var deleteCard = function(event) {
      event.preventDefault();
      event.stopPropagation();

      var cardEl = $(event.target).parent();
      cardEl.toggle("explode");
      cardEl.remove();
    }

    var saveList = function(event) {
      event.preventDefault();

      var newListTitle = $(event.target).offsetParent().find('form').serializeArray()[0].value
      var newList = `
        <div class="column">
            <div class="list">
                <div class="list-header">
                    ${newListTitle}
                    <button class="button delete">X</button>
                </div>
                <ul class="list-cards">
                    <li class="add-new">
                        <form class="new-card">
                            <input type="text" name="title" placeholder="Please name the card">
                            <button class="button add">Add new card</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
      `;

      $('.board').find('.column.adder').before(newList);
      listDialog.dialog("close");
      listDialog.find('input').val("");

      initSort();
    }

    var deleteList = function(event) {
      var listEl = $(event.target).closest(".column");
      listEl.toggle("explode");
      listEl.remove();
    }

    var openCardDialog = function(event) {
      var clickedCardEl = $(event.target).parent();

      debugger;

      var title = clickedCardEl.find('.card-title').text();
      var due = clickedCardEl.find('.card-due').text();

      console.log(title, due);

      cardDialog
        .data("title", title)
        .data("due", due)
        .dialog("open");
    }

    var openListDialog = function(event) {
      listDialog.dialog("open");
    }

    var dateSelected = function(date) {
      if (cardDialog.length) {
        var cardToUpdate = $(`.card .card-title:contains("${cardDialog.data().title}")`).parent();
        cardToUpdate.find('.card-due').text(date);
        debugger;
        cardDialog.data().due = date;
        cardDialog.find('.card-due').text(date);
      } else {
        return; // If we don't have a card dialog open, don't try and set values in it
      }
    }

    var addEventListeners = function() {
      $('body').on('click', '.card', openCardDialog);
      $('body').on('submit', '.new-card', addCard);
      $('body').on('click', '.card .delete', deleteCard);
      $('body').on('click', '#new-list', openListDialog);
      $('body').on('click', '.list .delete', deleteList);
      $('body').on('onSelect', '#card-details-dialog #card-tabs #tab2 .datepicker', dateSelected);
    }

    initSort();
    initDialogs();
    initTabs();
    initDatepicker();
    addEventListeners();
});

