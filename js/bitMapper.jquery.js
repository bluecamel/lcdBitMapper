(function($) {
	var bitMapper = function() {
		var options, element, definition;

		var cellClick = function() {
			var cell = $(this);

			// toggle cell class
			if (cell.hasClass("on")) {
				cell.removeClass("on");
			} else {
				cell.addClass("on");
			}

			updateDefinition();
			updateDisplay();
		};

		var createGrid = function() {
			var i, row, rowCellContainer, j, cell, definitionElement;

			for (i = 0; i < options.rows; i++) {
				row = $("<div class=\"bitMapperRow\"></div>");
				rowCellContainer = $("<div class=\"bitMapperRowCellContainer\"></div>");
				rowDefinition = $("<div class=\"bitMapperRowDefinition\"></div>");

				for (j = 0; j < options.columns; j++) {
					cell = $("<div class=\"bitMapperCell\"></div>");
					cell.click(cellClick);
					rowCellContainer.append(cell);
				}

				row.append(rowCellContainer);
				row.append(rowDefinition);
				element.append(row);
			}

			definitionElement = $("<div class=\"bitMapperDefinition\"></div>");
			element.append(definitionElement)
		};

		var updateDefinition = function() {
			definition = [];

			element.find(".bitMapperRowCellContainer").each(function() {
				var rowCellContainer = $(this), rowDefinition = "0B";

				rowCellContainer.find(".bitMapperCell").each(function() {
					var cell = $(this);

					if (cell.hasClass("on")) {
						rowDefinition += "1";
					} else {
						rowDefinition += "0";
					}
				});

				definition.push(rowDefinition);
			});
		};

		var updateDisplay = function() {
			element.find(".bitMapperRowDefinition").each(function(index) {
				var rowDefinition = $(this);
				console.log("rowDefinition", rowDefinition, index);
				rowDefinition.text(definition[index]);
			});

			element.find(".bitMapperDefinition").text(definition.join(", "));
		};

		return {
			init: function(_options) {
				options = _options;
				element = options.element;

				element.addClass("bitMapper");
				element.css("width", (options.columns * 18 + 160) + "px");
				element.data("bitMapper", this);

				createGrid();
				updateDefinition();
				updateDisplay();
			},
		};
	};

	$.fn.bitMapper = function() {
		var bitMapperObject,
			args = Array.prototype.slice.call(arguments, 0),
			options,
			allowedMethods = [];

		return this.each(function() {
			if (args.length === 0 || typeof(args[0]) === "object") {
				options = $.extend({}, $.fn.bitMapper.defaultOptions, args.length === 0 ? {} : args[0]);
				options.element = $(this);
				bitMapperObject = bitMapper();
				bitMapperObject.init(options);
			} else if (typeof(args[0]) === "string") {
				if (allowedMethods.indexOf(args[0]) === -1) {
					throw "Invalid method: " + args[0];
				}

				bitMapperObject = $(this).data("bitMapper");
				bitMapperObject[args[0]].apply(bitMapperObject, args.slice(1));
			}
		});
		if (arguments.length == 1 && typeof arguments[0] == "string") {

		} 
	};

	$.fn.bitMapper.defaultOptions = {
		columns: 5,
		rows: 8
	};
})(jQuery);