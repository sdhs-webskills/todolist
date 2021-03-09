class Li{
	constructor(text = "") {
		this.element = document.createElement("li");
		this.element.innerHTML = text;

		for(const key in this.element) {
			this[key] = this.element[key];
		}

		this.element.__proto__ = Object.assign(this, Object.create(HTMLElement.prototype));

		return this.element;
	};

	appendTo(target, position) {
		const parent = document.querySelector(target);

		if(typeof target === "object") {
			if(!position)
				return target.append(this.element);

			return target.insertAdjacentElement(position, this.element);
		};

		if(!position)
			return parent.append(this.element);

		parent.insertAdjacentElement(position, this.element);
	};

	appendElement(tag, attr = {}, text = "") {
		const element = document.createElement(tag);
		element.innerHTML = text;

		element.classList.add(attr?.class);

		this.element.append(element);
		return this;
	};

	set id(id) {
		this.element.setAttribute("id", id);

		return this;
	};

	set class(className) {
		this.classList.add(className);

		return this;
	};

	set text(text) {
		this.append(document.createTextNode(text));

		return this;
	};
};