(function($)
{
	"use strict";
	function destroy()
	{
		$(this).removeClass('range-slider');
		$(this).data('range-slider', undefined);
		$(this).init.prototype.range = undefined;
		$('*', this).remove();
	}

	function restart()
	{
		$(this).rangeSlider('destroy');
		$(this).rangeSlider();
	}

	var optionMethod = Object();

	optionMethod.type = function(_name,_set)
	{
		var data_type = $(this).attr('data-type');

		if (_set)
		{
			var data_type = _set;
			if (data_type != 'vertical')
			{
				data_type = 'horizontal';
			}
			$(this).attr('data-type',data_type);
			return data_type;
		}

		var data_type = $(this).attr('data-type');
		if (data_type != 'vertical')
		{
			data_type = 'horizontal';
			$(this).attr('data-type',data_type);
		}
		return data_type;
	}

	optionMethod.step = function(_name, _set)
	{
		var data_step;
		if (_set)
		{
			data_step = Number(_set);
			if (isNaN(data_step)) 
			{
				data_step = 1;
			}
			$(this).attr('data-step', data_step);
			return data_step;
		}

		data_step = Number($(this).attr('data-step'));
		if (isNaN(data_step)) 
		{
			data_step = 1;
			$(this).attr('data-step', data_step);
		}
		return data_step;
	}

	optionMethod.min = function(_name,_set)
	{
		if (_set) 
		{
			var data_min = _set;
			if (isNaN(data_min)) 
			{
				data_min = 0;
			}
			$(this).attr('data-min',data_min);
			return data_min;
		}
	
		var data_min = Number($(this).attr('data-min'));
		if (isNaN(data_min)) 
		{
			data_min = 0;
			$(this).attr('data-min',data_min);
		}
		return data_min;
	}

	optionMethod.max = function(_name,_set)
	{
		var data_min = Number($(this).attr('data-min'));

		if (_set)
		{
			var data_max = _set;
			if(isNaN(data_max) || data_min >= data_max)
			{
				data_max = data_min + 100;
			}
			$(this).attr('data-max',data_max);
			return data_max;
		}

		var data_max = Number($(this).attr('data-max'));
		if(isNaN(data_max) || data_min >= data_max)
		{
			data_max = data_min + 100;
			$(this).attr('data-max',data_max);
		}
		return data_max;
	}

	optionMethod.min_unit = function(_name,_set)
	{
		if (_set)
		{
			var data_min_unit = _set;
			if(isNaN(data_min_unit))
			{
				data_min_unit = 0;
			}
			$(this).attr('data-min-unit',data_min_unit);
			return data_min_unit;
		}

		var data_min_unit = Number($(this).attr('data-min-unit'));
		if(isNaN(data_min_unit))
		{
			data_min_unit = 0;
			$(this).attr('data-min-unit',data_min_unit);
		}
		return data_min_unit;
	}

	optionMethod.unit = function(_name,_set)
	{
		var data_unit;
		var data_max = Number($(this).attr("data-max"));
		var data_min = Number($(this).attr('data-min'));
		var data_unit = data_max - data_min;
		return data_unit;
	}

	optionMethod.min_default = function(_name,_set)
	{
		var data_min = Number($(this).attr('data-min'));

		if (_set)
		{
			var data_min_default = _set;
			if(isNaN(data_min_default) || data_min > data_min_default)
			{
				data_min_default = 0;
			}
			$(this).attr('data-min-default',data_min_default);
			return data_min_default;
		}

		var data_min_default = Number($(this).attr('data-min-default'));
		if(isNaN(data_min_default) || data_min > data_min_default)
		{
			data_min_default = 0;
			$(this).attr('data-min-default',data_min_default);
		}
		return data_min_default;
	}


	optionMethod.max_default = function(_name,_set)
	{
		var data_max = Number($(this).attr("data-max"));
		var data_min = Number($(this).attr('data-min'));
		var data_unit = data_max - data_min;

		if (_set)
		{
			var data_max_default = _set;
			if(isNaN(data_max_default) || data_max < data_max_default)
			{
				data_max_default = data_unit;
			}
			$(this).attr('data-max-default',data_max_default);
			return data_max_default;
		}

		var data_max_default = Number($(this).attr('data-max-default'));
		if(isNaN(data_max_default) || data_max < data_max_default)
		{
			data_max_default = data_unit;
			$(this).attr('data-max-default',data_max_default);
		}
		return data_max_default;
	}


	optionMethod.margin = function(_name,_set)
	{
		var data_min_default = Number($(this).attr('data-min-default'));
		var margin = data_min_default;
		return margin;
	}


	optionMethod.depth = function(_name,_set)
	{
		var data_max = Number($(this).attr("data-max"));
		var depth = data_max;
		return depth;
	}



	optionMethod.range = function(_name, _set, _option, _value)
	{
		if (_value == null) 
		{
			if (_set == 'from') 
			{
				return (_set + ": " + $(this).rangeSlider('option', 'margin'));
			}
			// else if (_set == 'to') 
			// {
			// 	return (_set + ": " + $(this).rangeSlider('option', 'margin'));
			// }
		}

		if (_set == 'to')
		{
			return $(this).range(null, _value, _option);
		}
		else if (_set == 'from')
		{
			if ($(this).attr('data-infinity') == 'min')
			{
				return false;
			}
			else
			{
				return $(this).range(_value, null, _option);
			}
		}
	}


	function option(_name)
	{
		var _args = Array.prototype.slice.call(arguments);
		return optionMethod[_name].apply(this, _args);
	}

	$.fn.rangeSlider = function(_method)
	{
		var _args = Array.prototype.slice.call(arguments);
		switch(_method)
		{
			case 'destroy':
			return destroy.call(this);
			case 'restart':
			return restart.call(this);
			case 'option':
			return option.apply(this, _args.splice(1));
		}

		$(this).each(function(){
			if($(this).hasClass('range-slider'))
			{
				$(this).rangeSlider('destroy');
			}
			$(this).trigger("range-slider::init::before");
			$(this).addClass('range-slider');
			var id = $(this).attr('id');
			if(id)
			{
				$('<input type="hidden" name="'+id+'-max" data-range-bind="'+id+'" data-range-value="max">').appendTo(this);
				$('<input type="hidden" name="'+id+'-min" data-range-bind="'+id+'" data-range-value="min">').appendTo(this);
			}


			var data_infinity = $(this).attr("data-infinity");


			$(this).rangeSlider('option', 'type', $(this).attr("data-type"));
			$(this).rangeSlider('option', 'step', $(this).attr("data-step"));
			$(this).rangeSlider('option', 'min', $(this).attr("data-min"));
			$(this).rangeSlider('option', 'max', $(this).attr("data-max"));
			$(this).rangeSlider('option', 'unit', $(this).attr("data-unit"));
			$(this).rangeSlider('option', 'min_default', $(this).attr("data-min-default"));
			$(this).rangeSlider('option', 'max_default', $(this).attr("data-max-default"));
			$(this).rangeSlider('option', 'min_unit', $(this).attr("data-min-unit"));;



			$(this).data('range-slider', {

			});

			$(this).init.prototype.range = function(_from, _to, _option){
				var from = _from;
				var to = _to;
				var data = $(this).data('range-slider');



				data.type        = this.rangeSlider('option', 'type');
				data.step        = this.rangeSlider('option', 'step');
				data.min         = this.rangeSlider('option', 'min');
				data.max         = this.rangeSlider('option', 'max');
				data.unit        = this.rangeSlider('option', 'unit');
				data.min_default = this.rangeSlider('option', 'min_default');
				data.max_default = this.rangeSlider('option', 'max_default');
				data.margin      = this.rangeSlider('option', 'margin');
				data.depth       = this.rangeSlider('option', 'depth');
				data.min_unit    = this.rangeSlider('option', 'min_unit');
				
				var option = {
					type : 'unit'
				}

				$.extend(option, _option);
				option.from_type = option.type;
				option.to_type = option.type;
				var depth_type = data.type == 'vertical' ? 'height' : 'width';
				if(from === null || from === false || from === undefined)
				{
					from = this.find('.dynamic-margin')[depth_type]();
					if($(this).rangeSlider('option', 'type') == 'vertical')
					{
						from = this[depth_type]() - (from + this.find('.dynamic-range')[depth_type]());
					}
					option.from_type = 'pixel';
				}
				if(to === null || to === false || to === undefined)
				{
					to = this.find('.dynamic-margin')[depth_type]() + this.find('.dynamic-range')[depth_type]();
					if(($(this).rangeSlider('option', 'type')) == 'vertical')
					{
						to = this[depth_type]() - this.find('.dynamic-margin')[depth_type]();
					}
					option.to_type = 'pixel';
				}


				var base_depth = this[depth_type]();

				if(option.from_type == 'pixel')
				{
					from = (from * ($(this).rangeSlider('option', 'unit'))) / base_depth;
				}
				else if(option.from_type == 'percent')
				{
					from = (from * ($(this).rangeSlider('option', 'unit'))) / 100;
				}
				else if(option.from_type == 'ziro_unit')
				{
					from -= ($(this).rangeSlider('option', 'min'));
				}
				else if(option.from_type == 'step_plus')
				{
					from = (from * ($(this).rangeSlider('option', 'step'))) + data.from;
				}

				if(option.to_type == 'pixel')
				{
					to = (to * ($(this).rangeSlider('option', 'unit'))) / base_depth;
				}
				else if(option.to_type == 'percent')
				{
					to = (to * ($(this).rangeSlider('option', 'unit'))) / 100;
				}
				else if(option.to_type == 'ziro_unit')
				{
					to -= ($(this).rangeSlider('option', 'min'));
				}
				else if(option.to_type == 'step_plus')
				{
					to = (to * ($(this).rangeSlider('option', 'step'))) + data.to;
				}
				var from_step = Math.round(from / ($(this).rangeSlider('option', 'step'))) * ($(this).rangeSlider('option', 'step'));
				var to_step = Math.round(to / ($(this).rangeSlider('option', 'step'))) * ($(this).rangeSlider('option', 'step'));


				if(to_step <  from_step)
				{
					if(data.to == to_step){
						to_step = from_step;
					}
					else
					{
						from_step = to_step;
					}
				}

				if(to_step > data.unit)
				{
					to_step = data.unit;
				}

				if(from_step > data.unit)
				{
					from_step = data.unit;
				}

				if(to_step < 0)
				{
					to_step = 0;
				}

				if(from_step < 0)
				{
					from_step = 0;
				}




				var min_unit = $(this).rangeSlider('option', 'min_unit');

				$(this).find(".dynamic-range .min .mount").attr("data-value-show", (data.min + from_step));
				$(this).find(".dynamic-range .max .mount").attr("data-value-show", (data.min + to_step));;
				if ( to_step-from_step <= min_unit) 
				{
					$(this).find(".dynamic-range .max .mount").attr("data-value-show", (min_unit+data.min+from_step));
					$(this).find(".dynamic-range .min .mount").attr("data-value-show", (to_step-min_unit+data.min));
				}

				if (to_step <= min_unit+from_step)
				{

					if(_from == null)
					{
						from_step = to_step - min_unit;
					}
					else if(_to == null)
					{
						to_step = from_step + min_unit;
					}
					

					if (to_step >= ($(this).rangeSlider('option', 'unit')))
					{
						to_step = ($(this).rangeSlider('option', 'unit'));
						from_step = ($(this).rangeSlider('option', 'unit') - min_unit);
					}
				}

				var id = this.attr('id');
				if(id)
				{
					$('[data-range-bind="' + id + '"]').each(function(){
						var value_type = $(this).attr('data-range-value');
						if(value_type == 'max')
						{
							$(this).val(data.min + to_step);
						}
						else if(value_type == 'min')
						{
							$(this).val(data.min + from_step);
						}
					});
				}


				from = (from_step * 100) / ($(this).rangeSlider('option', 'unit'));
				to = (to_step * 100) / ($(this).rangeSlider('option', 'unit'));


				var depth = to - from;
				if(data.to != to_step || data.from != from_step)
				{
					this.data('range-slider').from = from_step;
					this.data('range-slider').to = to_step;
					
					this.trigger("range-slider::change::before", [data.min + from_step, data.min + to_step]);
					if(data.type == 'vertical')
					{
						this.find('.dynamic-margin').css(depth_type, (100 - to) + "%");
					}
					else
					{
						this.find('.dynamic-margin').css(depth_type, from + "%");
					}
					this.find('.dynamic-range').css(depth_type, depth + "%");
					this.trigger("range-slider::change", [data.min + from_step, data.min + to_step]);
				}
			}

			var margin_range = $("<div class='dynamic-margin'></div>");
			var dynamic_range = $("<div class='dynamic-range'></div>");

			if (data_infinity == 'max')
			{
				add_selection.call(this, 'min').appendTo(dynamic_range);
			}
			else if(data_infinity == 'min')
			{
				add_selection.call(this, 'max').appendTo(dynamic_range);
			}
			else
			{
				add_selection.call(this, 'max').appendTo(dynamic_range);
				add_selection.call(this, 'min').appendTo(dynamic_range);
			}

			dynamic_range.find('div.min, div.max').append("<span class='mount'></span>");
			var my_mount = dynamic_range.find('div.min span.mount, div.max span.mount');
			$(this).find('.dynamic-range span.mount').show(); //design*********
			var data_fix_mount = $(this).attr("data-fix-mount");

			my_mount.hide();
			if (data_fix_mount == 'on')
			{
				my_mount.show();
				// console.log(this);
				$(this).addClass("margin-range");
			}
			margin_range.hide();
			dynamic_range.hide();

			margin_range.appendTo(this);
			dynamic_range.appendTo(this);
			$(this).range($(this).rangeSlider('option', 'min_default'), $(this).rangeSlider('option', 'max_default'));

			margin_range.show();
			dynamic_range.show();
			$(this).trigger("range-slider::init::after");
		});
}

var add_selection = function(_name)
{
	// $(_self).find('.dynamic-range span.mount').hide(); //design*********
	// 




	if (!$(this).attr("data-infinity"))
	{

		$(this).unbind('mousedown.dynamic-range');
		$(this).bind('mousedown.dynamic-range', function(){
			var dynamic_range = $(this).find(".dynamic-range");

		

		$(dynamic_range).bind('mousedown.dynamic-range', function(){
		var _self = $(this).parents(".range-slider");
		console.log(this);
		var dynamic_range_click = data.type == 'vertical'? parseInt($(_self).find(".dynamic-range").css("height")) : parseInt($(_self).find(".dynamic-range").css("width"));
		var dynamic_margin_click = data.type == 'vertical'? parseInt($(_self).find(".dynamic-margin").css("height")) : parseInt($(_self).find(".dynamic-margin").css("width"));
		var to_click = data.type == 'vertical'? parseInt($(_self).find(".dynamic-margin").css("height")) : parseInt($(_self).find(".dynamic-margin").css("width"));


		var range_width = dynamic_range_click;
		var mouse_position = data.type == 'vertical' ? event.pageY : event.pageX;
		var ziro_point = data.type == 'vertical'? $(_self).offset().top : $(_self).offset().left;
		var ziro_on_click  = mouse_position - ziro_point;
		var mouse_selection = mouse_position - ziro_point;
		mouse_selection = data.type == 'vertical' ? $(_self).height() - mouse_selection : mouse_selection;

		$(document).unbind("mousemove.dynamic-range");
		$(document).bind("mousemove.dynamic-range", function(event){

			// $(_self).find('.dynamic-range').css('background-color','#0f95af'); //design*********
			// $(_self).find('.dynamic-range span.mount').show(); //design*********
			var margin_type = data.type == 'vertical'? "height" : "width";
			var mouse_position = data.type == 'vertical' ? event.pageY : event.pageX;
			var ziro_point = data.type == 'vertical'? $(_self).offset().top : $(_self).offset().left;
			var mouse_selection = mouse_position - ziro_point;
			mouse_selection = data.type == 'vertical' ? $(_self).height() - mouse_selection : mouse_selection;
			var move = mouse_selection - ziro_on_click;
			var from_click = dynamic_margin_click;
			var to_click = dynamic_margin_click + dynamic_range_click;
			// var total_width = parseInt($(_self).css("width"));
			var total_width = parseInt($(_self).css(margin_type));

			var new_from = move + dynamic_margin_click;
			var new_to = dynamic_range_click+dynamic_margin_click+move;


			$(_self).rangeSlider('option', 'range','from',{type:'pixel'}, new_from);
			$(_self).rangeSlider('option', 'range','to',{type:'pixel'}, new_to);
			$(_self).find("dynamic-range").css(margin_type, range_width);


			if (parseInt($(_self).find(".dynamic-range").css("width")) <= range_width) 
			{
				$(_self).find(".dynamic-range").css(margin_type,range_width);
				// var my_unit = $(_self).rangeSlider('option', 'unit');
				if (new_to >= total_width) 
				{
					$(_self).find(".dynamic-margin").css(margin_type, (total_width-range_width));
					data.type == 'vertical'? $(_self).find(".dynamic-margin").css(margin_type, 0) : $(_self).find(".dynamic-margin").css(margin_type, (total_width-range_width));
				}
				else if(new_from <= 0)
				{
					$(_self).find(".dynamic-margin").css(margin_type, 0);
					data.type == 'vertical'? $(_self).find(".dynamic-margin").css(margin_type, (total_width-range_width)) : $(_self).find(".dynamic-margin").css(margin_type, 0);
				}
			}

			}).bind("mouseup.dynamic-range", function(){
				// $(_self).find('.dynamic-range').css('background-color','#00667a'); //design*********
				// $(_self).find('.dynamic-range span.mount').hide(); //design*********
				$(document).unbind("mouseup.dynamic-range");
				$(document).unbind("mousemove.dynamic-range");
			});
			return false;
		}).bind("mouseup", function(){
			$(document).unbind("mousemove.dynamic-range");
		});
	});
	}


	var data_fix_mount = $(this).attr("data-fix-mount");


	
	var data = $(this).data('range-slider');
	var _self = this;
	var selection = $("<div class='"+_name+"'></div>");
	console.log()
	$(this).trigger("range-slider::selection", [selection, _name]);
	selection.attr('tabindex', '0');
	selection.unbind('mousedown.range-slider');
	selection.bind('mousedown.range-slider', function(){
		var _selection = this;

		$(document).unbind("mousemove.range-slider");
		$(document).bind("mousemove.range-slider", function(event){

			
			if (data_fix_mount != "on")
			{
				$(_self).find('.dynamic-range').css('background-color','#0f95af'); //design*********
				$(_self).find('.dynamic-range .'+ _name +' span.mount').show(); //design*********
			}
			var mouse_position = data.type == 'vertical' ? event.pageY : event.pageX;
			var ziro_point = data.type == 'vertical'? $(_self).offset().top : $(_self).offset().left;
			var mouse_selection = mouse_position - ziro_point;
			mouse_selection = data.type == 'vertical' ? $(_self).height() - mouse_selection : mouse_selection;
			if(_name == 'max')
			{
				$(_self).rangeSlider('option', 'range', 'to',{type:'pixel'}, mouse_selection);
			}
			else
			{
				$(_self).rangeSlider('option', 'range','from',{type:'pixel'}, mouse_selection);
			}
		}).bind("mouseup.range-slider", function(){
			if (data_fix_mount != "on") 
			{
				$(_self).find('.dynamic-range').css('background-color','#00667a'); //design*********
				$(_self).find('.dynamic-range .'+ _name +' span.mount').hide(); //design*********
			}
			$(document).unbind("mouseup.range-slider");
			$(document).unbind("mousemove.range-slider");
		});
		return false;
	}).bind("mouseup", function(){
		$(document).unbind("mousemove.range-slider");
	}).bind('keydown.range-slider', function(event){
		
		var from, to, type;

		change_by_key = 1;
		if (event.shiftKey) 
		{
			var change_by_key = 5;
		}

		if($(this).is('.max'))
		{
			if (data_fix_mount != "on") 
			{
				$(_self).find('.dynamic-range .max span.mount').show(); //design*********
			}
			if(event.keyCode == 38 || event.keyCode == 39)
			{
				$(this).parents('.range-slider').rangeSlider('option', 'range', 'to', {type:'step_plus'}, change_by_key);
				return false;
			}
			else if(event.keyCode == 37 || event.keyCode == 40)
			{
				$(this).parents('.range-slider').rangeSlider('option', 'range', 'to', {type:'step_plus'}, -change_by_key);
				return false;
			}
		}

		else
		{
			$(_self).find('.dynamic-range .min span.mount').show(); //design*********
			if(event.keyCode == 38 || event.keyCode == 39)
			{
				$(this).parents('.range-slider').rangeSlider('option', 'range', 'from', {type:'step_plus'}, change_by_key);
				return false;
			}
			else if(event.keyCode == 37 || event.keyCode == 40)
			{
				$(this).parents('.range-slider').rangeSlider('option', 'range', 'from', {type:'step_plus'}, -change_by_key);
				return false;
			}
		}

		if (data_fix_mount != "on") 
		{
			$(_self).find('.dynamic-range .max span.mount').hide(); //design*********
			$(_self).find('.dynamic-range .min span.mount').hide(); //design*********
		}


	});

	return selection;
}
})(jQuery);