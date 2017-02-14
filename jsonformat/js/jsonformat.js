$(function(){
	var content = '', jsonFormater,
	format = function () {
		var options = {
			dom: '#json-show',
			isCollapsible: $('#CollapsibleView').prop('checked'),
			quoteKeys: $('#QuoteKeys').prop('checked'),
			tabSize: $('#IndentRatio').val()
		};
		$('#ControlBar').show();
		jsonFormater = new JsonFormater(options);
		jsonFormater.doFormat(content);
	};
	$('#ControlBar').on('change','#IndentRatio,#CollapsibleView,#QuoteKeys',function(){
		format();
	}).on('click','.expand',function(){
        var level = $(this).data('level');
        if (level == -1) {
            jsonFormater.expandAll();
        } else if (level == 0) {
        	jsonFormater.collapseAll();
        } else {
            jsonFormater.collapseLevel(level);
        }
    });
	$('#json-btn').on('click',function(){
		var _content = $.trim($('#json-content').val());
		if (_content != content && _content != '') {
			content = _content;
			format();
		}
	});
});