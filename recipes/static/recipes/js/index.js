var $ = require('jquery');
jQuery = $;
require('bootstrap');
require('@danielfarrell/bootstrap-combobox');

$(document).ready(function(){
	
	// Modal
	$( '.show_modal' ).click( function( event ) {
		event.preventDefault();

		// Add modal container if it doesn't exist
		if ( !$( '#modal-container' ).length ) {
			$( 'body' ).prepend('<div id="modal-container"></div>');
		}

		// Store the modal caller's id
		var $modal_container = $( '#modal-container' );
		$modal_container.data("caller_id", this.id);

		// Get data
		var url = $( this ).attr( 'href' );
		if ( url ) {
			
			$modal_container.load( url, function() {
				$( '#modal' ).modal( 'show' );
			});
		}
	});

	$( 'body' ).on( 'click', '#add-ingredient', function() {
		var url = $( '.show_modal' ).attr( 'href' );
		var $modal_form = $( '.form-modal' );
		var form_data = $modal_form.serialize();

		$.post( url, form_data , function( data) {
			if ( data.pk ){
				debugger;
				// Add new ingredient to all ingredient selects
				$( "select.ingredientwidget" ).each(function( index ) {
					$( this ).attr('name', 'form-' + index + '-ingredient');
					if (this.options) {
						this.options[this.options.length] = new Option(data.name, data.pk);
					}
				});

				// Change selection
				var elemName = $( '#modal-container' ).data( "caller_id" );
				elemName = elemName.replace("add-", "id_");
				$( "#" + elemName ).val(data.pk);

 				// Redo comboboxes
				$('.combobox-container').remove();
				$('.combobox').removeData('combobox');
				$('.combobox').combobox();

				// close the modal
				$( '#modal' ).modal( 'hide');

			} else {
				var html = $.parseHTML(data);
				var form = $( html ).find( '.form-modal' );
				$modal_form.replaceWith( form );
			}
		});
	});

	// Combobox initialisation
  	$combobox = $('.combobox');
	$combobox.each( function() {
	  var id = $(this).attr('name');
	  id = "id_" + id;
	  this.id = id;
	});
    $combobox.combobox();
    

    // SCRAPE STEP 3 -------
    
    // Generates ingredient text html, highlighting the ingredient phrase
    var getIngredientHtml = function(text, phrase) {
        if ( phrase ) {
            var start_phrase = text.indexOf(phrase);
            if ( start_phrase != -1 ) {
                var end_phrase = start_phrase + phrase.length;
                var end = text.length;
                return '<span class="ingredient-text-outer">'
                         + text.slice(0, start_phrase)
                         + '<span class="ingredient-text-ingredient-phrase">' 
                         + text.slice(start_phrase, end_phrase) 
                         + '</span>' 
                         + text.slice(end_phrase, end) 
                         + '</span>';
            }
   
        }
        return '<span class="ingredient-text-outer">' + text + '</span>';
        
    };
    
    // http://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
	var getSelectionText = function() {
		var text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
	}
	
	// Corrects phrase selection to include whole words cropping punctuation and white-space
	var getFullPhrase = function(text, phrase) {
		
		// remove any non-letter-or-digit characters from start or end of phrase, e.g. punctuation
		var start = 0;
		while (phrase.charAt(start) && !phrase.charAt(start).match(/[a-z0-9]/i)) {
			start++;
		}
		var end = phrase.length - 1;
		while (phrase.charAt(end) && !phrase.charAt(end).match(/[a-z0-9]/i)) {
			end--;
		}
		phrase = phrase.slice(start, end + 1);		
		
		// Expands phrase in case highlighting chopped off start or end of the phrase
		start = text.indexOf(phrase);
		var i = start - 1;
		while ( text.charAt(i) && text.charAt(i).match(/[a-z0-9]/i) ) {
			i--;
		}
		start = i + 1;
		end = text.indexOf(phrase) + phrase.length;
		i = end + 1;
		while ( text.charAt(i) && text.charAt(i).match(/[a-z0-9]/i) ) {
			i++;
		}
		end = i;

		return text.slice(start, end);
	};

	var getFormNumber = function(id) {
		debugger;
		if (id.slice(-2, -1) == '-') {
			return id.slice(-1);
		} else {
			return id.slice(-2);
		}
	};

    // Initial load of ingredient text
    (function() {
        var n_forms = $("#id_form-TOTAL_FORMS").val();
        for (i = 0; i < n_forms; i++) { 
            var text = $("#id_form-" + i + "-text").val();
            var phrase = $("#id_form-" + i + "-ingredient_phrase").val();
            var html = getIngredientHtml(text, phrase);
            $(".ingredient-text-container").eq(i)
            	.html(html)
            	.attr("id", "ingredient-text-container-" + i);
        }
    })();

    // Capture new ingredient_phrase
    $(".ingredient-text-container").mouseup(function() {
        var text = $( this ).text();
        var phrase = getSelectionText();
// 		phrase = getFullPhrase(text, phrase);
        var html = getIngredientHtml(text, phrase);
        $( this ).html(html);
        var i = getFormNumber(this.id)
        $( "#id_form-" + i + "-ingredient_phrase" ).val(phrase);
    });

});