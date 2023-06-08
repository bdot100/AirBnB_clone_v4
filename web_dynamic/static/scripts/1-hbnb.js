document.ready(function () {
	const amenitiesChecked = {};
	$("li input[type=checkbox]").change(function () {
		if (this.checked) {
			amenitiesChecked[this.dataset.name] = this.dataset.id;
		} else {
			delete amenitiesChecked[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenitiesChecked).sort().join(", "));
	});
});