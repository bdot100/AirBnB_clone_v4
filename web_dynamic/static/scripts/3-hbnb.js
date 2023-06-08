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

	// get status of API
	$.getJSON("http://0.0.0.0:5001/api/v1/places_search/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});

    // places_search API
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: '{}',
        success: function (info) {
        for (let i = 0; i < info.length; i++) {
            const place = info[i];
            $('.places').append(
            '<article><div class="title_box"><h2>' + place.name +
                '</h2><div class="price_by_night">$' + place.price_by_night +
                '</div></div><div class="information"><div class="max_guest">' +
                rmAddS(place.max_guest, 'Guest') +
                '</div><div class="number_rooms">' +
                rmAddS(place.number_rooms, 'Bedroom') +
                '</div><div class="number_bathrooms">' +
                rmAddS(place.number_bathrooms, 'Bathroom') +
                '</div></div><div class="description">' +
                place.description + '</div></article>');
        }
        }
    });

    function rmAddS (num, name) {
        if (num === 1) { return `${num} ${name}`; } else { return `${num} ${name}s`; }
    }

});