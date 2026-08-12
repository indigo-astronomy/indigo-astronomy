(function () {
	"use strict";

	var toggle = document.querySelector(".nav-toggle");
	var nav = document.querySelector(".primary-nav");
	if (toggle && nav) {
		toggle.addEventListener("click", function () {
			var open = nav.classList.toggle("is-open");
			toggle.setAttribute("aria-expanded", String(open));
		});
		nav.addEventListener("click", function (event) {
			if (event.target.closest("a")) {
				nav.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
			}
		});
	}

	var search = document.getElementById("driver-search");
	if (search) {
		var rows = document.querySelectorAll("main table tbody tr");
		var count = document.getElementById("driver-count");
		if (count) count.textContent = rows.length + " results";
		search.addEventListener("input", function () {
			var query = search.value.trim().toLowerCase();
			var visible = 0;
			for (var i = 0; i < rows.length; i++) {
				var match = !query || rows[i].textContent.toLowerCase().indexOf(query) !== -1;
				rows[i].hidden = !match;
				if (match) visible++;
			}
			if (count) count.textContent = visible + (visible === 1 ? " result" : " results");
		});
	}

	var box = document.getElementById("lightbox");
	var items = document.querySelectorAll(".gallery-item");
	if (box && items.length) {
		var image = document.getElementById("lightbox-image");
		var title = document.getElementById("lightbox-title");
		var info = document.getElementById("lightbox-info");
		var credit = document.getElementById("lightbox-credit");
		var close = document.getElementById("lightbox-close");
		var previousFocus = null;

		function hide() {
			box.classList.remove("open");
			box.setAttribute("aria-hidden", "true");
			image.removeAttribute("src");
			document.body.style.overflow = "";
			if (previousFocus) previousFocus.focus();
		}

		function show(item) {
			previousFocus = item;
			image.src = item.getAttribute("href");
			image.alt = item.dataset.title || "";
			title.textContent = item.dataset.title || "";
			info.textContent = item.dataset.info || "";
			credit.textContent = item.dataset.credit || "";
			box.classList.add("open");
			box.setAttribute("aria-hidden", "false");
			document.body.style.overflow = "hidden";
			close.focus();
		}

		for (var i = 0; i < items.length; i++) {
			items[i].addEventListener("click", function (event) {
				event.preventDefault();
				show(this);
			});
		}
		close.addEventListener("click", hide);
		box.addEventListener("click", function (event) { if (event.target === box) hide(); });
		document.addEventListener("keydown", function (event) { if (event.key === "Escape" && box.classList.contains("open")) hide(); });
	}

	var viewport = document.getElementById("gallery-viewport");
	var prev = document.getElementById("gallery-prev");
	var next = document.getElementById("gallery-next");
	if (viewport && prev && next) {
		function updateGallery() {
			var max = viewport.scrollWidth - viewport.clientWidth;
			prev.disabled = viewport.scrollLeft < 2;
			next.disabled = viewport.scrollLeft > max - 2;
		}
		function slide(direction) { viewport.scrollBy({ left: viewport.clientWidth * .8 * direction, behavior: "smooth" }); }
		prev.addEventListener("click", function () { slide(-1); });
		next.addEventListener("click", function () { slide(1); });
		viewport.addEventListener("scroll", updateGallery, { passive: true });
		window.addEventListener("resize", updateGallery);
		updateGallery();
	}
})();
