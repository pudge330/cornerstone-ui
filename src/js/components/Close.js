(function(CS) {
	var jLyte = bglib.jLyte;
	jLyte(function() {
		jLyte('body').on('click', '.cs-close', function(evt) {
			var $this = jLyte(this);
			var $target = $this.attr('data-close-target') || null;
			if (!$target) {
				$target = $this.closest('[data-cs-instance]');
			}
			else {
				$target = jLyte($target);
			}
			$target.each(function() {
				var $tgt = jLyte(this);
				var instanceType = $tgt.attr('data-cs-instance'), instance = null;
				if (instanceType && instanceType.trim() != '') {
					instance = CS.getInstance($tgt[0], instanceType);
					if (instance && instance.handleCloseAction) {
						instance.handleCloseAction();
						evt.preventDefault();
					}
				}
			});
		});
	});
})(Cornerstone);