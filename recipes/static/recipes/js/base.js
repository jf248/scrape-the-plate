function cloneMore(fs) {
    var selector = "." + fs +":last"
    var newElement = $(selector).clone(true);
    var total = $('#id_' + fs + '-TOTAL_FORMS').val();
    newElement.find("[id^=id_]").each(function() {
    	console.log($(this))
        var name = $(this).attr('name').replace('-' + (total-1) + '-','-' + total + '-');
        var id = 'id_' + name;
        $(this).attr({'name': name, 'id': id}).val('');
    });
    total++;
    $('#id_' + fs + '-TOTAL_FORMS').val(total);
    $(selector).after(newElement);
}
