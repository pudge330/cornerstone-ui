(function(CS) {
	jQuery(function() {
		jQuery('body').on('click', '.cs-close', function(evt) {
			var $this = jQuery(this);
			var $target = $this.attr('data-close-target') || null;
			if (!$target) {
				$target = $this.closest('[data-cs-instance]');
			}
			else {
				$target = jQuery($target);
			}
			$target.each(function() {
				var $tgt = jQuery(this);
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