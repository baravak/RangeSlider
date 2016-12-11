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
	$.fn.rangeSlider = function(_method)
	{
		$(this).each(function(){
			switch(_method)
			{
				case 'destroy':
				return destroy.call(this);
				case 'restart':
				return restart.call(this);
				case '':
				return restart.call(this);
			}
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
			var data_type = $(this).attr("data-type");
			if(data_type != 'vertical')
			{
				data_type = 'horizontal';
				$(this).attr("data-type", 'horizontal');
			}

			var data_step = Number($(this).attr("data-step"));
			if(isNaN(data_step))
			{
				data_step = 1;
			}

			var data_min = Number($(this).attr("data-min"));
			if(isNaN(data_min))
			{
				data_min = 0;
			}


			var data_max = Number($(this).attr("data-max"));
			if(isNaN(data_max) || data_min >= data_max)
			{
				data_max = data_min + 100;
			}


			var data_unit = data_max - data_min;

			var data_min_default = Number($(this).attr("data-min-default"));
			if(isNaN(data_min_default) || data_min_default < data_min)
			{
				data_min_default = 0;
			}

			var data_max_default = Number($(this).attr("data-max-default"));
			if(isNaN(data_max_default) || data_max < data_max_default)
			{
				data_max_default = data_unit;
			}

			$(this).data('range-slider', {
				min 			: data_min,
				max 			: data_max,
				min_default 	: data_min_default,
				max_default 	: data_max_default,
				unit 			: data_unit,
				step 			: data_step,
				type 			: data_type,
				margin 			: data_min_default,
				depth			: data_max,
			});

			$(this).init.prototype.range = function(_from, _to, _option){
				var from = _from;
				var to = _to;
				var data = this.data('range-slider');

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
					if(data.type == 'vertical')
					{
						from = this[depth_type]() - (from + this.find('.dynamic-range')[depth_type]());
					}
					option.from_type = 'pixel';
				}
				if(to === null || to === false || to === undefined)
				{
					to = this.find('.dynamic-margin')[depth_type]() + this.find('.dynamic-range')[depth_type]();
					if(data.type == 'vertical')
					{
						to = this[depth_type]() - this.find('.dynamic-margin')[depth_type]();
					}
					option.to_type = 'pixel';
				}


				var base_depth = this[depth_type]();

				if(option.from_type == 'pixel')
				{
					from = (from * data.unit) / base_depth;
				}
				else if(option.from_type == 'percent')
				{
					from = (from * data.unit) / 100;
				}
				else if(option.from_type == 'ziro_unit')
				{
					from -= data.min;
				}
				else if(option.from_type == 'step_plus')
				{
					from = (from * data.step) + data.from;
				}

				if(option.to_type == 'pixel')
				{
					to = (to * data.unit) / base_depth;
				}
				else if(option.to_type == 'percent')
				{
					to = (to * data.unit) / 100;
				}
				else if(option.to_type == 'ziro_unit')
				{
					to -= data.min;
				}
				else if(option.to_type == 'step_plus')
				{
					to = (to * data.step) + data.to;
				}
				var from_step = Math.round(from / data.step) * data.step;
				var to_step = Math.round(to / data.step) * data.step;


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


				from = (from_step * 100) / data.unit;
				to = (to_step * 100) / data.unit;


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
			margin_range.hide();
			dynamic_range.hide();

			margin_range.appendTo(this);
			dynamic_range.appendTo(this);
			$(this).range(data_min_default, data_max_default);

			margin_range.show();
			dynamic_range.show();
			$(this).trigger("range-slider::init::after");
		});
}

var add_selection = function(_name)
{
	var data = $(this).data('range-slider');
	var _self = this;
	var selection = $("<div class='"+_name+"'></div>");
	$(this).trigger("range-slider::selection", [selection, _name]);
	selection.attr('tabindex', '0');
	selection.unbind('mousedown.range-slider');
	selection.bind('mousedown.range-slider', function(){
		var _selection = this;
		$(document).unbind("mousemove.range-slider");
		$(document).bind("mousemove.range-slider", function(event){
			var mouse_position = data.type == 'vertical' ? event.pageY : event.pageX;
			var ziro_point = data.type == 'vertical'? $(_self).offset().top : $(_self).offset().left;
			var mouse_selection = mouse_position - ziro_point;
			mouse_selection = data.type == 'vertical' ? $(_self).height() - mouse_selection : mouse_selection;
			if(_name == 'max')
			{
				$(_self).range(null, mouse_selection, {type:'pixel'});
			}
			else
			{
				$(_self).range(mouse_selection, null, {type:'pixel'});
			}
		}).bind("mouseup.range-slider", function(){
			$(document).unbind("mouseup.range-slider");
			$(document).unbind("mousemove.range-slider");
		});
		return false;
	}).bind("mouseup", function(){
		$(document).unbind("mousemove.range-slider");
	}).bind('keydown.range-slider', function(event){
		var from, to, type;
		from = 1;
		to = null;
		if($(this).is('.max'))
		{
			from = null;
			to = 1;
		}
		if(event.keyCode == 38 || event.keyCode == 39)
		{
			$(this).parents('.range-slider').range(from, to, {type:'step_plus'});
			return false;
		}
		else if(event.keyCode == 37 || event.keyCode == 40)
		{
			$(this).parents('.range-slider').range(from * -1, to * -1, {type:'step_plus'});
			return false;
		}
	});
	return selection;
}
})(jQuery);